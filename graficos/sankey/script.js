const jsonUrl = "./sankey_data.json"; // Ruta local al archivo JSON

function drawChart() {
  axios.get(jsonUrl).then(response => {
    const jsonData = response.data;

    // Transformar los datos al formato requerido por Google Charts
    const fullData = jsonData.map(item => [item.From, item.To, item.Weight]);

    // Crear los datos para el gráfico
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows(fullData);

    // Configuración del gráfico
    const options = {
      width: 1400,
      height: 1000,
      sankey: {
        node: {
          label: { fontSize: 14 }
        },
        link: {
          colorMode: 'gradient'
        }
      }
    };

    // Dibujar el gráfico
    const chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
    chart.draw(data, options);
  }).catch(error => {
    console.error("Error al cargar el archivo JSON:", error);
  });
}

// Cargar Google Charts y ejecutar la función de dibujo
google.charts.load('current', { packages: ['sankey'] });
google.charts.setOnLoadCallback(drawChart);
