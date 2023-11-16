export const currentDate = (): string => {
  const date = new Date(Date.now());
  return date.toISOString().split('T')[0];
};
