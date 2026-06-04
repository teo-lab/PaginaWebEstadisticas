# TP2 – Tablas de Frecuencia y Estadísticas

**Materia:** Estadística y Probabilidades  
**Tecnicatura Superior en Desarrollo de Software – 2026**

---

## Descripción

Página web que consume datos de una API y muestra los resultados organizados en tres pestañas:

- **Población completa** – tabla con todos los registros obtenidos de la API
- **Tablas de Frecuencia** – frecuencia absoluta, acumulada y relativa por nivel educativo y por curso
- **Estadísticos** – media, mediana, mínimo, máximo, cuartiles y desvío estándar sobre la variable Edad

---

## Archivos

```
tp2-estadistica/
├── index.html     → estructura de la página
├── estilos.css    → diseño y presentación
└── script.js      → consumo de la API y lógica
```

---

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5

---

## API

Los datos se obtienen desde:

```
GET https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1
```

---

## Cómo ejecutar

Descargar los tres archivos en la misma carpeta y abrir `index.html` en el navegador.
