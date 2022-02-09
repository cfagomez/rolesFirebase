import React from 'react';
import { LibrosContext } from '../context/LibrosProvider';
import { UsuarioContext } from '../context/UsuarioProvider';

const AuthorReference = (props) => {

    const [author, setAuthor] = React.useState('')

    const {user} = React.useContext(UsuarioContext)
    const {deleteBook} = React.useContext(LibrosContext)

    React.useEffect(() => {

        getAuthor()

    }, [])

    const getAuthor = async () => {
        try {

            const res = await props.author.get()
            setAuthor(res.data().email)

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <span> - {author}</span>
        {
            author === user.email ? (
                <button onClick={() => deleteBook(props.id)} className='btn btn-danger btn-sm float-end'>Delete</button>
            ) : (
                null
            )
        }
    </>
    
  );
};

export default AuthorReference;
