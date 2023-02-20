import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../shared/NavBar';

const DashboardLayout = () => {
    const [dark, setDark] = useState(false);
    return (
      <div data-theme={dark ? "dark" : "light"}>
        <div className="md:mx-5">
          <NavBar setDark={setDark} dark={dark}></NavBar>
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default DashboardLayout;