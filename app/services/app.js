import axios from "axios";
import { AsyncStorage } from "react-native";
import * as c from "../constants";

export async function getUserRecipes(userId, fetchPage) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.get(
        `${c.GET_USER_RECIPES}/${userId}/${fetchPage}`,
        {
          headers: { Authorization: `JWT ${token}` },
        }
      );
      return {
        data: res.data.data,
        currentPage: res.data.currentPage,
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

export async function getRecipes(fetchPage) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.get(`${c.GET_RECIPES}/${fetchPage}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      return {
        data: res.data.data,
        currentPage: res.data.currentPage,
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

export async function createOrUpdateRecipe(data) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.post(c.ADD_RECIPES, data, {
        headers: {
          Authorization: `JWT ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      return { data: res.data.data, rating: res.data.rating, error: false, message: "" };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function viewRecipe(id) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.get(`${c.VIEW_RECIPE}/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
          Accept: "application/json",
        },
      });
      
      return { data: res.data.data, rating: res.data.rating, error: false, message: "" };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function addRate(r_id, rating) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.post(
        `${c.ADD_RATING}`,
        { r_id, rating },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
      return { data: res.data.data, error: false, message: "" };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function getRate(r_id) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.post(
        `${c.GET_RATING}`,
        { r_id },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
      return { data: res.data.data, error: false, message: "" };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function addComment(commentId, recipeId, comment) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.post(
        `${c.ADD_COMMENT}`,
        { commentId, recipeId, comment },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
      return { data: res.data.data, error: false, message: "" };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function removeComment(commentId, recipeId) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.post(
        `${c.DELETE_COMMENT}`,
        { commentId, recipeId },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
      return { data: res.data.data, error: false, message: "" };
    } catch (err) {
      return { data: null, error: true, message: handler(err) };
    }
  } else {
    return { data: null, error: true, message: "Authentication token expired" };
  }
}

export async function getComments(recipeId) {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    try {
      const res = await axios.get(`${c.GET_COMMENTS}/${recipeId}`, {
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

export function handler(err) {
  let error = err;
  if (err.response && err.response.data.hasOwnProperty("message"))
    error = err.response.data;
  else if (!err.hasOwnProperty("message")) error = err.toJSON();

  return err.response.data;
}
