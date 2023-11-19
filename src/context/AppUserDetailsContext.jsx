import { createContext, useReducer } from "react";



export const AppUserDetailsContext = createContext()

export const appUserDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_APP_USER_DETAILS':
            return {
                appUserDetails: action.payload
            }
        case 'CREATE_APP_USER_DETAILS':
            return {
                appUserDetails: [action.payload, ...state.appUserDetails]
            }
        case 'DELETE_APP_USER_DETAILS':
            return {
                appUserDetails: state.appUserDetails.filter((e) => e._id !== action.payload._id)
            }
        case 'UPDATE_APP_USER_DETAILS':
            return {
                appUserDetails: [action.payload, ...state.appUserDetails.filter((e) => e._id !== action.payload._id)]
            }
        default:
            return state
    }
}

export const AppUserDetailsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appUserDetailsReducer, {
        appUserDetails: null
    }) 

    return (
        <AppUserDetailsContext.Provider value={{...state, dispatch}}>
            { children }
        </AppUserDetailsContext.Provider>
    )
}