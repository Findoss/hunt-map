function popupMarker(title, description) {
  return `
  <h4>${title.replace("-", " ")}</h4>
  <hr>
  ${description ? description : ""}
  `;
}
