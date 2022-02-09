import React from 'react';
import { LibrosContext } from '../context/LibrosProvider';
import { UsuarioContext } from '../context/UsuarioProvider';

const InputBooks = () => {

    const {user} = React.useContext(UsuarioContext)
    const {addBook} = React.useContext(LibrosContext)

    const [title, setTitle] = React.useState('')
    const [pages, setPages] = React.useState('')

    const addBooks = (e) => {

        e.preventDefault()

        if (!title.trim()) {
            return console.log('Campo vacio')
        }

        if (!pages.trim()) {
            return console.log('Campo vacio')
        }

        addBook(title, pages, user.email, user.uid )

        setTitle('')

        setPages('')

    }

  return (
      <div className="container mt-5 text-center">
          <h3 className='lead'>Agregar libros</h3>
          <form onSubmit={addBooks} className='mt-3'>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='form-control' placeholder='Title' />
              <input value={pages} onChange={(e) => setPages(e.target.value)} type="text" className='form-control mt-2' placeholder='Pages' />
              <button type="submit" className='btn btn-primary mt-2'>Agregar</button>
          </form>
      </div>
  );
};

export default InputBooks;
