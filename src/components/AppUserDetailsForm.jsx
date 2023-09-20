import { useState } from "react";
import { useAppUserDetailsContext } from "../hooks/useAppUserDetailsContext";

const AppUserDetailForm = () => {
    const { dispatch } = useAppUserDetailsContext()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [sheet_url, setSheetUrl] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const userdetails = {name, email, role, sheet_url}

        const response = await fetch('/api/app-user-data', {
            method: 'POST',
            body: JSON.stringify(userdetails),
            headers: {
                'content-type': 'application/json'
            }
        })

        const json = await response.json()
        
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok){
            setEmail('')
            setName('')
            setRole('')
            setSheetUrl('')
            setEmptyFields([])
            setError(null)
            console.log("new user data added ", json)
            dispatch({type: 'CREATE_APP_USER_DETAILS', payload: json})
        }
    }

    return (
        <form className="create-app-user-details" onSubmit={handleFormSubmit}>
            <h3>Add New App User</h3>
            
            <label>User Email</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes("email") ? 'error' : ''}
            />
            
            <label>User Name</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes("name") ? 'error' : ''}
            />

            <label>Role</label>
            <input 
                type="text" 
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className={emptyFields.includes("role") ? 'error' : ''}
            />

            <label>Sheet Url</label>
            <input 
                type="text" 
                onChange={(e) => setSheetUrl(e.target.value)}
                value={sheet_url}
                className={emptyFields.includes("sheet_url") ? 'error' : ''}
            />

            <button>Add App User</button>
            { error && <div className="error">{error}</div> }
        </form>
    )

}

export default AppUserDetailForm