import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {StoreContext} from "./StoreContext";
import { createRoot } from 'react-dom/client';
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";

export const rerenderentireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <StoreContext.Provider value={store}>
                    <App store={store}/>
                </StoreContext.Provider>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );


    // const container = document.getElementById('root');
    // const root = createRoot(container!)
    // root.render(
    //     <BrowserRouter>
    //         {/*В StoreContext.Provider вкладываются компонента, далее все дочерние элементы этой компоненты будут иметь доступ к значению этого контекста*/}
    //         {/*<StoreContext.Provider value={store}>*/}
    //             <App state={store.getState()}
    //                  store={store}
    //                  dispatch={store.dispatch.bind(store)}/>
    //         {/*</StoreContext.Provider>*/}
    //     </BrowserRouter>
    // );
}
// функция для отрисовки
rerenderentireTree()

//Передает функцию ререндера в стейт, чтобы он сам мог при необходимости (как правило при изменении стейта) сам перерисовывать страницу
store.subscribe(rerenderentireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
