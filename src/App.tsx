import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Routes, Route} from 'react-router-dom';
import {
    // DialogsContainer,
    SuperDialogsContainer
} from "./components/Dialogs/DialogsContainer";
import {Users} from "./components/Users/Users";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import axios from "axios";

export function App() {
    //Промис - это объект, не имеет свойств, но имеет методы.
    //Промис может находиться в 1 из 3 состояний: pending(ожидание), resolved(или fulfilled) (выполнился), rejected (промис не выполнен и никогда не выполнится).
    //Промис не может из состояния resolved перейти в rejected и наоборот.
    const promise1 = axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=10&count=15`,
        {
            withCredentials: true,
            headers: {
                'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
            }
        })
    //Строка выше вернет объект промис, который будет находится в состоянии pending, до тех пор пока не выполнится или не станет rejected.

    //then - метод промиса (подписка на промис), переданный в него колбек выполнится когда сам промис выполнится (примет состояние fulfilled),
    // в него можно передать колбек, который в себя примет результат выполнения промиса.

    // Если подписаться на промис, который уже будет в состоянии resolved - все равно выполнится.
    promise1.then((data) => {
        console.log(data.data.items, 'promise1')
    })
    // then всегда возвращает новый промис, который примет состояние  fulfilled сразу после того, как выполнится колбек внутри then,
    // таким образом можно выстраивать цепочки из нескольких then
    const promise1_1 = promise1.then((data) => {
        console.log(data, 'promise1_1')
    })

    //catch - метод промиса (подписка), который выполняется, если промис не смог выполнится и попал в состояние  rejected, внутри колбека принимает ошибку.
    promise1.catch((error) => {
    })
    //finally - метод промиса (подписка), который выполняется, если промис попал либо в состояние resolved, либо в rejected, внутри колбека принимает ошибку.
    promise1.finally(() => {
        console.log('Finish')
    })

    // (then, catch, finally - методы экземпляра(!!!) класса Promise)


    //Запись аналогична той, что выше
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=10&count=15`,
        {
            withCredentials: true,
            headers: {
                'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
            }
        })
        .then((data) => {
            console.log(data.data.items, 'first then return this')
            return data.data.items
        })
        .then((dataFromfirstThen) => {
            console.log(dataFromfirstThen[0], 'second then return this')
            return dataFromfirstThen[0]
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            console.log('Finish')
        })


    const promise2 = axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=10&count=15`,
        {
            withCredentials: true,
            headers: {
                'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
            }
        })
    promise2
        .then((data) => console.log(data, 'promise2'))


// Promise.all() - статический метод класса Promise, возвращает другой промис,
// который выполнится тогда, когда выполнятся переданные в all() промисы.
// Если хотя бы 1 промис внутри all не зарезолвится, то otherPromise тоже никогда не выполнится.
    const otherPromise = Promise.all([promise1, promise2])
    //в then внутрь result попадет массив результатов 2х переданных в otherPromise промисов
    otherPromise.then((result) => {
        const dataFromPromise1 = result[0]
        const dataFromPromise2 = result[1]
        console.log('2 промиса выполнились')
        console.log(dataFromPromise1, dataFromPromise2)
    })
        .catch(() => {
            console.log('initialization failed. Try later.')
        })
// Promise.allSettled() - статический метод класса Promise, возвращает другой промис
// (может не поддерживаться браузерами)
// Используется в том случае, если какой-то промис может не выполнится,
// но какую-то логику для этого случая нужно прописать
    const otherPromise2 = Promise.allSettled([promise1, promise2])
    //в then внутрь result попадет массив из 2 объектов
    // типа {status: fulfilled,  value: (результат промиса)} если промис выполнится и
    // типа {status: rejected,  reason: (результат промиса)} если промис не выполнится
    otherPromise2.then((result) => {
        const dataFromPromise1 = result[0].status === 'fulfilled'
            ? result[0].value
            : result[0].reason
        const dataFromPromise2 = result[1].status === 'fulfilled'
            ? result[1].value
            : result[1].reason
        console.log(dataFromPromise1, dataFromPromise2)
    })


    //Promise.resolve() - статический метод класса Promise,
    // создает промис, который будет в состоянии fulfilled, возвращает то, что передано в resolve()
    const resolvedPromise = Promise.resolve(100)
    resolvedPromise
        //Сразу упадет в then, т.к. будет в состоянии fulfilled
        .then((data) => console.log(data))
        .catch(error => console.warn(error))
    //Promise.reject() - статический метод класса Promise,
    // создает промис, будет в состоянии rejected, будет падать в catch
    const rejectedPromise = Promise.reject({message: 'someError'})
    rejectedPromise
        .then((data) => console.log(data))
        //Сразу упадет в catch, т.к. будет в состоянии rejected
        .catch(error => console.warn(error))

    //------------- await
    //В случае ниже в dataFromPromise попадет промис, чтобы достать из него данные нужно воспользоваться then
    let dataFromPromise = axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=10&count=15`,
        {
            withCredentials: true,
            headers: {
                'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
            }
        })
    dataFromPromise.then((data) => console.log(data))
    //В случае ниже dataFromPromise2 сразу попадут данные из промиса благодаря await,
    //но await доступен только внутри асинхронной (async) функции, в данном случае - async function getData()
    async function getData() {
        let dataFromPromise2 = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=10&count=15`,
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
                }
            })

    }

    //Промисификация
    function getNumber() {
        // const promise = Promise.resolve(Math.random())
        // Функция, переданная в конструкцию new Promise, называется исполнитель (executor).
        // Когда Promise создаётся, она запускается автоматически. Она должна содержать «создающий» код, который когда-нибудь создаст результат.
        // Её аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript. Наш код – только внутри исполнителя.
        // Когда он получает результат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:
        // resolve(value) — если работа завершилась успешно, с результатом value.
        // reject(error) — если произошла ошибка, error – объект ошибки.
        const promise = new Promise((resolve, reject) => {
            //Имитация задержки
            setTimeout(() => {
                resolve(Math.random())
            }, 2000)

        })
        return promise
    }

    getNumber().then(n => console.log(n + ' getNumber()'))


    const repo = {
        //Пример промисификации метода для сохранения данных,
        // подобная промисификация может понадобится когда на момент написания кода
        // еще не готова логика для сохранения данных на сервер, но необходимо прописать в коде
        // асинхронную логику для того, чтобы не переписывать синхронную в асинхронную позже
        saveAsync(data: any) {
            const promise = new Promise((resolve, reject) => {
                try {
                    // Временное сохранение в localStorage
                    localStorage.setItem('some-key', JSON.stringify(data))
                    resolve(' ')
                } catch (error) {
                    reject(error)
                }
            })
            return promise
        }
    }

    const resultOfSave = repo.saveAsync({name: 'IT-Incubator'})
    resultOfSave.then((data) => console.log('Saved'))
    resultOfSave.catch((error) => console.warn(error + ' - not saved'))

    //Аналог saveAsync c с использованием await
    const saveAsync2 = async () => {
        await repo.saveAsync({name: 'IT-Incubator'})
        console.log()
    }


    const wait =  (timer: number) => {
        return new Promise((resolve, reject) => {

            setTimeout(()=> {
                resolve({})
            }, timer)
        })

    }
    //С разницей в секунду будет логировать 1 2 и 3
    async function run() {
        await wait(1000)
        console.log('run 1')
        await wait(1000)
        console.log('run 2')
        await wait(1000)
        console.log('run 3')
    }
    run()


    return (
        < div className='app_wrapper'>
            < HeaderContainer/>
            < Navbar/>
            <div className='app_wrapper_content'>
                <Routes>
                    <Route
                        path="/dialogs/*"
                        element={<SuperDialogsContainer/>}
                    />
                    <Route path="/profile/"
                           element={<ProfileContainer/>}/>
                    <Route path={"/profile/:userId"}
                           element={<ProfileContainer/>}/>
                    <Route path="/users/*"
                           element={<UsersContainer/>}/>
                </Routes>
            </div>
        </div>

    )
}

export default App;
