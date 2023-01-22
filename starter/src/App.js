import "./App.css";
import {useEffect, useState} from "react";
import Header from "./Components/Header"
import Shelves from "./Components/Shelves";
import book from "./Components/Book";
import * as BooksAPI from "./BooksAPI";
import Book from "./Components/Book";
import {getAll} from "./BooksAPI";

function App() {

    useEffect(() => {
            BooksAPI.getAll().then(data => setBooks(data));
        },
        []
    );


    const [books, setBooks] = useState([]);

    const updateShelves = (book, dest) => {
        const updatedBooks = books.map(b => {
            if (b.id === book.id) {
                book.shelf = dest;
                return book;
            }
            return b;
        })
        setBooks(updatedBooks);
        BooksAPI.update(updatedBooks, dest);
    }

    const [showSearchPage, setShowSearchpage] = useState(false);

    //the search bar query
    const [query, setQuery] = useState("");

    //the res of the query
    const [queryBooks, setQueryBooks] = useState([])

    useEffect(() => {
        let flag = true;
        if (query)
            //show books you're looking for
            BooksAPI.search(query).then(data => {
                if (data.error)
                    setQueryBooks([]);
                else
                    if(flag)
                        setQueryBooks(data);
            })
        else
            //show books u have
            BooksAPI.getAll().then(data =>{
                if (data.error)
                    setQueryBooks([]);
                else
                if(flag)
                    setQueryBooks(data);
            })
        return () => {
            flag = false;
            setQueryBooks([]);
        }
    }, [query])

    return (
        <div className="app">
            {showSearchPage ? (
                <div className="search-books">
                    <div className="search-books-bar">
                        <a
                            className="close-search"
                            onClick={() => setShowSearchpage(!showSearchPage)}
                        >
                            Close
                        </a>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by title, author, or ISBN"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {queryBooks.map(b => (
                                    <li key={b.id}>
                                        <Book book={b} updateShelves={updateShelves}/>
                                    </li>
                                )
                            )
                            }
                        </ol>
                    </div>
                </div>
            ) : (
                <div className="list-books">
                    <Header/>
                    <div className="list-books-content">
                        <Shelves books={books} updateShelves={updateShelves}/>
                    </div>
                    <div className="open-search">
                        <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
