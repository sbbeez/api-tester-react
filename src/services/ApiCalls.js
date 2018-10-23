import { AsyncStorage } from "react-native";

/*
  returns headers without any header, not an async operation
*/

const getHeaders = () => {
  return {
    "Content-Type": "application/json"
    // Accept: "application/vnd.appName+json; version=1" //optional
  };
};

/*
    Post request without any auth headers
*/
export const postRequest = async (URL, data) => {
  let headers = getHeaders();
  try {
    const responseData = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    const responseJson = await responseData.json();
    if (responseData.status === 422) {
      return null;
    }
    return responseJson;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/*
    Auth headers
*/

const getAuthJsonHeaders = async () => {
  const token = await AsyncStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    Accept: "application/vnd.appname+json; version=1", //optional
    Authorization: "Token token=" + token
  };
};
const getAuthMultipartHeaders = async () => {
  const token = await AsyncStorage.getItem("auth_token");
  return {
    "Content-Type": "multipart/form-data;",
    Accept: "application/vnd.appname+json; version=1", //optional
    Authorization: "Token token=" + token
  };
};

/*
  different types of request
  types: 1.get type request
         2.Post type request
         3.delete type request
*/

export const getRequestWithAuthHeader = async () => {
  let headers = await getAuthJsonHeaders();
  const responseData = await fetch(URL, {
    method: "GET",
    headers
  });
  const responseJson = await responseData.json();
  return responseJson;
};

export const deleteRequest = async data => {
  let headers = await getAuthJsonHeaders();
  const responseData = await fetch(URL, {
    method: "delete",
    headers,
    body: JSON.stringify(data)
  });
  const responseJson = await responseData.json();
  return responseJson;
};

export const postRequestWithAuthHeader = async (URL, data) => {
  let headers = await getAuthJsonHeaders();
  const responseData = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
  const responseJson = await responseData.json();
  return responseJson;
};