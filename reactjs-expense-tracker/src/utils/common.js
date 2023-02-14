export const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    Authorization: `BEARER ${token}`,
  };
};
