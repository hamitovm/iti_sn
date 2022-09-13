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
    //Промис может находиться в 1 из 3 состояний: pending(ожидание), resolved (выполнился), rejected (промис не выполнен и никогда не выполнится).
    //Промис не может из состояния resolved перейти в rejected и наоборот.
    const promise1 = axios.get('https://google.com')
    //Строка выше вернет объект промис, который будет находится в состоянии pending, до тех пор пока не выполнится или не станет rejected.

    //then - метод промиса (подписка на выполнение промиса), который выполняется когда промис выполнится (пример состояние resolved),
    // в него можно передать колбек, который в себя примет результат выполнения промиса.
    // Если подписаться на промис, который уже будет в состоянии resolved - все равно выполнится.
    promise1.then((data) => {
        console.log(data)})
    //catch - метод промиса (подписка), который выполняется, если промис не смог выполнится и попал в состояние  rejected, внутри колбека принимает ошибку.
    promise1.catch((error)=> {} )
    //finally - метод промиса (подписка), который выполняется, если промис попал либо в состояние resolved, либо в rejected, внутри колбека принимает ошибку.
    promise1.finally(()=> { console.log('Finish')} )


    //Запись аналогична той, что выше
    axios.get('https://google.com')
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(()=> { console.log('Finish')} )



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
