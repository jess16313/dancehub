import React, { useState,useRef } from 'react';
import {Routes, Route, Navigate, Link, BrowserRouter} from 'react-router-dom';
import SignUp from "./pages/sign-in.jsx";
import LogIn from "./pages/log-in.jsx";
import './App.css';
import Default from "./pages/default.jsx";

function App() {

    return (
        <Routes>
            <Route path='/' element={<Default/>}/>
            <Route path='/signup' element= {<SignUp/>} />
            <Route path='/login' element= {<LogIn/>} />
        </Routes>
  );

}

export default App;
