import React, {ChangeEvent, useEffect, useState} from "react";

export type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

export type ProfileStatusStateType = {
    editMode: boolean,
    status: string
}
export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)
    //Локальный стейт объекта - есть только в классовых компонентах
    // state: ProfileStatusStateType = {
    //     editMode: false,
    //     status: this.props.status
    // }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    //componentDidUpdate - вызывается после того, как компонента была перерисована в результате изменения пропсов или стейта,
    // в componentDidUpdate приходит 2 аргумента: пропсы и стейт, которые были у компоненты до ее обновления
    //     componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: ProfileStatusStateType) {
    //
    //         if (prevProps.status !== this.props.status) {
    //             this.setState({
    //                 status: this.props.status
    //             })
    //         }
    //
    //     }
    useEffect(() => {
        if (props.status !== status) {
            setStatus(props.status)
        }
    }, [props.status])


    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '-----no status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} value={status} onChange={onStatusChange}/>
                </div>
            }

        </div>

    )

}