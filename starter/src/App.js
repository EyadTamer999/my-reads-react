import "./App.css";
import {useEffect, useState} from "react";
import Header from "./Components/Header"
import Shelves from "./Components/Shelves";
import book from "./Components/Book";
import * as BooksAPI from "./BooksAPI";

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
        BooksAPI.update(updatedBooks,dest).then(data => console.log(data));
    }

    const [showSearchPage, setShowSearchpage] = useState(false);

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
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
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
