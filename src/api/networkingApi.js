// TODO: Use for POST requests
// export const _doPost = async (url, body) => {
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body
//   })
//     .then(response => response.json())
//     .then(responseJson => {
//       return responseJson;
//     })
//     .catch(error => {
//       return error;
//     });
// };

export const _doGet = async (url, payload) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method: "GET",
    headers: new Headers(headers),
    mode: "cors",
    cache: "default",
    credentials: "include",
    redirect: "error",
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  return fetch(url, options).then(
    (response) =>
      new Promise((resolve, reject) => {
        const result = {
          success: response.ok,
          statusCode: response.status,
          statusText: response.statusText,
          requestUrl: url,
          requestMethod: options.method,
        };

        if (response.ok) {
          response
            .json()
            .then((json) => resolve({ ...result, payload: json }))
            .catch(() => resolve(result));
        } else {
          result.requestBody = options.body;
          resolve(result);
        }
      }),
  );
};
