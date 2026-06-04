// =============================================
// FUNCIONES ESTADÍSTICAS
// =============================================

// Calcula el promedio de un array de números
function calcularMedia(edades) {
  var suma = 0;
  for (var i = 0; i < edades.length; i++) {
    suma = suma + edades[i];
  }
  return suma / edades.length;
}

// Calcula la mediana (valor del medio cuando están ordenados)
function calcularMediana(edades) {
  var ordenado = edades.slice().sort(function(a, b) { return a - b; });
  var mitad = Math.floor(ordenado.length / 2);

  if (ordenado.length % 2 !== 0) {
    // Si hay cantidad impar, el del medio es la mediana
    return ordenado[mitad];
  } else {
    // Si hay cantidad par, promediamos los dos del medio
    return (ordenado[mitad - 1] + ordenado[mitad]) / 2;
  }
}

// Calcula un cuartil dado (0.25 = Q1, 0.50 = Q2, 0.75 = Q3)
function calcularCuartil(edades, porcentaje) {
  var ordenado = edades.slice().sort(function(a, b) { return a - b; });
  var posicion = (ordenado.length - 1) * porcentaje;
  var indice = Math.floor(posicion);
  var decimal = posicion - indice;

  if (ordenado[indice + 1] !== undefined) {
    return ordenado[indice] + decimal * (ordenado[indice + 1] - ordenado[indice]);
  } else {
    return ordenado[indice];
  }
}

// Calcula el desvío estándar
function calcularDesvioEstandar(edades) {
  var media = calcularMedia(edades);
  var sumaDiferenciasCuadradas = 0;

  for (var i = 0; i < edades.length; i++) {
    var diferencia = edades[i] - media;
    sumaDiferenciasCuadradas = sumaDiferenciasCuadradas + (diferencia * diferencia);
  }

  return Math.sqrt(sumaDiferenciasCuadradas / edades.length);
}


// =============================================
// FUNCIONES PARA CONSTRUIR LAS TABLAS HTML
// =============================================

// Muestra la tabla con todos los registros de la API
function mostrarTablaPoblacion(datos) {
  var html = '<table>';
  html += '<thead><tr>';
  html += '<th>#</th>';
  html += '<th>Nombre y Apellido</th>';
  html += '<th>Edad</th>';
  html += '<th>Curso</th>';
  html += '<th>Nivel Educativo</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  for (var i = 0; i < datos.length; i++) {
    var persona = datos[i];
    html += '<tr>';
    html += '<td class="numero">' + (i + 1) + '</td>';
    html += '<td>' + persona.apellido + ', ' + persona.nombre + '</td>';
    html += '<td class="numero">' + persona.Edad + '</td>';
    html += '<td>' + persona.curso + '</td>';
    html += '<td>' + persona.nivel + '</td>';
    html += '</tr>';
  }

  html += '</tbody></table>';

  document.getElementById('tabla-poblacion').innerHTML = html;
  document.getElementById('total-registros').textContent = '(' + datos.length + ' registros)';
}

// Construye una tabla de frecuencia a partir de un objeto { categoria: cantidad }
function mostrarTablaFrecuencia(idContenedor, conteo) {
  // Calculamos el total general
  var total = 0;
  for (var categoria in conteo) {
    total = total + conteo[categoria];
  }

  var html = '<table>';
  html += '<thead><tr>';
  html += '<th>Categoría</th>';
  html += '<th>Frec. Absoluta</th>';
  html += '<th>Frec. Acumulada</th>';
  html += '<th>Frec. Relativa (%)</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  var acumulada = 0;
  for (var cat in conteo) {
    var fa = conteo[cat];
    acumulada = acumulada + fa;
    var fr = ((fa / total) * 100).toFixed(2);

    html += '<tr>';
    html += '<td>' + cat + '</td>';
    html += '<td class="numero">' + fa + '</td>';
    html += '<td class="numero">' + acumulada + '</td>';
    html += '<td class="numero">' + fr + '%</td>';
    html += '</tr>';
  }

  // Fila de totales
  html += '<tr class="fila-total">';
  html += '<td>TOTAL</td>';
  html += '<td class="numero">' + total + '</td>';
  html += '<td class="numero">' + total + '</td>';
  html += '<td class="numero">100.00%</td>';
  html += '</tr>';

  html += '</tbody></table>';

  document.getElementById(idContenedor).innerHTML = html;
}

