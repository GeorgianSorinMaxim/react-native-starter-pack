export const _doPost = async (url: string, body: string) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      return error;
    });
};

export const _doGet = async (url: string, payload?: unknown): Promise<unknown> => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method: "GET",
    headers: new Headers(headers),
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
          requestBody: options.body
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
