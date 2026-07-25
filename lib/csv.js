function escapeCell(value) {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function toCsvRow(values) {
  return values.map(escapeCell).join(",") + "\r\n";
}

module.exports = { toCsvRow };
