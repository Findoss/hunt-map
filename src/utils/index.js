export function minPow(n) {
  return Math.pow(2, Math.floor(Math.log(n) / Math.log(2)));
}

export const newId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
