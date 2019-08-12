import './index.css';

export function legendItem(type) {
  return `<div class="legend-item marker-${type}"></div><span>${t('types', type)}</span>`;
}
