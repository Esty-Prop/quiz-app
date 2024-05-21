import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authReducer from '../features/auth/authSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:false
});

export default store;


// const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer
//     },
//     middleware: (defaultMiddleware) => defaultMiddleware().concat(apiSlice.middleware),
//     devTools: false
// })
// export default store