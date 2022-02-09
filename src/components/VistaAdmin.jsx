import React from 'react';
import { UsuarioContext } from '../context/UsuarioProvider';
import { functions, db } from '../firebase';

const VistaAdmin = () => {

    const {getUsers, users} = React.useContext(UsuarioContext)

    React.useEffect(() => {
        getUsers()
    })

    const addAdmin = (email) => {

        const addRole = functions.httpsCallable('addAdmin')

        addRole({email: email})
            .then(res => {
                console.log(res)
                if (res.data.error) {
                    console.log('No tiene permisos')
                    return 
                }
                db.collection('usuarios').doc(email).update({
                    rol: 'admin'
                })
                    .then(() => {
                        console.log ('Admin created')
                    })
            })
    }

    const addAuthor = (email) => {

        const addRole = functions.httpsCallable('addAuthor')

        addRole({email: email})
            .then(res => {
                console.log(res)
                if (res.data.error) {
                    return console.log('No tiene permisos')
                }
                db.collection('usuarios').doc(email).update({
                    rol: 'author'
                })
                    .then(() => {
                        console.log ('Author created')
                    })
            })

    }

  return (
      <div className="container mt-5">
          <h3 className='lead text-center'>Administracion de usuarios</h3>
          <ul className='list-group mt-5'>
            {
                users.map(user => (
                    <li className='list-group-item' key={user.uid}>
                        {user.email} - {user.rol}
                        <button onClick={() => addAdmin(user.email)} className='btn btn-primary btn-sm float-end mx-1'>Admin</button>
                        <button onClick={() => addAuthor(user.email)} className='btn btn-primary btn-sm float-end mx-1'>Author</button>
                        <button  className='btn btn-secondary btn-sm float-end mx-1'>Guest</button>
                    </li>
                ))
            }
          </ul>
      </div>
  );
};

export default VistaAdmin;
