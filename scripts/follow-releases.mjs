// Moves each git-sourced plugin's pin in orca-marketplace.json forward to the
// newest stable vX.Y.Z tag of its repository. Orca never refreshes a catalog
// on its own: whoever presses Refresh gets what this file pins, so a release
// the catalog does not point at reaches nobody. Forward only; a pin that is
// a branch or a commit, or a pre-release tag, is never touched.
//
//   node scripts/follow-releases.mjs           rewrites the file, prints what moved
//   node scripts/follow-releases.mjs --check   exits 1 if any pin is behind
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const STABLE = /^v(\d+)\.(\d+)\.(\d+)$/

/** @param {string} tag @returns {number[] | null} */
function parse (tag) {
  const match = STABLE.exec(tag)
  return match === null ? null : match.slice(1).map(Number)
}

/** @param {number[]} a @param {number[]} b */
function compare (a, b) {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] - b[i]
  return 0
}

/** @param {readonly string[]} tags @returns {string | null} */
export function latestStableTag (tags) {
  let best = null
  for (const tag of tags) {
    const version = parse(tag)
    if (version !== null && (best === null || compare(version, best.version) > 0)) best = { tag, version }
  }
  return best === null ? null : best.tag
}

/**
 * @param {{ plugins: Array<{ id: string, source: { kind: string, url?: string, ref?: string } }> }} catalog
 * @param {(url: string) => readonly string[]} tagsOf
 */
export function followReleases (catalog, tagsOf) {
  const next = structuredClone(catalog)
  const moved = []
  for (const plugin of next.plugins) {
    const { source } = plugin
    if (source.kind !== 'git' || typeof source.url !== 'string' || typeof source.ref !== 'string') continue
    const current = parse(source.ref)
    if (current === null) continue
    const latest = latestStableTag(tagsOf(source.url))
    if (latest === null || compare(parse(latest), current) <= 0) continue
    moved.push({ id: plugin.id, from: source.ref, to: latest })
    source.ref = latest
  }
  return { catalog: next, moved }
}

/** @param {string} url */
function remoteTags (url) {
  const out = execFileSync('git', ['ls-remote', '--tags', '--refs', url], { encoding: 'utf8' })
  return out.split('\n').filter(Boolean).map((line) => line.split('\t')[1].replace('refs/tags/', ''))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const path = join(dirname(fileURLToPath(import.meta.url)), '..', 'orca-marketplace.json')
  const { catalog, moved } = followReleases(JSON.parse(readFileSync(path, 'utf8')), remoteTags)
  for (const { id, from, to } of moved) process.stdout.write(`${id} ${from} -> ${to}\n`)
  if (process.argv.includes('--check')) process.exit(moved.length > 0 ? 1 : 0)
  if (moved.length > 0) writeFileSync(path, `${JSON.stringify(catalog, null, 2)}\n`)
}
