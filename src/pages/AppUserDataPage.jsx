import Navbar from "../components/Navbar";
import AppUserDetails from "../components/AppUserDetails"
import AppUserDetailForm from "../components/AppUserDetailsForm"
import { useState,useEffect} from "react";
import { useAppUserDetailsContext } from "../hooks/useAppUserDetailsContext";


const AppUserDataPage = () => {

    const {appUserDetails, dispatch} = useAppUserDetailsContext();
    

    const [initialValues, setInitialValues] = useState({
        name:'',
        email:'',
        role:'',
        sheet_url:''
    })

    useEffect(() => {
        const fetchAppUserData = async () => {
            const response = await fetch('/api/app-user-data')
            const json = await response.json()
            // console.log(json)
            

            if (response.ok){
                dispatch({type: 'SET_APP_USER_DETAILS', payload: json})
            }
        }

        console.log(appUserDetails)
        fetchAppUserData()
    },[dispatch])  

    const handleOnEdit = (formData) => {
        setInitialValues(formData)
    }

    return (
        <div className="test">
            <Navbar />
            <div className="page-body">
                <div className="app-user-data">
                    {appUserDetails && appUserDetails.map((user_data) => (
                        <AppUserDetails key={user_data._id} user_data={user_data} toEdit={handleOnEdit} />
                    ))}
                </div>
                <AppUserDetailForm initialValues={initialValues} />
            </div>
            
        </div>
    )
}

export default AppUserDataPage