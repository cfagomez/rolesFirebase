import React from 'react';
import { LibrosContext } from '../context/LibrosProvider';
import { UsuarioContext } from '../context/UsuarioProvider';
import AuthorReference from './AuthorReference';
import InputBooks from './InputBooks';

const Libros = () => {

    const {books, getBooks} = React.useContext(LibrosContext)
    const {user} = React.useContext(UsuarioContext)

    React.useEffect(() => {

        getBooks()

    }, [])

  return (
      <div className="container mt-5">
          <h3 className='lead text-center'>Libros</h3>
          <ul className='list-group'>
            {
                books.map(book => (
                    <li className='list-group-item' key={book.id}>
                        {book.title}
                        <AuthorReference author={book.author} id={book.id}/>
                        
                    </li>
                    
                ))
            }
          </ul>
          {
              user.rol === 'author' ? (
                <InputBooks />
              ) : (
                  null
              )
          }
          
      </div>
  );
};

export default Libros;
