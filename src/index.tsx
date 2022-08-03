import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "./StoreContext";
import {store} from "./redux/redux-store";

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
// функция для отрисовки
rerenderEntireTree()

//Передает функцию ререндера в стейт, чтобы он сам мог при необходимости (как правило при изменении стейта) сам перерисовывать страницу
store.subscribe(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
