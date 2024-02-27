import React, {useEffect, useState} from 'react'
import SingleBook from './SingleBook';
import { BooksContext } from '../contexts/BooksContext';
import { useContext } from 'react';

function Genre({genreName, value}) {

    const [genreData, setGenreData] = useState({});

    const {novel, fiction, romance, loading} = useContext(BooksContext);

    const setData = () => {
        if(genreName === 'Novel') {
            setGenreData({...novel});
        } else if(genreName === 'Fiction') {
            setGenreData({...fiction});
        } else {
            setGenreData({...romance});
        }
    }
    
    useEffect(() => {
        setData();
    }, [novel, fiction, romance])

  return (
    <div>
        <h4 className='mt-8 text-lg md:text-xl xl:text-2xl'>{genreName}</h4>
        <div key={value} className={`mt-4 flex gap-8 overflow-x-scroll overflow-y-hidden p-1 scroller`}>
            {
                loading ? (<div className='flex items-center justify-center h-full w-full my-12'>Loading...</div>) : (genreData && genreData.items && genreData.items.map(book => <SingleBook key={book.id} book={book}/>))   
            }
        </div>
    </div>
  )
}

export default Genre