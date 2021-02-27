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
        return response.data
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
        return response.data
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
export async function setExpenses({ commit }, data) {
    commit('setExpenses', data)
}

export async function getInfo({ commit }) {
    let response = await axios.get('/economies')
    let responseInvestements = await axios.get('/investments')

    let economies = response.data
    let investments = responseInvestements.data

    let incomes = economies.filter((economies) => economies.isIncome).reduce((acc, cur) => acc + cur.value, 0)
    let expenses = economies.filter((economies) => !economies.isIncome).reduce((acc, cur) => acc + cur.value, 0);
    let savings = incomes - expenses;

    let gains = 0;
    let rateOfReturn = 0;
    let i;
    for (i = 0; i < investments.length; i++) {
        gains += (investments[i].expectedReturn / 100) * investments[i].value;
    }
    if (savings !== 0) {
        rateOfReturn = Math.round(((gains * 100) / savings) * 10) / 10;
    } else {
        rateOfReturn = 0;
    }

    commit('setRateOfReturn', rateOfReturn)
    commit('setSavings', savings)
    commit('setExpenses', expenses)
}