const SITE_URL = "https://invitacion-brian-luisa.vercel.app";
const SHEET_NAME = "Invitados";
const SPREADSHEET_ID = "1yPrmaajLwoqY_fbujAnae7CROlwvk4AKXJsVmYjEuws";

const GROUPS = [
  ["Familia Francisco", ["Mariana", "Cristian", "Luz", "Francisco"]],
  ["Familia Jhon", ["Jaque", "Jhon", "Daniel", "Jairo"]],
  ["Familia Nicolás", ["Angely", "Nicolás", "Alan"]],
  ["Familia Leonardo", ["Sonia", "Leonardo", "Luciana"]],
  ["Familia Kevin", ["Kevin", "Lesly"]],
  ["Familia Adrian", ["Adrian", "Mayerly"]],
  ["Familia Antonio", ["Antonio", "Milena", "Lorena", "Brayan", "Emily"]],
  ["Familia Jose", ["Johana", "Dana", "Dayana", "Jose"]],
  ["Familia Gonzalo", ["Gonzalo", "Mari", "Cristina", "César", "Pedro"]],
  ["Familia Leidy", ["Leidy", "Isabella"]],
  ["Familia Ludivia", ["Hijo de Ludivia", "Ludivia"]],
  ["Familia Jacky", ["Jacky", "Andres", "Daniela"]],
  ["Familia Dayan", ["Laura", "Dayan", "Paula"]],
  ["Familia Lis", ["Lis", "Sara", "Oscar", "Nicolas"]],
  ["Familia Juan", ["Juan", "Mauricio", "Ninfa", "Sandra", "Freddy"]],
  ["Familia David Alejandro", ["David Alejandro", "Nathaly"]],
  ["Familia Josué", ["Josué", "Paola"]],
  ["Familia Ana", ["Ana", "Alejandra"]],
  ["Familia Doña Gloria", ["Gloria", "Martha"]],
  ["Familia Santiago", ["Santiago", "Karen", "Tomas"]],
  ["Familia Gladis", ["Gladis", "Helen"]],
  ["Amanda", ["Amanda"]],
  ["Blanca", ["Blanca"]],
  ["Idaly", ["Idaly"]],
  ["Maikol", ["Maikol"]],
  ["Lina", ["Lina"]],
  ["Carlos", ["Carlos"]],
  ["Cupertino", ["Cupertino"]],
  ["David Alfonso", ["David Alfonso"]],
  ["Luis Gabriel", ["Luis Gabriel"]],
  ["Valentina", ["Valentina"]],
  ["Yeimi", ["Yeimi"]],
  ["Felipe", ["Felipe"]],
  ["María José", ["María José"]],
  ["Gabriel", ["Gabriel"]]
];

function configurarInvitados() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (sheet && sheet.getLastRow() > 1) {
    throw new Error("La hoja Invitados ya contiene información. No ejecutes esta función nuevamente.");
  }

  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  sheet.clear();

  const headers = ["Token", "Familia", "Invitado", "Estado", "RespondidoEn", "Id", "Enlace"];
  const rows = [];

  GROUPS.forEach(([family, members]) => {
    const token = Utilities.getUuid().replace(/-/g, "").slice(0, 20);
    const link = `${SITE_URL}/?familia=${token}`;

    members.forEach((member) => {
      rows.push([
        token,
        family,
        member,
        "Pendiente",
        "",
        Utilities.getUuid(),
        link
      ]);
    });
  });

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#6a5138")
    .setFontColor("#ffffff")
    .setFontWeight("bold");
  sheet.getRange(2, 4, rows.length, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(["Pendiente", "Asistiré", "No asistiré"], true)
      .build()
  );
  sheet.autoResizeColumns(1, headers.length);
  sheet.setColumnWidth(7, 360);
}

function doGet(e) {
  const token = String(e.parameter.token || "");
  const callback = String(e.parameter.callback || "callback").replace(/[^a-zA-Z0-9_.$]/g, "");
  const result = getFamilyByToken_(token);
  const json = JSON.stringify(result);

  if (e.parameter.callback) {
    return ContentService
      .createTextOutput(`${callback}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const token = String(payload.token || "");
    const responses = Array.isArray(payload.responses) ? payload.responses : [];
    const allowed = ["Pendiente", "Asistiré", "No asistiré"];
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const sheet = getSpreadsheet_().getSheetByName(SHEET_NAME);
      const values = sheet.getDataRange().getValues();
      const responseMap = {};

      responses.forEach((response) => {
        if (allowed.includes(response.status)) responseMap[String(response.id)] = response.status;
      });

      let updated = 0;
      for (let row = 1; row < values.length; row += 1) {
        if (String(values[row][0]) !== token) continue;
        const id = String(values[row][5]);
        if (!Object.prototype.hasOwnProperty.call(responseMap, id)) continue;

        sheet.getRange(row + 1, 4).setValue(responseMap[id]);
        sheet.getRange(row + 1, 5).setValue(new Date());
        updated += 1;
      }

      return json_({ ok: updated > 0, updated });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function getFamilyByToken_(token) {
  if (!token) return { ok: false, error: "Enlace inválido" };

  const sheet = getSpreadsheet_().getSheetByName(SHEET_NAME);
  if (!sheet) return { ok: false, error: "Sistema sin configurar" };

  const values = sheet.getDataRange().getValues();
  const members = [];
  let family = "";

  for (let row = 1; row < values.length; row += 1) {
    if (String(values[row][0]) !== token) continue;
    family = String(values[row][1]);
    members.push({
      id: String(values[row][5]),
      name: String(values[row][2]),
      status: String(values[row][3] || "Pendiente")
    });
  }

  if (!members.length) return { ok: false, error: "Invitación no encontrada" };
  return { ok: true, family, members };
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}
