/*
export function someGetter (state) {
}
*/

export function getEconomies(state) {
    return state.economies
}
export function getInvestments(state) {
    return state.investments
}
export function getSavings(state) {
    return state.savings
}
export function getSavingsYearly(state) {
    return state.savings * 12
}
export function getExpensesYearly(state) {
    return state.expenses * 12
}

export function getRateOfReturn(state) {
    return state.rateOfRturn
}