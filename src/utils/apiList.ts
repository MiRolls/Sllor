const getApiList = () => {
  const apiRoot = "/api/v1";
  return {
    getSite: `${apiRoot}/site/get`,
  };
};

export default getApiList();
