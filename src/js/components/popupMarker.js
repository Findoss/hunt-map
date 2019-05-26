function popupMarker(title, description) {
  return `
  <h4>${title}</h4>
  <hr>
  ${description ? description : ""}
  `;
}
