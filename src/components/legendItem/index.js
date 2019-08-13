import './index.css';

export function LegendItem(type) {
  return `<div class="legend-item marker-${type}"></div><span>${t('types', type)}</span>`;
}
