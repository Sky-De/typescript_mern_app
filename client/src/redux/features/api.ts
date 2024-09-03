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
// FIX--replace with .env and add development and production
// this is new deploy on back4app
const API = axios.create({
  baseURL: "https://booksharebackend-a16zj2wa.b4a.run/api/v1/",
});
// const API = axios.create({ baseURL: "http://localhost:2323/api/v1/" });
// const API = axios.create({
//   baseURL: "https://puce-worried-barnacle.cyclic.app/api/v1/",
// });

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
    let errorPayload;
    console.log(error, "from API");
    errorPayload =
      error.response === undefined
        ? { message: "Check your connection and try again" }
        : error.response.data
        ? error.response.data
        : { message: "Check your connection and try again" };

    // it's not dynamic approach
    // but to prevent some isssue after token expiration this temp logic will work
    // removes user form localStorage
    if (
      error.response.data.message ===
      "Token Is Expired, reset the page and login again"
    ) {
      sessionStorage.removeItem("user");
    }

    console.log(errorPayload.message, "errorPayload.message");

    throw new APIError({
      message: errorPayload.message,
      title: errorPayload.title,
      stackTrace: errorPayload.stackTrace,
    });
  }
);

export default API;
