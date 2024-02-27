import { createContext, useEffect, useState } from "react";
import conf from "../../conf/conf";

export const BooksContext = createContext();

const BooksContextProvider = ({ children }) => {
  const googleKey = conf.googleKey;
  const [books, setBooks] = useState({});
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [novel, setNovel] = useState({});
  const [fiction, setFiction] = useState({});
  const [romance, setRomance] = useState({});
  const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=`;

  const fetchBooksByCriteria = async (criteria) => {
    try {
      const response = await fetch(`${baseUrl}${criteria}&langRestrict=en&orderBy=relevance&key=${googleKey}`);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching books:', error.message);
      return [];
    }
  };

  async function fetching() {
    const term = encodeURIComponent(query)
    const subject = encodeURIComponent(genre)
    let allResults = []
    if(term === '') {
      const queryResults = await fetchBooksByCriteria(`${subject}&maxResults=40`);
      const subjectResults = await fetchBooksByCriteria(`subject:${subject}&maxResults=40`);

      allResults = [
        ...queryResults,
        ...subjectResults
      ];

    } else {
      const queryResults = await fetchBooksByCriteria(`${term}`);
      const intitleResults = await fetchBooksByCriteria(`intitle:${term}`);
      const subjectResults = await fetchBooksByCriteria(`subject:${subject}`);
      const inauthorResults = await fetchBooksByCriteria(`inauthor:${term}`);

      allResults = [
        ...queryResults,
        ...intitleResults,
        ...subjectResults,
        ...inauthorResults,
      ];
    }
  
    // Combine results and filter based on unique criteria
  
    const uniqueResults = Array.from(new Set(allResults.map((item) => item.id)))
      .map((id) => allResults.find((item) => item.id === id))
      .filter(Boolean); 

    setBooks(uniqueResults);
  }

  const fetchMoreData = async () => {
    try {
      await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:novel&langRestrict=en&orderBy=newest&key=${googleKey}`).then(res => res.json()).then(data => setNovel(data));

      await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&langRestrict=en&orderBy=newest&key=${googleKey}`).then(res => res.json()).then(data => setFiction(data));

      await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:romance&langRestrict=en&orderBy=newest&key=${googleKey}`).then(res => res.json()).then(data => setRomance(data));
    } catch (error) {
      console.log('Error fetching more data :: ', error);
    }
  }

  function changeQuery(q) {
    setQuery(q);
  }

  function changeGenre(g) {
    setGenre(g);
  }

  function setBooksNull() {
    setBooks([]);
  }

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooksNull, query, changeQuery, genre, changeGenre, novel, fiction, romance, fetching }}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksContextProvider;