export const formatDate = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 10);
};
