import React from 'react'
import Genre from './Genre';
import Filter from './Filter'
import SearchResult from './SearchResult';
import { BooksContext } from '../contexts/BooksContext';
import { useContext } from 'react';

function AllBooks() {

  const {query, genre} = useContext(BooksContext);

  return (
    <>
      <Filter />
      {(query === '' && genre === '') ? (
        <>
          <Genre genreName={'Novel'} value={'id1'} />
          <Genre genreName={'Fiction'} value={'id2'} />
          <Genre genreName={'Romance'} value={'id3'} />
        </>
      ) : (
        <SearchResult />
      )}
    </>
  );
}
  
export default AllBooks