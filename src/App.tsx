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
import {Login} from "./components/Login/Login";

export function App() {



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
                    <Route path="/login"
                           element={<Login/>}/>
                </Routes>
            </div>
        </div>

    )
}

export default App;
