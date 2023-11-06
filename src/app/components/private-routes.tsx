import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const PrivateRoutes = () => {

    const user = useSelector((state: RootState) => state.auth.currentUser)



    return (
        user ? <Outlet/> : <Navigate to='/login'/>
    )
}
