export const minPow = (n: number): number => {
  return Math.pow(2, Math.floor(Math.log(n) / Math.log(2)));
};
