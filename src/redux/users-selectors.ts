import {StateType} from "./redux-store";
import {createSelector} from "reselect";

// Селектор
export const getUsersSelector = (state: StateType) => {
    return state.usersPageData.users
}

// Селектор через библиотеку reselect -
// позволяет не вычислять значение внутри себя каждый раз,
// если входные параметры не менялись
// https://www.npmjs.com/package/reselect
// Принимает один или несколько «селекторов ввода» (либо в виде отдельных аргументов,
// либо в виде единого массива), один «селектор вывода» / «функция результата»
// и необязательный объект параметров, а также генерирует функцию селектора с запоминанием.
export const getUsers = createSelector(getUsersSelector, (users)=> {
    return users.filter(el => true)
})

export const getPageSize = (state: StateType) => {
    return state.usersPageData.pageSize
}

export const getTotalUsersCount = (state: StateType) => {
    return state.usersPageData.totalUsersCount
}

export const getCurrentPage = (state: StateType) => {
    return state.usersPageData.currentPage
}

export const getIsFetching = (state: StateType) => {
    return state.usersPageData.isFetching
}

export const getFollowingInProgress = (state: StateType) => {
    return state.usersPageData.followingInProgress
}
