import logo from './logo.svg';
import './App.css';
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import All from './Components/All/All'
import Categories from './Components/Categories/Categories'
import Platform from './Components/Platform/Platform';
import SortBy from './Components/SortedBy/SortBy'
import GameDetails from './Components/GameDetails/GameDetails';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from'jwt-decode'
import NotFound from './Components/NotFound/NotFound';
import axios from 'axios';


function App() {
  const [userData, setUserData] = useState(null)

  let getUserToken=()=>{
    let token = localStorage.getItem('TokenGame');
    let data = jwt_decode(token);
    setUserData(data)
    console.log(userData);

  }
  let ProtectRouting=(props)=>{
    if(localStorage.getItem('TokenGame') !=null){
      return props.children
    }else{
      <Navigate to={'/login'}/>
    }
  }
  let LogOut=()=>{
    localStorage.removeItem('TokenGame');
    setUserData(null);
    <Navigate to={'/login'}/>
  }
  useEffect(()=>{
    if(localStorage.getItem('TokenGame')!=null){
      getUserToken()
    }
  },[])

  let routes = createBrowserRouter([
    {path:'/',element:<MainLayout userData={userData} LogOut={LogOut}/>,
    children:[
      {path:'/home',element:<ProtectRouting><Home/></ProtectRouting>},
      {path:'/all',element:<ProtectRouting><All/></ProtectRouting>},
      {path:'/categories/:category',element:<ProtectRouting><Categories/></ProtectRouting>},
      {path:'/platform/:platform',element:<ProtectRouting><Platform/></ProtectRouting>},
      {path:'/sortby/:sortby',element:<ProtectRouting><SortBy/></ProtectRouting>},
      {path:'/details/:id',element:<ProtectRouting><GameDetails/></ProtectRouting>},
      {path:'/register',element:<Register/>},
      {path:'/login',element:<Login getUserToken={getUserToken}/>},
      {path:'*',element:<ProtectRouting><NotFound/></ProtectRouting>}
    ]}
  ])


  return (
   
   <>
   <RouterProvider router={routes}></RouterProvider>
   </>
  );
}

export default App;
