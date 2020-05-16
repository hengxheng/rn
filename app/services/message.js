import axios from "axios";
import { AsyncStorage } from "react-native";
import * as c from "../constants";

export async function getMessages(recieverId, senderId) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.get(
        `${c.GET_MESSAGES}/${recieverId}`,
        {
          headers: { Authorization: `JWT ${token}` },
        }
      );
      return {
        data: res.data.data,
        // currentPage: res.data.currentPage,
        error: false,
        message: "",
      };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function createOrUpdateMessage(data) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.post(c.SEND_MESSAGE, data, {
        headers: {
          Authorization: `JWT ${token}`,
          Accept: "application/json",
        },
      });
      return { data: res.data.data, error: false, message: "" };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function getContacts(userId) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.get(`${c.VIEW_CONTACTS}/${userId}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      return {
        data: res.data.data,
        error: false,
        message: "",
      };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}


export function handler(err) {
  let error = err;
  if (err.response && err.response.data.hasOwnProperty("message"))
    error = err.response.data;
  else if (!err.hasOwnProperty("message")) error = err.toJSON();

  return err.response.data;
}
