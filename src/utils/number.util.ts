export const range = (start: number, stop: number, step = 1) => {
  const length = (stop - start) / step + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};
