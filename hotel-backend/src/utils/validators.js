export const isValidDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate < endDate;
};
