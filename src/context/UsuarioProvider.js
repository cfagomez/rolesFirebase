import React from 'react';
import { db, auth, firebase } from '../firebase';

export const UsuarioContext = React.createContext()

const UsuarioProvider = (props) => {

    const firstData = {
        email: null,
        uid: null,
        activo: null,
        rol: 'Invitado'
    }

    const [user, setUser] = React.useState(firstData)
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        detectUser()
    }, [])

    const login = async () => {

        try {

            const provider = new firebase.auth.GoogleAuthProvider()
            const res = await auth.signInWithPopup(provider)

            const userExists = await db.collection('usuarios').doc(res.user.email).get()

            if (!userExists.exists) {

                await db.collection('usuarios').doc(res.user.email).set({
                    email: res.user.email,
                    uid: res.user.uid,
                    rol: 'guest'
                })

            }

        } catch (error) {
            console.log(error)
        }

    }

    const logOut = () => {

        auth.signOut()

    }

    const detectUser = () => {
        auth.onAuthStateChanged((user) => {

            if (user) {
                user.getIdTokenResult()
                    .then(idTokenResult => {
                        console.log(idTokenResult)
                        if(!!idTokenResult.claims.admin) {

                            setUser({
                                email: user.email,
                                uid: user.uid,
                                rol: 'admin',
                                activo: true
                            })

                        } else if (!!idTokenResult.claims.author) {

                            setUser({
                                email: user.email,
                                uid: user.uid,
                                rol: 'author',
                                activo: true
                            })

                        } else {

                            setUser({
                                email: user.email,
                                uid: user.uid,
                                rol: 'invited',
                                activo: true
                            })

                        }
                    })
            } else {

                setUser(firstData)

            }

        })
    }

    const getUsers = async () => {

        try {
            const res = await db.collection('usuarios').get()
            const arrayUsers = res.docs.map(doc => doc.data())
            setUsers(arrayUsers)
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <UsuarioContext.Provider value={{login, logOut, user, getUsers, users}}>
        {props.children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioProvider;
