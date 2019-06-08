export function legendItem(type) {
  let title = type;

  switch (type) {
    case 'label':
      title = 'Compounds label';
      break;
    case 'new-object':
      title = 'New Markers';
      break;
  }

  return `<div class="legend-item marker-${type}"></div><span>${title.replace('-', ' ')}</span>`;
}
