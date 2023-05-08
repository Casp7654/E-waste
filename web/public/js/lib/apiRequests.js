// GET data
export const getData = async (info) => {
  const response = await fetch(info.endpoint, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
  });
  let isConnected = response?.status === 200 ? true : false;
  if (isConnected !== true) return undefined;
  let json = await response.json();
  return json.data;
}

// Request function to call
export const makeRequest = async (method, url, data = {}) => {
  const info = url;

  let init = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  };

  if (method !== "GET") init = Object.assign({ body: JSON.stringify(data) }, init);

  let response = defaultResponse;

  // Execute
  try {
    response = await fetch(info, init);
  } catch (exception) {
    response = defaultResponse;
  } finally {
    return response;
  }

};

// Default Response
let defaultResponse = {
  status: 500,
  headers: new Headers({ "Content-Type": "application/json" }),
  ok: false,
  redirected: false,
  statusText: "500?ERR!",
  type: "cors",
  url: "",
  clone: function () {
    throw new Error("Function not implemented.");
  },
  body: null,
  bodyUsed: false,
  arrayBuffer: function () {
    throw new Error("Function not implemented.");
  },
  blob: function () {
    throw new Error("Function not implemented.");
  },
  formData: function () {
    throw new Error("Function not implemented.");
  },
  json: function () {
    throw new Error("Function not implemented.");
  },
  text: function () {
    throw new Error("Function not implemented.");
  }
};
