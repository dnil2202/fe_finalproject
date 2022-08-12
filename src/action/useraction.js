// action yang akan di panggil/import ke ui kita

import axios from "axios"
import { API_URL } from "../helper"


export const loginAction=(data)=>{
    console.log('data dari page LOGIN', data)
    return{
        type: "LOGIN_SUCCESS",
        payload: data

    }
}

export const loginMiddleWare=(email,password)=>{
    return async (dispatch)=>{
        try {
            let res = await axios.post(API_URL+`/auth/login`,{
                email, password
            })
            console.log('data login',res)
            localStorage.setItem('sosmed',res.data.token)
            delete res.data.token
            dispatch({
                type:'LOGIN_SUCCESS',
                payload:res.data
            })
            return {success :true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction=()=>{
    localStorage.removeItem('sosmed')
    return{
        type:'LOGOUT_SUCCESS'
    }
}