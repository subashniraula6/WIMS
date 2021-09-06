import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import Spinner from '../Spinner/Spinner'

const AdminRoute = ({component:Component, ...rest}) => {
    const auth = useSelector(store => store.authReducer);
    const { isLoading, isAuthenticated } = auth;
    const role = 
        useSelector(store => store.authReducer.user 
            && store.authReducer.user.roles[0]);
    if(isLoading){
        return <Spinner />
    }            
    if(isAuthenticated && role === 'ROLE_ADMIN')
        return <Route {...rest} component={Component}/>
    else if(isAuthenticated && role === 'ROLE_USER')
        return <Redirect to='/inventories'/>    
    else return <Redirect to='/login' />
}

export default AdminRoute