// Muestra la tabla con todos los estadísticos de la variable Edad
function mostrarTablaEstadisticos(edades) {
  var media   = calcularMedia(edades);
  var mediana = calcularMediana(edades);
  var maximo  = Math.max.apply(null, edades);
  var minimo  = Math.min.apply(null, edades);
  var q1      = calcularCuartil(edades, 0.25);
  var q2      = calcularCuartil(edades, 0.50);
  var desvio  = calcularDesvioEstandar(edades);

  var html = '<table>';
  html += '<thead><tr>';
  html += '<th>Estadístico</th>';
  html += '<th>Valor</th>';
  html += '<th>Descripción</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  html += '<tr><td>Media</td><td class="valor">'           + media.toFixed(2)   + '</td><td class="descripcion">Promedio aritmético de todas las edades</td></tr>';
  html += '<tr><td>Mediana</td><td class="valor">'         + mediana.toFixed(2) + '</td><td class="descripcion">Valor central de la distribución ordenada</td></tr>';
  html += '<tr><td>Valor Máximo</td><td class="valor">'    + maximo             + '</td><td class="descripcion">La edad más alta registrada</td></tr>';
  html += '<tr><td>Valor Mínimo</td><td class="valor">'    + minimo             + '</td><td class="descripcion">La edad más baja registrada</td></tr>';
  html += '<tr><td>Primer Cuartil (Q1)</td><td class="valor">'  + q1.toFixed(2) + '</td><td class="descripcion">El 25% de los estudiantes tiene menos de esta edad</td></tr>';
  html += '<tr><td>Segundo Cuartil (Q2)</td><td class="valor">' + q2.toFixed(2) + '</td><td class="descripcion">El 50% de los estudiantes tiene menos de esta edad</td></tr>';
  html += '<tr><td>Desvío Estándar</td><td class="valor">' + desvio.toFixed(2) + '</td><td class="descripcion">Qué tan dispersas están las edades respecto a la media</td></tr>';

  html += '</tbody></table>';

  document.getElementById('tabla-estadisticos').innerHTML = html;
}


// =============================================
// FUNCIÓN PRINCIPAL: llama a la API y muestra todo
// =============================================

async function cargarDatos() {
  var estadoTexto = document.getElementById('estado-texto');

  try {
    // Hacemos el pedido a la API
    var respuesta = await fetch('https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1');
    var json = await respuesta.json();

    if (!json.success) {
      throw new Error('La API devolvió un error.');
    }

    var datos = json.data;

    estadoTexto.textContent = 'Datos cargados correctamente. Total de registros: ' + datos.length;

    // --- PESTAÑA 1: Población completa ---
    mostrarTablaPoblacion(datos);


    // --- PESTAÑA 2a: Frecuencia por Nivel educativo ---
    var conteoNiveles = {};
    for (var i = 0; i < datos.length; i++) {
      var nivel = datos[i].nivel;
      if (conteoNiveles[nivel] === undefined) {
        conteoNiveles[nivel] = 0;
      }
      conteoNiveles[nivel] = conteoNiveles[nivel] + 1;
    }
    mostrarTablaFrecuencia('tabla-niveles', conteoNiveles);


    // --- PESTAÑA 2b: Frecuencia por Curso (solo Secundario) ---
    var conteoCursos = {};
    for (var j = 0; j < datos.length; j++) {
      if (datos[j].nivel === 'Secundario') {
        var curso = datos[j].curso;
        if (conteoCursos[curso] === undefined) {
          conteoCursos[curso] = 0;
        }
        conteoCursos[curso] = conteoCursos[curso] + 1;
      }
    }
    mostrarTablaFrecuencia('tabla-cursos', conteoCursos);


    // --- PESTAÑA 3: Estadísticos sobre Edad ---
    var edades = [];
    for (var k = 0; k < datos.length; k++) {
      edades.push(datos[k].Edad);
    }
    mostrarTablaEstadisticos(edades);


  } catch (error) {
    estadoTexto.textContent = 'Error al cargar los datos: ' + error.message;
  }
}

// Ejecutamos al cargar la página
cargarDatos();
