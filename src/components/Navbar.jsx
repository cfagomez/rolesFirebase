import React from 'react';
import { UsuarioContext } from '../context/UsuarioProvider';

const Navbar = () => {

    const {login, logOut} = React.useContext(UsuarioContext)

  return (
      <nav className='navbar navbar-dark bg-dark'>
          <div className="container">
            <a className='navbar-brand'>App</a>
            <div className="d-flex">
                <button onClick={() => login()} className='btn btn-primary mx-2'>Login</button>
                <button onClick={() => logOut()} className='btn btn-primary mx-2'>Log out</button>
            </div>
          </div>
      </nav>
  );
};

export default Navbar;
