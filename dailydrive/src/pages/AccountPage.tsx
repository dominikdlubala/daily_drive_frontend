import './styles/accountPage.css';

import { useEffect, useState } from "react";
import { User } from "../types";
import { useAuth } from "../hooks/useAuth";
import { getUserData } from "../services/UserService";

export default function AccountPage() {
    const { token } = useAuth(); 

    const [userData, setUserData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await getUserData(token);
            error ? setError(error.message) : setUserData(data);
        }

        fetchUserData();
    }, [token])

    console.log(userData); 

    return (
        <div className="page page-account">
            <div className="user-data">
                <div className="user-header">
                    <img src={userData?.gender === 'Male' ? `images/avatar-male.svg` : 'images/avatar-female.svg'} alt="avatar-man" className="avatar-image" /> 
                    <div className="user-name">
                        Cześć, { userData?.firstName ? userData?.firstName : userData?.username }
                    </div>
                </div>
                <div className="user-main-data">
                    <div className="user-data--item">
                        {userData &&  userData.firstName + ' ' + userData.lastName }
                    </div>
                    <div className="user-data--item">
                        {userData ? userData.email : 'Loading...'}
                    </div>
                </div>
            </div>
        </div>
    )
}