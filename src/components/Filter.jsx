import React, { useContext, useState } from 'react'
import { BooksContext } from '../contexts/BooksContext';
import SearchResult from './SearchResult';

function Filter() {
  
    const [show, setShow] = useState(false);
    
    const toggleShow = () => {
        setShow(!show);
    }

    const {genre, changeGenre, fetching, setBooksNull} = useContext(BooksContext);

    const genres = [
        'Action',
        'Adventure',
        'Biography',
        'Coming-of-Age',
        'Contemporary',
        'Dystopian',
        'Educational',
        'Family Drama',
        'Fantasy',
        'Fiction',
        'Historical Fiction',
        'Historical Romance',
        'Humor',
        'Thriller',
        'Motivational',
        'Mystery',
        'Non-Fiction',
        'Paranormal',
        'Political Thriller',
        'Psychological Thriller',
        'Romance',
        'Science Fiction',
        'Self-Help',
        'Spy',
        'Time Travel',
        'Travel',
        'Urban Fantasy',
        'War'
      ];      
  
      const handleChange = (e) => {
        const selectedGenre = e.target.value;
        changeGenre(selectedGenre);
      }

      const applyFilter = () => {
        fetching();
        return(<SearchResult />)
      }

      const clearFilter = () => {
        changeGenre('');
        fetching();
      }

    return (
    <div>
        <div className='flex justify-between items-center mt-12'>
            <h1 className='text-3xl md:text-4xl xl:text-5xl font-semibold'>Reading<br />Reimagined.</h1>
            <div onClick={toggleShow} className='w-12 h-12 text-lg md:text-xl xl:text-2xl cursor-pointer flex justify-center items-center transition bg-[#e2e2e2] hover:bg-[#91c8ff] hover:text-white rounded-full'>{show ? <i className="ri-close-line"></i> : <i className="ri-filter-2-line"></i>}</div>
        </div>
        <div id='moreFilters' className={`${show ? 'block' : 'hidden'}`}>
            <div className='mt-4'>
                <h4 className='font-bold text-base md:text-lg xl:text-xl'>Genre</h4>
                <div className='flex flex-wrap gap-4 mt-4'>
                    {genres.map((value, index) => (
                        <div className='' key={index}>
                            <input type="radio" id={`${value}`} name='genre' value={value} checked={value === genre} onChange={(e) => handleChange(e)}/>
                            <label htmlFor={`${value}`}>{value}</label>
                        </div>
                    ))}
                </div>
                <div className='flex gap-4 mt-4'>
                    <div className={`${genre ? 'block': 'hidden'} cursor-pointer p-2 rounded-xl text-white bg-[#91c8ff] transition hover:text-black hover:bg-white ring-[#91c8ff] hover:ring-4`} onClick={applyFilter}>Apply</div>
                    <div className={`${genre ? 'block': 'hidden'} cursor-pointer p-2 rounded-xl text-white bg-[#91c8ff] transition hover:text-black hover:bg-white ring-[#91c8ff] hover:ring-4`} onClick={clearFilter}>Clear</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Filter