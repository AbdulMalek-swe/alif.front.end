import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, StyledEngineProvider,ThemeProvider ,createTheme} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, useNavigate } from 'react-router-dom';
import route from 'routes/Route';
import { Provider } from 'react-redux';
import store from 'rtk/store/store';
import "react-multi-carousel/lib/styles.css";
import axios from 'apiService/axios';
import  { addUserActions } from 'rtk/feature/addUserSlice';
import { useCookies } from 'react-cookie';
function App() {
  const [, , removeCookie] = useCookies(["token"]);
  
  useEffect(()=>{
  async function getUser(){
   try {
    const res = await axios.post('/user/me')
       store.dispatch(addUserActions.addUser(res.data.result))
   } catch (error) {
    removeCookie("token", { path: "/" });
   }
   }
     getUser()
  },[removeCookie])
  return (
    <RouterProvider router={route}/>
  );
}

export default App;
 const theme = createTheme({

 })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
   <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
      <Provider store={store}>
      <App/>
      </Provider>  
    </ThemeProvider>
   </StyledEngineProvider>
  
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
