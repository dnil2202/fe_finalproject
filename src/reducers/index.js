import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import reduxThunk from 'redux-thunk'

export const rootStore = configureStore({
    // Untuk mengelompokan seluruh reducernya
    reducer:{
        userReducer
    }
}, applyMiddleware(reduxThunk))