import React from "react";
import {Profile} from "./Profile";
import {StateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, ProfileType, updateUserStatus} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {getAuthUserData} from "../../redux/auth-reducer";

export type ProfileContainerPropsType = {
    userProfile: ProfileType | null
    userStatus: string
    authorisedUserId: number | null
    isAuth: boolean
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    getAuthUserData: () => void
    router: {
        location: {
            hash: string
            key: string
            pathname: string
            search: string
            state: any
        }
        navigate: {
            length: 2
            name: ""
        }
        params: {
            [key: string]: string
        }
    }

}

function withRouter(Component: typeof React.Component) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}


export class ProfileClassComponent extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
        let userId = this.props.router.params.userId

        if (!userId && this.props.authorisedUserId) {
            userId = this.props.authorisedUserId.toString()
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        //Если пользователь не авторизован - он будет перенаправлен на страницу логина
        // if (!this.props.isAuth) return <Navigate to={'/login'} />
        return (
            <>
                <Profile {...this.props}/>
            </>
        )
    }
}

// let AuthRedirectComponent = (props: any) => {
//     if (!this.props.isAuth) return <Navigate to={'/login'} />
//     return <ProfileClassComponent {...props}/>
// }

let mapStateToProps = (state: StateType) => {
    return {
        userProfile: state.profilePageData.profile,
        userStatus: state.profilePageData.status,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth


    }
}
//withRouter самописный (выше), добавляет в компонент пропсы, из которых можно получить данные из URL текущей страницы
// let WithUrlDataContainerComponent = withRouter(ProfileClassComponent)


// export const ProfileContainer = withAuthRedirect(connect(mapStateToProps, {
//     getUserProfile: getUserProfile
// })(WithUrlDataContainerComponent))

//Compose - используется для сокращения кода при последовательном вызове функциями результатов вызовов других функций.
// (аргументы): функции для составления.
// Ожидается, что каждая функция будет принимать один параметр.
// Его возвращаемое значение будет передано в качестве аргумента функции, стоящей слева, и так далее.
// Исключением является крайний правый аргумент, который может принимать несколько параметров, поскольку он обеспечивает сигнатуру для результирующей составленной функции.
// В данном случае ProfileClassComponent будет вызван withAuthRedirect, результат будет вызван функцией withRouter,
// далее результат попадет в connect.
export const ProfileContainer = compose<React.ComponentType>(connect(mapStateToProps, {
        getUserProfile: getUserProfile,
        getUserStatus: getUserStatus,
        updateUserStatus: updateUserStatus,
        getAuthUserData

    }), withRouter,
    // withAuthRedirect
)(ProfileClassComponent)