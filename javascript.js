//Usa este código de Javascript en tu portal de AppScript esto te ayuda a calcular los días hábiles del mes, y los días hábiles corridos al día de ayer (también se puede de hoy)

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

//Aquí consulto una API debido a que AppScript no tiene librerías con Holidays, pero está API es de consumo gratis y me ayudó a llamar todos los días hábiles de Colombia 

  function esFestivoColombia(fecha) {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    const url = `https://date.nager.at/api/v3/PublicHolidays/${año}/CO`;

//https://date.nager.at/api/v3/PublicHolidays/${año}/--Aqui coloca el indicativo de tu país, en mi caso CO (Colômbia)

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
