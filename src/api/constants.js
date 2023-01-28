export const baseUrl = process.env.REACT_APP_API_URL;
export const api = `${baseUrl}/api`;

export const getUsersImg = (fileName) =>
  `${baseUrl}/public/img/users/${fileName}`;

export const getToursImg = (fileName) =>
  `${baseUrl}/public/img/tours/${fileName}`;
