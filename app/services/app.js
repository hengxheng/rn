import axios from "axios";
import { AsyncStorage } from "react-native";
import * as c from "../constants";

export async function getUserRecipes(userId, fetchPage) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.get(`${c.GET_USER_RECIPES}/${userId}/${fetchPage}`, {
        headers: { Authorization: `JWT ${token}` },
      });
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function getRecipes(fetchPage) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      const res = await axios.get(`${c.GET_RECIPES}/${fetchPage}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      return res;
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function createOrUpdateRecipe(data) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.post(c.ADD_RECIPES, data, {
        headers: {
          Authorization: `JWT ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function viewRecipe(id) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.get(`${c.VIEW_RECIPE}/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
          Accept: "application/json",
        },
      });
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function addRate(r_id, rating) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.post(
        `${c.ADD_RATING}`,
        { r_id, rating },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function getRate(r_id) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.post(
        `${c.GET_RATING}`,
        { r_id },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function addComment(commentId, recipeId, comment) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.post(
        `${c.ADD_COMMENT}`,
        { commentId, recipeId, comment },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function removeComment(commentId, recipeId) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.post(
        `${c.DELETE_COMMENT}`,
        { commentId, recipeId },
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export async function getComments(recipeId) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return await axios.get(
        `${c.GET_COMMENTS}/${recipeId}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
            Accept: "application/json",
          },
        }
      );
    } else {
      return { status: 401, data: { data: "JWT missing" } };
    }
  } catch (e) {
    throw handler(e);
  }
}

export function handler(err) {
  // let error = err;
  // console.log(err.response.data);
  // if (err.response && err.response.data.hasOwnProperty("message"))
  //   error = err.response.data;
  // else if (!err.hasOwnProperty("message")) error = err.toJSON();

  return new Error(err.response.data);
}
