import { useState, useEffect } from "react";
import { useAppUserDetailsContext } from "../hooks/useAppUserDetailsContext";

const AppUserDetailForm = ({ initialValues }) => {
    const { dispatch } = useAppUserDetailsContext()
    const [formData, setFormData] = useState(initialValues)

    // console.log(formData)

    // Update form data when initialValues change
    useEffect(() => {
      setFormData(initialValues);
    }, [initialValues]);

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const url = formData._id ? `/api/app-user-data/${formData._id}` : `/api/app-user-data` ;

        const response = await fetch( url , {
            method: formData._id ? 'PATCH' : 'POST', 
            body: JSON.stringify(formData),
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
            
            if(formData._id){
                dispatch({type: 'UPDATE_APP_USER_DETAILS', payload: formData})
            }else{
                dispatch({type: 'CREATE_APP_USER_DETAILS', payload: json})
            }
            
            clearFormData()
            setEmptyFields([])
            setError(null)
            console.log("new user data added ", json)
            
        }
    }

    const clearFormData = () => {
        setFormData({
            name: '',
            email: '',
            role: '',
            sheet_url: ''
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleCancel = (e) => {
        clearFormData()
    }

    return (
        <form className="create-app-user-details" onSubmit={handleFormSubmit}>
            <h3>Add New App User</h3>
            
            <label>User Email</label>
            <input
                name="email" 
                type="email" 
                onChange={handleChange}
                value={formData.email}
                className={emptyFields.includes("email") ? 'error' : ''}
            />
            
            <label>User Name</label>
            <input
                name="name" 
                type="text" 
                onChange={handleChange}
                value={formData.name}
                className={emptyFields.includes("name") ? 'error' : ''}
            />

            <label>Role</label>
            <input
                name="role" 
                type="text" 
                onChange={handleChange}
                value={formData.role}
                className={emptyFields.includes("role") ? 'error' : ''}
            />

            <label>Sheet Url</label>
            <input
                name="sheet_url" 
                type="text" 
                onChange={handleChange}
                value={formData.sheet_url}
                className={emptyFields.includes("sheet_url") ? 'error' : ''}
            />
            {formData._id ? (
              <>
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
                <button type="submit">Add</button>
            )}
            {/* <button>Add App User</button> */}
            { error && <div className="error">{error}</div> }
        </form>
    )

}

export default AppUserDetailForm