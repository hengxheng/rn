import React from 'react';

//API URL
export const API_URL = 'http://localhost:3003';

//API End Points
export const REGISTER = `${API_URL}/register`;
export const LOGIN = `${API_URL}/login`;
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;

export const GET_USERS = `${API_URL}/users`;


export const GET_RECIPES = `${API_URL}/recipes`;
export const ADD_RECIPES = `${API_URL}/recipe/add`;