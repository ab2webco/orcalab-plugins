# Ab2Web Plugins — fuente para Orca Lab

Indice de plugins de Ab2Web para [Orca Lab](https://github.com/ab2webco/orca-oss).
Este repo no contiene plugins: contiene un `orca-marketplace.json` que apunta a
donde vive cada uno.

## Agregar esta fuente en Orca

Ajustes → Plugins → Fuentes → **Anadir fuente**:

```
https://github.com/ab2webco/orcalab-plugins.git
```

Ref: `main`.

Queda al lado de *Orca Official Plugins*, no en su lugar: la fuente oficial la
administra Orca Lab y no se puede quitar. Se pueden tener hasta 64 fuentes.

## Sobre el sello "Oficial"

Ningun plugin publicado aca puede llevarlo, y eso no es una limitacion de este
repo. Orca lo calcula en el host con cuatro condiciones que se cumplen todas o
ninguna: que la fuente sea el repo oficial, que su `owner` sea `stablyai`, que
la llave del plugin sea `stablyai.orca-*`, y que la URL del plugin este dentro
de esa organizacion. Un indice no se lo puede auto-otorgar. La integridad de lo
que se instala desde aca no depende de ese sello: Orca fija el commit exacto,
nombra el directorio de instalacion con el hash del contenido, y vuelve a pedir
autorizacion si las capacidades del plugin cambian.

## Publicar un plugin aca

1. El plugin va en **su propio repo**, con el `orca-plugin.json` en la raiz. El
   instalador clona y busca el manifiesto ahi; no hay campo para un
   subdirectorio.
2. Etiquetar una version (`v3.0.0`). La entrada apunta a esa etiqueta, no a
   `main`: una instalacion tiene que ser reproducible, y una rama se mueve.
3. Agregar la entrada a `orca-marketplace.json`:

   ```json
   {
     "id": "<publisher>.<id>",
     "source": { "kind": "git", "url": "https://github.com/...git", "ref": "vX.Y.Z" },
     "description": "Una frase: que hace y que toca.",
     "categories": ["slug-en-minusculas"]
   }
   ```

   `id` tiene que ser exactamente el `publisher.id` del manifiesto, o la
   instalacion falla.

4. No usar las categorias `themes`, `icons`, `icon-themes`, `terminal-themes`
   ni `skills`: Orca esconde de la lista cualquier entrada que las declare, asi
   que el plugin quedaria publicado e invisible.

## Plugins

| Plugin | Que hace |
| --- | --- |
| [`ab2web.wa-inbox`](https://github.com/ab2webco/orca-wa-inbox) | Bandeja de soporte de WhatsApp. Mapea conversaciones a proyectos, define hasta donde puede actuar el agente en cada una, y abre tarjetas segun el contenido del mensaje. Lee la base local de WhatsApp Desktop y no sale a internet. |
