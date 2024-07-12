import axios from 'axios';
import jwt_decode from 'jwt-decode';
const API = axios.create({ baseURL: `http://localhost:8700/api` }); 

//auth
export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
});
export const googleSignIn = async ({
    name,
    email,
    img,
}) => await API.post('/auth/google', {
    name,
    email,
    img,
});
export const findUserByEmail = async (email) => await API.get(`/auth/findbyemail?email=${email}`);
export const generateOtp = async (email,name,reason) => await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);
export const resetPassword = async (email,password) => await API.put(`/auth/forgetpassword`,{email,password});

//user api
export const getUsers = async (token) => await API.get('/user', { headers: { "Authorization" : `Bearer ${token}` }},{
    withCredentials: true
    });
export const searchUsers = async (search,token) => await API.get(`users/search/${search}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });


//anime api
export const createAnime = async (anime,token) => await API.post('/animes', anime, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getAnimes = async () => await API.get('/animes');
export const addEpisodes = async (anime,token) => await API.post('/animes/episode', anime, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const favoriteAnime = async (id,token) => await API.post(`/animes/favorit`,{id: id}, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getRandomAnime = async () => await API.get('/animes/random');
export const getAnimeByTags = async (tags) => await API.get(`/animes/tags?tags=${tags}`);
export const getAnimeByCategory = async (category) => await API.get(`/animes/category?q=${category}`);
export const getMostPopularAnime = async () => await API.get('/animes/mostpopular');
export const getAnimeById = async (id) => await API.get(`/animes/get/${id}`);
export const addView = async (id) => await API.post(`/animes/addview/${id}`);
export const searchAnime = async (search) => await API.get(`/animes/search?q=${search}`);

