import { useSelector } from 'react-redux'
import { selectToken } from '../features/auth/authSlice'
import {jwtDecode} from 'jwt-decode'
import { retry } from '@reduxjs/toolkit/query'
const useAuth = () => {
    const token = useSelector(selectToken)
    let isAdmin = false
    let isUser = false
    if (token) {
        const userDecoded = jwtDecode(token)
        const { _id,username, roles, firstName, lastName } = userDecoded
        isAdmin = roles === 'Admin'
        isUser = roles === 'User'
        return { _id,username, roles, firstName, lastName, isAdmin, isUser }
    }
    return { _id:'',username: '', isAdmin, isUser, firstName: '', lastName: '' }
}

export default useAuth