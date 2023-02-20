import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () =>{
        logOut()
            .then(() => {
                navigate('/login')
             })
        .catch((err)=>console.log(err))
    }
    return (
        <div className="mt-20">
            <h2 className='text-xl font-bold text-center'>404</h2>
        <p className="text-error text-center"> Something went wrong!!</p>
        <p className="text-error text-center">
          {error.statusText || error.message}
        </p>
        <p className="text-3xl my-5 text-center">
          Please{" "}
          <button className="btn btn-warning" onClick={handleLogout}>
            Log out
          </button>{" "}
          and log back in, OR
        </p>
        <p className="text-center">
          <Link to="/" className="btn btn-primary text-center">
            Go Home
          </Link>
        </p>
      </div>
    );
};

export default DisplayError;