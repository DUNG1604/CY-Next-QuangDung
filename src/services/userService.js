import { get, del, post } from './service.js'

function login(payload) {
    return post('/login', payload)
}
function signup(payload) {
    return post('/signup', payload)
}
function logout(payload) {
    return post('/logout', payload)
}
function getUser(payload) {
    return get('/user');
}
export const userService = {
    login,
    signup,
    logout,
    getUser,
}