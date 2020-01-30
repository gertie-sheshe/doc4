export const filterSelectedDocument = (documents, id) => {
  console.log('OLAAA WE ARE HERE');
  return documents.filter(doc => doc._id === id);
};
