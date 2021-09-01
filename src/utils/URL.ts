export function getUrlData() {
  const { location } = window.document;
  const url = new URL(location.href);

  const path = url.pathname.substring(1).split('/');
  const search: Record<string, string | string[]> = {};

  for (const [key, value] of url.searchParams.entries()) {
    search[key] = JSON.parse(value);
  }

  return {
    path,
    search,
  };
}

type newUrlData = {
  path: string[];
  search: Record<string, string | number | number[] | string[]>;
};

export function updateUrlData({ path, search }: newUrlData) {
  let result = '';

  const searchUrl = new URLSearchParams();
  Object.entries(search).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v = `[${v.map((v) => `"${v}"`)}]`;
    }
    searchUrl.append(k, String(v));
  });

  result += '/';
  result += path.join('/');
  result += '?';
  result += searchUrl.toString();

  window.history.replaceState('1', '', result);
}
