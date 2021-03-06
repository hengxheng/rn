//API URL
export const API_URL = 'http://localhost:3003';
export const USER_PROFILE_IMAGE_URL= 'http://localhost:3003';
export const RECIPE_IMAGE_URL= 'http://localhost:3003';


// export const API_URL = 'http://7beeddfc.ngrok.io';
// export const USER_PROFILE_IMAGE_URL= 'http://7beeddfc.ngrok.io';
// export const RECIPE_IMAGE_URL= 'http://7beeddfc.ngrok.io';
//API End Points
export const REGISTER = `${API_URL}/register`;
export const LOGIN = `${API_URL}/login`;
export const LOGIN_GOOGLE = `${API_URL}/google/login`;
export const UPDATE_PROFILE = `${API_URL}/user/update`;
export const UPLOAD_AVATAR = `${API_URL}/user/upload_avatar`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;

export const ADD_RATING = `${API_URL}/recipe/rate/add`;
export const GET_RATING = `${API_URL}/recipe/rate/get`;
export const ADD_COMMENT = `${API_URL}/recipe/comment/add`;
export const DELETE_COMMENT = `${API_URL}/recipe/comment/delete`;
export const GET_COMMENTS = `${API_URL}/recipe/comments`;

export const SEND_MESSAGE = `${API_URL}/message/send`;
export const GET_MESSAGES = `${API_URL}/messages/get`;
export const VIEW_CONTACTS = `${API_URL}/messages/contact`;

export const GET_USERS = `${API_URL}/users`;
export const GET_USER_RECIPES = `${API_URL}/user/recipe`;

export const GET_RECIPES = `${API_URL}/recipes`;
export const ADD_RECIPES = `${API_URL}/recipe/add`;
export const VIEW_RECIPE = `${API_URL}/recipe`;

