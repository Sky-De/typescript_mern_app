import axios from "axios";

type constructorProps = {
  message: string;
  title: string;
  stackTrace: string;
};
class APIError extends Error {
  constructor({ message, title, stackTrace }: constructorProps) {
    super(message);
    this.name = `${title}--APIError`;
    this.message = message;
    this.stack = stackTrace;
  }
}
const API = axios.create({ baseURL: "http://localhost:2323/api/v1/" });
// const API = axios.create({ baseURL: 'https://puce-worried-barnacle.cyclic.app/api/v1/' });

API.interceptors.request.use((config) => {
  //same thing server side: app.use(cors({ origin:true, credentials: true}));
  config.withCredentials = true;

  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error.response, "from API");
    if (error.response === undefined) {
      console.log("im working here");
    }
    // it replaces response error obj with axios default error obj
    let errorPayload =
      error.response === undefined
        ? { message: "Check your connection and try again" }
        : error.response.data;

    console.log(errorPayload);

    // it's not dynamic approach
    // but to prevent some isssue after token expiration this temp logic will work
    // removes user form localStorage
    if (
      error.response.data.message ===
      "Token Is Expired, reset the page and login again"
    ) {
      localStorage.removeItem("user");
    }

    if (error.response.data.message.startsWith("Some thing went wrong")) {
      console.log(error.response.data.message, "internal error");
      errorPayload = { message: "Check your connection and try again" };
    }

    if (error.response.data === undefined) {
      console.log("error.response.data.message, ", "internal error");
      errorPayload = { message: "Check your connection and try again" };
    }

    throw new APIError({
      message: errorPayload.message,
      title: errorPayload.title,
      stackTrace: errorPayload.stackTrace,
    });
  }
);

export default API;
