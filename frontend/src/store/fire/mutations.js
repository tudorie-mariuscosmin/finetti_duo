/*
export function someMutation (state) {
}
*/

export function auth_success(state, token) {
    state.token = token
}
export function logout(state) {
    state.token = ''
}
