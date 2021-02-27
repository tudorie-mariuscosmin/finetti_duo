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

export function setEconomies(state, data) {
    state.economies = data
}

export function pushEconomy(state, data) {
    state.economies.unshift(data)
}
