# Días Hábiles API para Power BI ✨

¿Alguna vez necesitaste en **Power BI** los días hábiles del mes actual...  
**sin contar sábados, domingos ni festivos**? ¡Yo también!  
Así que creé esta mini API usando **Google Apps Script** para resolverlo de forma automática y en tiempo real.

---

## ¿Qué hace esta API? ⚙️

Esta miniAPI calcula:

- **Días hábiles transcurridos** desde el inicio del mes hasta ayer
- **Total de días hábiles** del mes actual

y devuelve un **JSON limpio** y dinámico, como este:

{
"Dias_Habiles_Desde_Inicio_Mes_Hasta_Ayer": 17,
  "Dias_Habiles_Totales_Mes_Actual": 20
}


# ¿Dónde está la API? 🌐

Puedes consumir la API desde el siguiente endpoint público:  
[https://script.google.com/macros/s/AKfycbyLRlETrud-Pixfd1JFe2ikp3-WrAr6TRf5dtF3fZ_qL481HUhy6l1KXAQ6HinZQYKM/exec](https://script.google.com/macros/s/AKfycbyLRlETrud-Pixfd1JFe2ikp3-WrAr6TRf5dtF3fZ_qL481HUhy6l1KXAQ6HinZQYKM/exec)

**Notas:**
- Actualización automática todos los días.
- No necesitas autenticación.
- Siempre responde el mes y año actuales.

---

# ¿Cómo surgió este proyecto? 🛠️

Mientras trabajaba como Analista de Datos, me enfrenté al reto de calcular los días hábiles en Power BI, pero:

- No quería contar sábados, domingos, ni festivos.
- Necesitaba que los datos se actualizaran dinámicamente.
- Quería evitar procesos manuales o conexiones complicadas.

Primero lo resolví en Python usando la librería `holidays`, pero al intentar conectarlo a Power BI directamente... no fue tan sencillo.

Así que decidí crear esta mini API en Google Apps Script, que calcula en la nube los días hábiles y entrega un JSON listo para ser consumido.

---

# ¿Cómo consumirlo en Power BI? ⚡

Puedes conectar esta API en Power BI Desktop de manera muy sencilla:

1. Ve a **Inicio > Obtener datos > Web**.
2. Pega el enlace de la API.
3. Acepta la conexión como **anónima**.
4. Power BI leerá el JSON automáticamente.
5. Expande los registros para ver las columnas:
   - `Dias_Habiles_Desde_Inicio_Mes_Hasta_Ayer`
   - `Dias_Habiles_Totales_Mes_Actual`

¡Listo! Tendrás siempre los días hábiles actualizados en tus reportes.

---

# Tech Stack ⚙️

- **Google Apps Script** (backend de la API)
- **JSON API** (formato de salida)
- **Python** (versión original del cálculo usando `holidays`)

> Transformando pequeñas necesidades en grandes soluciones.