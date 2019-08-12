export function minPow(n) {
  return Math.pow(2, Math.floor(Math.log(n) / Math.log(2)));
}

export const newId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

export function merge() {
  var dst = {},
    src,
    p,
    args = [].splice.call(arguments, 0);
  while (args.length > 0) {
    src = args.splice(0, 1)[0];
    if (toString.call(src) == '[object Object]') {
      for (p in src) {
        if (src.hasOwnProperty(p)) {
          if (toString.call(src[p]) == '[object Object]') {
            dst[p] = merge(dst[p] || {}, src[p]);
          } else {
            dst[p] = src[p];
          }
        }
      }
    }
  }

  return dst;
}

export function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
