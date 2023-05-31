const BASE_URL = "https://tsapi.coronasafe.live/api/";

export const request = async (url: string, method = "GET", body?: object) => {
  let headers: {
    "Content-Type": "application/json";
    Accept: string;
    Authorization: string;
  } = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: localStorage.getItem("accessToken")
      ? "Token " + localStorage.getItem("accessToken")
      : "",
  };

  let options = {
    method,
    headers,
    body: JSON.stringify(body),
  };
  if (Object(body).length > 0) {
    options.body = JSON.stringify(body);
  }

  try {
    return fetch(BASE_URL + url, {
      method,
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      return response
        .json()
        .then((json) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
        .catch((e) => {
          console.log(e);
          return { message: "Success" };
        });
    });
  } catch (e) {
    console.log(e);
    Promise.reject({ message: e || "Error Occured During Network Call" });
  }
};

const urlParams = (params: object) => {
  return Object.entries(params).reduce(
    (url, [key, value]) =>
      value
        ? url === ""
          ? `?${key}=${value}`
          : `${url}&${key}=${value}`
        : url,
    ""
  );
};

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return request("auth-token/", "POST", { username, password });
};

export const register = ({
  username,
  email,
  password,
  confirmPassword,
}: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return request("auth/registration/", "POST", {
    username,
    email,
    password1: password,
    password2: confirmPassword,
  });
};

export const postForm = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return request("forms/", "POST", {
    title,
    description,
    is_public: true,
  });
};

export const getForm = ({ formId }: { formId: number }) => {
  return request("forms/" + formId, "GET");
};

export const getForms = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  return request("forms/" + urlParams({ limit, offset }), "GET");
};

export const deleteForm = ({ id }: { id: number }) => {
  return request("forms/" + id + "/", "DELETE");
};

export const postField = ({ id, body }: { id: number; body: object }) => {
  return request(`forms/${id}/fields/`, "POST", body);
};

export const getFields = ({ id }: { id: number }) => {
  return request(`forms/${id}/fields/`, "GET");
};

export const deleteField = ({
  formId,
  fieldId,
}: {
  formId: number;
  fieldId: number;
}) => {
  return request("forms/" + formId + "/fields/" + fieldId, "DELETE");
};

export const patchField = ({
  formId,
  fieldId,
  body,
}: {
  formId: number;
  fieldId: number;
  body: object;
}) => {
  return request("forms/" + formId + "/fields/" + fieldId, "PATCH", body);
};

export const submitAnswers = ({
  formId,
  body,
}: {
  formId: number;
  body: object;
}) => {
  return request("forms/" + formId + "/submission/", "POST", body);
};
