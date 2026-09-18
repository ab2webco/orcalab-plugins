# Ab2Web Orca Lab Plugins

Indice de plugins para [Orca Lab](https://github.com/ab2webco/orca-oss). Este repo
no contiene plugins: contiene `orca-marketplace.json`, que dice donde vive cada uno.
Es la fuente que la aplicacion carga por defecto.

## Que hay aca

| Plugin | Que hace |
| --- | --- |
| [`ab2web.orca-wa-inbox`](https://github.com/ab2webco/orca-wa-inbox) | Bandeja de soporte de WhatsApp. Mapea conversaciones a proyectos, define hasta donde puede actuar el agente en cada una, y abre tarjetas segun el contenido del mensaje. Lee la base local de WhatsApp Desktop y no sale a internet. |

Solo plugins de Ab2Web. Se probo copiar aca las entradas del indice de upstream
y se revirtio: la tarjeta del marketplace muestra como autor al **owner del
indice**, no al publisher del plugin, asi que sus plugins aparecian firmados por
`ab2webco`. Atribuir el trabajo de otro no se arregla con un pie de nota.

Sus plugins siguen disponibles desde su propia fuente, que se agrega igual que
esta.

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
