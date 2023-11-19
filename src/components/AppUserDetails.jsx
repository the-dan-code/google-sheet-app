import { useAppUserDetailsContext } from "../hooks/useAppUserDetailsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const AppUserDetails = ({ user_data, toEdit }) => {

    const { dispatch } = useAppUserDetailsContext()

    const handleClick = async () => {
        const response = await fetch('/api/app-user-data/' + user_data._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_APP_USER_DETAILS', payload: json})

        }
    }

    const handleClickEdit = async () => {
        const response = await fetch('/api/app-user-data/' + user_data._id, {
            method: 'GET'
        })

        const json = await response.json()
        toEdit(json)

    }

    return (
        <div className="user-details">
            <h4>{user_data.name}</h4>
            <p><strong>Email : </strong>{user_data.email}</p>
            <p><strong>Role : </strong>{user_data.role}</p>
            <p>{formatDistanceToNow(new Date(user_data.createdAt),{addSuffix: true})}</p>
            <div className="userDetailsaction">
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                <span className="material-symbols-outlined" onClick={handleClickEdit}>edit</span>
            </div>
        </div>
    )

}

export default AppUserDetails