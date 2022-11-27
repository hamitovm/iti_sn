import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from 'react-router-dom';
import {SuperDialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer, withRouter} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {StateType} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader";
import {initializeApp} from "./redux/app-reducer";

export type AppPropsType = {
    initialized: boolean
    initializeApp: () => void

}

export class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
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
                               element={<LoginContainer/>}/>
                    </Routes>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(connect(mapStateToProps, {
        initializeApp
    }),
    withRouter
)(App)
