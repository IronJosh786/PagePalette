import React, { useEffect, useState } from 'react'
import { BooksContext } from '../contexts/BooksContext'
import { useContext } from 'react'
import SingleBook from './SingleBook';

function SearchResult() {

  const {books, query, genre, loading} = useContext(BooksContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(books);
  }, [books, query]);

  return (
    <>
        <div>
            <h4 className='mt-8 text-lg md:text-xl xl:text-2xl'>Results for "{query || genre}"</h4>
            <div className={`mt-4 flex flex-wrap justify-center gap-8 p-1`}>
            {loading ? (
              <div className='flex items-center justify-center h-full w-full my-24'>Loading...</div>
            ) : (
              data &&
              Array.isArray(data) &&
              data.map(book => <SingleBook key={book.id} book={book} />)
            )}
            </div>
        </div>
    </>
  )
}

export default SearchResult