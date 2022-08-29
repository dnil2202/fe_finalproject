// ini adalah reducer atau rak data
// sebelumnya harus menggabungkan reducer yang kita buat // file index.js
// 1. Menyiapka variable penampung datanya 

// Seperti mendifine react usestae
const INITIAL_STATE={
    idusers: null, 
    fullname: '',
    username: '',
    bio:'',
    email: '',
    status: '',
    status_id:null,
    images:'',
    posting:[],
    likes:[],
}

// argumen action untuk membawa data yg kita simpan,dan membawa kata kunci tempat
// harus mereturn data state yang akan disimpan di global store nya
// yg di return harus sesuai dengan kode/ key yg di kirim kan oleh si action
// misalnya action logout/login

export const userReducer=(state=INITIAL_STATE,action)=>{
    console.log("Data Action", action)
    console.log(action.type)
    switch (action.type){
        case "LOGIN_SUCCESS":
            //state akan di concade dengan action pilot u/ mendptkan data terbaru
            console.log(action.payload)
            return{...state, ...action.payload}
        case "UPDATE_PROFILE":
            return {...state, ...action.payload}
        case "LOGOUT_SUCCESS":
            return INITIAL_STATE
        default:
            return state
    }
}
