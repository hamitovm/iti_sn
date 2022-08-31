import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Routes, Route} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {
    // DialogsContainer,
    SuperDialogsContainer
} from "./components/Dialogs/DialogsContainer";
import {Users} from "./components/Users/Users";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";

export function App() {
    return (
        < div className='app_wrapper'>
            < Header/>
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
