import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  const data = response.status === 204 ? response.status : await response.json();
  const result = { data: data.data, total: data.sum };
  return result;
}
