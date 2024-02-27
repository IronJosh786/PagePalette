import React from 'react'
import { BookmarkContext } from '../contexts/BookmarkContext.jsx';
import { BooksContext } from '../contexts/BooksContext.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  const { isOpen, setIsOpen, bookmarked } = useContext(BookmarkContext);
  const { query, changeQuery, fetching } = useContext(BooksContext);

  const handleSubmit = () => {
    if(query === '') return;
    fetching();
  }

  const length = bookmarked.length;

  return (
    <div className='flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between mt-4'>
        <Link to={'/'}>
            <div className='flex gap-4 items-center'>
                <div className='w-12 h-12 flex items-center justify-center text-2xl md:text-3xl xl:text-4xl rounded-full bg-[#91c8ff] p-2'>
                    <i className="ri-book-line"></i>
                </div>
                <h2 className='text-2xl md:text-3xl xl:text-4xl font-bold'>PagePalette</h2>
            </div>
        </Link>
        <div className='flex gap-2 items-center w-full md:w-[35%]'>
            <input value={query} onChange={(e) => changeQuery(e.target.value)} className='border border-black rounded-xl font-semibold p-2 w-full text-base md:text-lg xl:text-xl' type="text" placeholder='Search by books...'/>
            <button onClick={handleSubmit} className='h-12 w-12 rounded-full p-2 text-base md:text-lg xl:text-xl flex items-center justify-center transition bg-[#e2e2e2] hover:bg-[#91c8ff] hover:text-white'><i className="ri-search-line"></i></button>
            <div className='relative w-12 h-12 flex items-center justify-center text-2xl md:text-3xl xl:text-4xl hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
              <i className="ri-heart-fill" style={{color: 'red'}}></i>
              <div className='absolute right-0 bottom-0 text-sm'>{length}</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar