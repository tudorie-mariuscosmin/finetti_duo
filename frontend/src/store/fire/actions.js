/*
export function someAction (context) {
}
*/

import { axios } from "boot/axios"
import { LocalStorage } from 'quasar'

export function login({ commit }, data) {
    return new Promise((resolve, reject) => {
        axios.post('/auth/login', data).then(response => {
            let token = response.data.token
            LocalStorage.set("token", token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit("auth_success", token)
            resolve(token)
        }).catch(err => {
            LocalStorage.removeItem('token')
            reject(err)
        })


    })
}

export function logout({ commit }) {
    return new Promise((resolve, reject) => {
        commit('logout')
        LocalStorage.remove('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
    })
}

export async function getEconomies({ commit }) {
    try {
        let response = await axios.get('/economies')
        commit('setEconomies', response.data)
    } catch (err) {
        console.log(err)
    }
}

export async function addEconomy({ commit }, data) {
    try {
        await axios.post('/economies', data)
        commit('pushEconomy', data)

    } catch (err) {
        console.log(err)
    }
}

export async function getInvestment({ commit }) {
    try {
        let response = await (axios.get('/investments'))
        commit('setInvestments', response.data)
    } catch (err) {
        console.log(err)
    }
}

export async function addInvestment({ commit }, data) {
    try {
        await axios.post('/investments', data)
        commit('pushInvestment', data)
    } catch (err) {
        console.log(err)
    }
}

export async function setSavings({ commit }, data) {
    commit('setSavings', data)
}