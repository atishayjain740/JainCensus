export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export function getCurrentDate(separator = '-') {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}

export const generateQrCodeUrl = (id) => {
  return `${getStagingUrl()}idCard?id=${id}`;
};

export const getStagingUrl = () => {
  return 'https://jain-census.herokuapp.com/';
};

export const getTestingUrl = () => {
  return 'http://localhost:3000/';
};
