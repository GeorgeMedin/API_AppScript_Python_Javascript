function doGet(e) {
  const resultado = calcularDiasHabilesDelMes();
  return ContentService
    .createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}

function calcularDiasHabilesDelMes() {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1); // Ayer

  const año = hoy.getFullYear();
  const mes = hoy.getMonth();

  const primerDiaMes = new Date(año, mes, 1);
  const ultimoDiaMes = new Date(año, mes + 1, 0);

  let diasHabilesHastaAyer = 0;
  let diasHabilesTotales = 0;
  let fechaActual = new Date(primerDiaMes);

  function esDiaHabil(fecha) {
    const diaSemana = fecha.getDay();
    return diaSemana >= 1 && diaSemana <= 5; // Lunes a Viernes
  }

  function esFestivoColombia(fecha) {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    const url = `https://date.nager.at/api/v3/PublicHolidays/${año}/CO`;

    try {
      const response = UrlFetchApp.fetch(url);
      const data = JSON.parse(response.getContentText());
      return data.some(f => f.date === fechaFormateada); // Si es festivo, devuelve true
    } catch (e) {
      Logger.log("Error consultando festivos: " + e.message);
      return false;
    }
  }

  // Recorremos todo el mes, desde el primer día hasta el último
  while (fechaActual <= ultimoDiaMes) {
    // Para contar los días hábiles hasta ayer
    if (fechaActual <= ayer && esDiaHabil(fechaActual) && !esFestivoColombia(fechaActual)) {
      diasHabilesHastaAyer++;
    }

    // Para contar los días hábiles hasta hoy (total del mes)
    if (esDiaHabil(fechaActual) && !esFestivoColombia(fechaActual)) {
      diasHabilesTotales++;
    }

    fechaActual.setDate(fechaActual.getDate() + 1); // Avanza un día
  }

  return {
    "Dias_Habiles_Desde_Inicio_Mes_Hasta_Ayer": diasHabilesHastaAyer,
    "Dias_Habiles_Totales_Mes_Actual": diasHabilesTotales
  };
}
