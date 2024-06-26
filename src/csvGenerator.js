import fs from "fs"; 

export function generateCSVData(data,nombreArchivo) {
    if (!data || data.length === 0) {
      console.log("No hay datos para generar el archivo CSV.");
      return;
    }
  
    const headers = Object.keys(data[0]);
    const csvContent = data.map(obj =>
      headers.map(key => obj[key]).join(",")
    ).join("\n");
    const headerRow = headers.join(",") + "\n";
    const csvData = headerRow + csvContent;
    fs.writeFile(`${nombreArchivo}.csv`, csvData, (err) => {
      if (err) throw err;
      console.log('Los datos se han exportado correctamente a results.csv');
    });
  }

  export function generateCSVDataList(data, fileName) {
    if (!data || data.length === 0) {
      console.log("No hay datos para generar el archivo CSV.");
      return;
    }
  
    // Convertir la lista de datos en un string CSV
    const csvContent = data.join("\n");
  
    fs.writeFile(fileName, csvContent, (err) => {
      if (err) {
        console.error('Error al escribir el archivo CSV:', err);
        return;
      }
      console.log(`Los datos se han exportado correctamente a ${fileName}`);
    });
  }

  export function generateCSVSummary(data, fileName) {
    if (!data || !data.home || !data.away) {
      console.log("Los datos del partido son inválidos.");
      return;
    }
  
    const csvHeaders = [
      "Date",
      "HomTeam",
      "AwayTeam",
      "TotalLocal",
      "1stQuarterScoreHome",
      "2ndQuarterScoreHome",
      "3rdQuarterScoreHome",
      "4thQuarterScoreHome",
      "ExtraQuarterScoreHome",
      "TotalAway",
      "1stQuarterScoreAway",
      "2ndQuarterScoreAway",
      "3rdQuarterScoreAway",
      "4thQuarterScoreAway",
      "ExtraQuarterScoreAway",
    ];    
  
    const csvRows = [
      [
        data.date,
        data.home.name,
        data.away.name,        
        data.result.home,
        data.firstLocal,
        data.secondLocal,
        data.thirstLocal,
        data.fourthLocal,
        data.extraLocal,
        data.result.away,
        data.firstAway,
        data.secondAway,
        data.thirstAway,
        data.fourthAway,
        data.extraAway,
      ]
    ];
  
    // Convert data to CSV format
    const csvContent = [csvHeaders.join(",")].concat(
      csvRows.map(row => row.join(","))
    ).join("\n");
  
    // Output CSV content to console (for now)
    console.log(csvContent);
    fs.writeFile(`${fileName}.csv`, csvContent, (err) => {
      if (err) throw err;
      console.log(`Los datos se han exportado correctamente a ${fileName}.csv`);
    });
}

export function generateCSVPlayerStats(data, fileName) {
  console.log("generateCSVPlayerStats");
  // Encabezados de las columnas
  const headers = ['Name', ...Object.keys(data[0].stats)]; // Añadir 'Name' como primer encabezado
  const headerRow = headers.join(",") + "\n";

  // Filas de datos
  const rows = data.map(player => {
    const values = [player.name, ...headers.slice(1).map(header => player.stats[header])]; // Añadir el nombre del jugador como primer valor
    return values.join(",");
  }).join("\n");

  // Contenido completo del CSV
  const csvContent = headerRow + rows;

  // Escribir en el archivo
  fs.writeFileSync(fileName, csvContent);
}

export function generateCSVStatsMatch(data, fileName) {
  // Agregar títulos a las columnas
  const columnTitles = 'Home Score,Category,Away Score\n';
  const csvData = columnTitles + data;
  fs.writeFile(fileName + '.csv', csvData, (err) => {
    if (err) {
      console.error('Error al escribir el archivo CSV:', err);
    } else {
      console.log('Archivo CSV generado exitosamente:', fileName + '.csv');
    }
  });
}
export function generateCSVDataResults(data, nombreArchivo) {
  if (!data || data.length === 0) {
    console.log("No hay datos para generar el archivo CSV.");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = data.map(obj =>
    headers.map(key => obj[key]).join(",")
  ).join("\n");
  const headerRow = headers.join(",") + "\n";
  const csvData = headerRow + csvContent;
  fs.writeFile(`${nombreArchivo}.csv`, csvData, (err) => {
    if (err) throw err;
    console.log('Los datos se han exportado correctamente a results.csv');
  });
}

// Función para generar el archivo CSV.
export function generateCSVPointByPoint(data, fileName, ids) {
  console.log("generateCSVPointByPoint", ids);
  
  // Formatea los datos en formato CSV con el ID añadido a cada línea sin los números secuenciales.
  const csvData = data.map((item, index) => `${ids},${item.score}`).join('\n');
  
  // Imprime el ID antes de escribir los datos en el archivo CSV.
  console.log('ID:', ids);
  
  // Escribe los datos en un archivo CSV.
  fs.writeFile(fileName + '.csv', csvData, (err) => {
      if (err) {
          console.error('Error al escribir el archivo CSV:', err);
      } else {
          console.log('Archivo CSV generado exitosamente:', fileName + '.csv');
      }
  });
}