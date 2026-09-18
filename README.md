# Ab2Web Orca Lab Plugins

Indice de plugins para [Orca Lab](https://github.com/ab2webco/orca-oss). Este repo
no contiene plugins: contiene `orca-marketplace.json`, que dice donde vive cada uno.
Es la fuente que la aplicacion carga por defecto.

## Que hay aca

| Plugin | Que hace | En la lista |
| --- | --- | --- |
| [`ab2web.orca-wa-inbox`](https://github.com/ab2webco/orca-wa-inbox) | Bandeja de soporte de WhatsApp. Mapea conversaciones a proyectos, define hasta donde puede actuar el agente en cada una, y abre tarjetas segun el contenido del mensaje. Lee la base local de WhatsApp Desktop y no sale a internet. | si |
| `stablyai.orca-portuguese` | Traducciones al portugues de Brasil. | si |
| `stablyai.orca-multipass-recipes` | Ciclo de vida para espacios de trabajo Multipass desechables. | si |
| `stablyai.orca-navigation-shortcuts` | Alias de comandos y atajos para vistas frecuentes. | si |
| `stablyai.orca-midnight-theme` | Tema oscuro. | no |
| `stablyai.orca-nord-theme` | Tema claro de bajo contraste. | no |
| `stablyai.orca-minimal-icons` | Tema de iconos monocromo. | no |
| `stablyai.orca-solarized-terminal` | Colores Solarized Dark para la terminal. | no |
| `stablyai.orca-workflow-skills` | Skills para planear, revisar y entregar trabajo. | no |

**Los cinco que dicen "no" estan publicados y Orca los esconde.** No es un problema
de este indice: Orca oculta de la lista cualquier entrada cuyas categorias sean
`themes`, `icons`, `icon-themes`, `terminal-themes` o `skills`, porque el
instalador todavia rechaza esos paquetes y un boton de instalar que falla es peor
que no mostrarlo. Se veran cuando el instalador los soporte, sin tocar este repo.

Las entradas de `stablyai.*` apuntan a los repos de ellos: se lista su catalogo,
no se copia su codigo.

## Sobre el sello "Oficial"

Un indice no se lo puede auto-otorgar: Orca lo calcula en el host cruzando la URL
de la fuente, el `owner` del indice, la llave del plugin y la organizacion donde
vive. La categoria `official` que algunos indices declaran es decorativa y no
significa nada, por eso aca no se usa.

La integridad de lo que se instala no depende de ese sello. Orca fija el commit
exacto que resuelve de la etiqueta, nombra el directorio de instalacion con el
hash del contenido, y vuelve a pedir autorizacion si las capacidades del plugin
cambian.

## Publicar un plugin aca

1. El plugin va en **su propio repo**, con `orca-plugin.json` en la raiz. El
   instalador clona y busca el manifiesto ahi; no hay campo para subdirectorio.
2. Etiquetar una version (`v3.1.0`). La entrada apunta a la etiqueta, no a `main`:
   una instalacion tiene que ser reproducible, y una rama se mueve bajo los pies
   de quien ya la instalo. Por lo mismo, no se mueve una etiqueta publicada: se
   publica una version nueva.
3. Agregar la entrada:

   ```json
   {
     "id": "<publisher>.<id>",
     "source": { "kind": "git", "url": "https://github.com/...git", "ref": "vX.Y.Z" },
     "description": "Una frase: que hace y que toca.",
     "categories": ["slug-en-minusculas"]
   }
   ```

   `id` tiene que ser exactamente el `publisher.id` del manifiesto, o la
   instalacion falla. Para que un plugin de Ab2Web pueda ser oficial, su id
   necesita el prefijo `orca-`: `ab2web.orca-<algo>`.

## Agregar esta fuente a mano

Solo hace falta en una version de Orca que todavia no la traiga por defecto.
Ajustes → Plugins → Fuentes → **Anadir fuente**:

```
https://github.com/ab2webco/orcalab-plugins.git
```

Ref: `main`.
