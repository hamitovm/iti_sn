import React, {ChangeEvent, useState} from "react";

export type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string)=> void
}

export type ProfileStatusStateType = {
    editMode: boolean,
    status: string
}
export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    // let [editMode, setEditMode] = useState<boolean>(false)
    //Локальный стейт объекта - есть только в классовых компонентах
    state: ProfileStatusStateType = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        //После setState переданные в него свойства перезапишутся в стейте объекта, компонента перерисуется
        //setState - асинхронен
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    //componentDidUpdate - вызывается после того, как компонента была перерисована в результате изменения пропсов или стейта,
    // в componentDidUpdate приходит 2 аргумента: пропсы и стейт, которые были у компоненты до ее обновления
        componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: ProfileStatusStateType) {

            if (prevProps.status !== this.props.status) {
                this.setState({
                    status: this.props.status
                })
            }

        }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '-----no status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true}  onBlur={this.deactivateEditMode} value={this.state.status} onChange={this.onStatusChange}/>
                    </div>
                }

            </div>

        )
    }

}