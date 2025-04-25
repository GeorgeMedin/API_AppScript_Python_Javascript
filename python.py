from datetime import date, timedelta
import calendar
import holidays

hoy = date.today()
ayer = hoy - timedelta(days=1)

primer_dia = hoy.replace(day=1)
ultimo_dia = hoy.replace(day=calendar.monthrange(hoy.year, hoy.month)[1])

festivos_colombia = holidays.Colombia(years=hoy.year)

dias_habiles_mes = 0
dias_habiles_hasta_ayer = 0

fecha = primer_dia
while fecha <= ultimo_dia:
    es_habil = fecha.weekday() < 5 and fecha not in festivos_colombia
    if es_habil:
        dias_habiles_mes += 1
        if fecha <= ayer:
            dias_habiles_hasta_ayer += 1
    fecha += timedelta(days=1)

# Resultado para Power BI
resultado = {
    "Dias_Habiles_Desde_Inicio_Mes_Hasta_Ayer": [dias_habiles_hasta_ayer],
    "Dias_Habiles_Totales_Mes_Actual": [dias_habiles_mes]
}

print(resultado)
