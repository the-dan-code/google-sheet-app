import { AppUserDetailsContext } from "../context/AppUserDetailsContext";
import { useContext } from "react";


export const useAppUserDetailsContext = () => {
    const context = useContext(AppUserDetailsContext)
    if (!context) {
        throw Error('appUserDetailsContext must be used inside an appUsersDetailsContextProvider')
    }
    return context
}