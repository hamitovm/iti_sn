import loading_animation from "../../assets/images/Spinner-1s-195px.svg";
import React from "react";

export type PreloaderPropsType = {

}

export const Preloader = (props: PreloaderPropsType) => {
    return <img src={loading_animation} alt=""/>
}