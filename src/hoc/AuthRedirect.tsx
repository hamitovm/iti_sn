import React, {ComponentType} from "react";
import {Navigate} from "react-router-dom";
import {StateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: StateType):MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}
//https://www.youtube.com/watch?v=f5T5PAdaktQ
//https://www.youtube.com/watch?v=7W4PD4BN3eY&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8&index=71&t=1286s
export function withAuthRedirect<T>(Component: ComponentType<T>)  {
    const  RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        console.log(isAuth)
        if (!isAuth) return <Navigate to={'/login'}/>
        return <Component {...restProps as T}/>
    }

    const ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
}

