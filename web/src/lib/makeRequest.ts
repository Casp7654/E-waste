// Request function to call
export const makeRequest = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  url: string,
  data: object = {}
): Promise<Response> => {
  const info: RequestInfo = url;

  let init: RequestInit = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
  };

  if (method !== "GET") init = Object.assign({ body: JSON.stringify(data) }, init);

  let response: Response = defaultResponse;

  // Execute
  try {
    response = await fetch(info, init);
  } catch (exception: any) {
    response = defaultResponse;
  } finally {
    return response;
  }

};

// Default Response
let defaultResponse: Response = {
  status: 500,
  headers: new Headers({ "Content-Type": "application/json" }),
  ok: false,
  redirected: false,
  statusText: "500?ERR!",
  type: "cors",
  url: "",
  clone: function (): Response {
    throw new Error("Function not implemented.");
  },
  body: null,
  bodyUsed: false,
  arrayBuffer: function (): Promise<ArrayBuffer> {
    throw new Error("Function not implemented.");
  },
  blob: function (): Promise<Blob> {
    throw new Error("Function not implemented.");
  },
  formData: function (): Promise<FormData> {
    throw new Error("Function not implemented.");
  },
  json: function (): Promise<any> {
    throw new Error("Function not implemented.");
  },
  text: function (): Promise<string> {
    throw new Error("Function not implemented.");
  }
};
