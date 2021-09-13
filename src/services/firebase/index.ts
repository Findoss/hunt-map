export const loadFirebase = async () => {
  const module = await import('./firebase');
  const { backend } = module;
  return backend;
};
