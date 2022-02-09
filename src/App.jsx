import Navbar from "./components/Navbar";
import VistaAdmin from "./components/VistaAdmin";
import {UsuarioContext} from './context/UsuarioProvider'
import React from "react";
import Libros from "./components/Libros";
import InputBooks from "./components/InputBooks";

function App() {

  const {user} = React.useContext(UsuarioContext)

  return (
    <div className="App">
      <Navbar />
      {
        user.rol === 'admin' ? (
          <VistaAdmin />
        ) : (
          null
        )
      }
      <Libros />
    </div>
  );
}

export default App;
