import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Redirector = () => {
    
	const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
	const role = useSelector(store => store.authReducer.user && store.authReducer.user.roles[0])
    
    if(isAuthenticated && role === 'ROLE_ADMIN'){
		return <Redirect to='/dashboard/users'/>
	} else if(isAuthenticated && role === 'ROLE_USER'){
		return <Redirect to='/inventories'/>
	}
    return null
}

export default Redirector
