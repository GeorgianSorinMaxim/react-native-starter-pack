export const makePostRequest = async (
  url: string,
  body?: string,
  extraHeaders?: object,
) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body,
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      return error;
    });
};

export const makeGetRequest = async (
  url: string,
  headers?: object,
  payload?: unknown,
): Promise<unknown> => {
  const requestHeaders = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method: "GET",
    headers: new Headers({ ...requestHeaders, ...headers }),
    mode: "cors",
    credentials: "include" as RequestCredentials_,
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  return fetch(url, options).then(
    response =>
      new Promise((resolve, _reject) => {
        const result = {
          success: response.ok,
          statusCode: response.status,
          statusText: response.statusText,
          requestUrl: url,
          requestMethod: options.method,
          requestBody: options.body,
        };

        if (response.ok) {
          response
            .json()
            .then(json => resolve({ ...result, payload: json }))
            .catch(() => resolve(result));
        } else {
          resolve(result);
        }
      }),
  );
};
