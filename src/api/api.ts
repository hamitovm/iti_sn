import axios from "axios";

const instance = axios.create({
    //Как указано в спецификации www.w3.org/TR/cors/#omit-credentials-flag,
    // withCredentials позволяет нам использовать в запросе к серверу user-credentials,
    // т.е. куки, аутентификационные данные и клиентские SSL-сертификаты.
    //в post, get - запросах объект с withCredentials пишется вторым параметом
    //в delete, put - запросах объект с withCredentials пишется третим параметом
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    //    headers - API key - ключ доступа
    headers: {
        'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
    }
})

export const usersAPI = {
    //Получение списка пользователей во вкладке users
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            // Вернет промис с данными с сервера
            .then(response => response.data)
    },
    //Запись getUsers2 равносильна getUsers, но без использования instance (axios.create)
    getUsers2(currentPage: number = 1, pageSize: number = 10) {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
                }
            })
            // Вернет промис с данными с сервера
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    }
}

//Для вывода профиля юзера при переходе на него
export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    }
}

//Вывод имени пользователя, почты и т.д. в шапке после авторизации
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe
        })
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}


