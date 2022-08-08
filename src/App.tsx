import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Routes, Route} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {
    // DialogsContainer,
    SuperDialogsContainer} from "./components/Dialogs/DialogsContainer";

export function App() {
        return (
        < div className='app_wrapper'>
            < Header/>
            < Navbar/>
            <div className='app_wrapper_content'>
                <Routes>
                    <Route
                        path="/dialogs/*"
                        element={<SuperDialogsContainer
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
