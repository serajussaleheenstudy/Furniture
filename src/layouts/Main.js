import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';


const Main = () => {
    const [dark, setDark] = useState(false);
    return (
      <div data-theme={dark ? "dark" : "light"}>
        <div className="md:mx-5">
          
        <NavBar setDark={setDark} dark={dark}></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
        </div>
      </div>
    );
};

export default Main;