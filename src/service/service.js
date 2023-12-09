import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const myApi = axios.create({
    baseURL: BACKEND_URL,
})

myApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

myApi.fetchPosts = () => {
    return myApi.get("/posts")
}
myApi.getPost = (postId) => {
    return myApi.get(`/posts/${postId}`)
}
myApi.getCats = () => {
    return myApi.get("/categories")
}
myApi.createPost = (newPost) => {
    return myApi.post("/posts", newPost)
}
myApi.deletePost = (postId) => {
    return myApi.delete(`/posts/${postId}`)
}
myApi.updatePost = (postId, username, title, desc) => {
    return myApi.patch(`/posts/${postId}`, { username, title, desc })
}
myApi.updateUser = (userId, updatedUser) => {
    console.log("Request body for updateUser:", updatedUser); // Ajoutez ce log
    return myApi.patch(`/users/${userId}`, updatedUser);
}
myApi.deleteUser = (userId) => {
    return myApi.delete(`/users/${userId}`)
}



export default myApi