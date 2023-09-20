import "./Test.css"
import Navbar from "../components/Navbar";
import AppUserDetails from "../components/AppUserDetails"
import AppUserDetailForm from "../components/AppUserDetailsForm"
import { useEffect} from "react";
import { useAppUserDetailsContext } from "../hooks/useAppUserDetailsContext";


const Test = () => {

    const {appUserDetails, dispatch} = useAppUserDetailsContext()

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
    },)  

    return (
        <div className="test">
            <Navbar />
            <div className="page-body">
                <div className="app-user-data">
                    {appUserDetails && appUserDetails.map((user_data) => (
                        <AppUserDetails key={user_data._id} user_data={user_data} />
                    ))}
                </div>
                <AppUserDetailForm />
            </div>
            
        </div>
    )
}

export default Test