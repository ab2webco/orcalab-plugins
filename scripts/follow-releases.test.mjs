import { test } from 'node:test'
import assert from 'node:assert/strict'
import { latestStableTag, followReleases } from './follow-releases.mjs'

test('latestStableTag: the highest vX.Y.Z wins, compared as numbers', () => {
  assert.equal(latestStableTag(['v0.6.9', 'v0.6.10', 'v0.6.25', 'v0.5.0']), 'v0.6.25')
})

test('latestStableTag: pre-releases and other names are ignored', () => {
  assert.equal(latestStableTag(['v0.7.0-rc.1', 'v0.6.25', 'latest', 'v1', 'wa-inbox-v9.0.0']), 'v0.6.25')
})

test('latestStableTag: no stable tag gives null', () => {
  assert.equal(latestStableTag(['v1.0.0-beta', 'nightly']), null)
})

const catalog = () => ({
  name: 'Index',
  plugins: [
    { id: 'a.one', source: { kind: 'git', url: 'https://example.test/one.git', ref: 'v0.6.10' } },
    { id: 'a.two', source: { kind: 'git', url: 'https://example.test/two.git', ref: 'v4.13.0' } }
  ]
})

test('followReleases: a pin behind its latest release moves forward, the rest stay', () => {
  const tags = { 'https://example.test/one.git': ['v0.6.10', 'v0.6.25'], 'https://example.test/two.git': ['v4.13.0'] }
  const { catalog: next, moved } = followReleases(catalog(), (url) => tags[url])
  assert.equal(next.plugins[0].source.ref, 'v0.6.25')
  assert.equal(next.plugins[1].source.ref, 'v4.13.0')
  assert.deepEqual(moved, [{ id: 'a.one', from: 'v0.6.10', to: 'v0.6.25' }])
})

test('followReleases: never moves a pin backwards', () => {
  const tags = { 'https://example.test/one.git': ['v0.6.9'], 'https://example.test/two.git': ['v4.12.0'] }
  const { moved } = followReleases(catalog(), (url) => tags[url])
  assert.deepEqual(moved, [])
})

test('followReleases: a pin that is not a stable tag (a branch, a commit) is left alone', () => {
  const input = { plugins: [{ id: 'a.dev', source: { kind: 'git', url: 'u', ref: 'main' } }] }
  const { moved } = followReleases(input, () => ['v9.9.9'])
  assert.deepEqual(moved, [])
})

test('followReleases: a source that is not git is left alone', () => {
  const input = { plugins: [{ id: 'a.local', source: { kind: 'path', path: '/x' } }] }
  const { moved } = followReleases(input, () => ['v9.9.9'])
  assert.deepEqual(moved, [])
})
