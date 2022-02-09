import React from 'react';
import AuthorReference from '../components/AuthorReference';
import { db } from '../firebase';

export const LibrosContext = React.createContext()

const LibrosProvider = (props) => {

    const [books, setBooks] = React.useState([])

    const getBooks = async () => {

        try {

            const res = await db.collection('libros').get()
            const arrayBooks = res.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }
            ))
            setBooks(arrayBooks)

        } catch (error) {
            console.log(error)
        }

    }

    const deleteBook = async (id) => {

        try {
            await db.collection('libros').doc(id).delete()
            getBooks()
        } catch (error) {
            console.log(error)
        }
    }

    const addBook = async (title, pages, email, uid) => {

        try {

            await db.collection('libros').add({
                title,
                pages,
                author: db.collection('usuarios').doc(email),
                uid
            })

            getBooks()

        } catch(error) {
            console.log(error)
        }

    }

  return (
    <LibrosContext.Provider value={{getBooks, books, deleteBook, addBook}}>
        {props.children}
    </LibrosContext.Provider>
  );
};

export default LibrosProvider;
