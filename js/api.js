const BASE_URL = "https://61f4662310f0f7001768c90f.mockapi.io/api/airplane";

export const getTours = () => {
  return fetch(BASE_URL).then((response) => response.json());
};
