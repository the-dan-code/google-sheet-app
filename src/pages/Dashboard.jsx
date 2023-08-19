import { auth } from "../firebaseConfig";

export default function Dashboard(){
    const user = auth.currentUser;

    return (
        <div>
            <h1>{user.displayName}</h1>
            <img src={user.photoURL} alt="" />
        </div>
    )

    
}