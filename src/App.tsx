import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Routes, Route} from 'react-router-dom';
import {ActionsType, RootStateType, StoreType} from "./redux/store";
import {Profile} from "./components/Profile/Profile";
import {store} from "./redux/redux-store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";

type AppPropsType = {
    store: StoreType
}

export function App(props: AppPropsType) {
        return (
        < div className='app_wrapper'>
            < Header/>
            < Navbar/>
            <div className='app_wrapper_content'>
                <Routes>
                    <Route
                        path="/dialogs/*"
                        element={<DialogsContainer
                            // store={props.store}
                                          // messagesPageData={props.state.messagesPageData}
                                          // dispatch={props.dispatch}
                        />}
                    />
                    <Route path="/profile/*"
                           element={<Profile/>}/>
                </Routes>
            </div>
        </div>

    )
}

export default App;
