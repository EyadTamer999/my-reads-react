import "./App.css";
import {useEffect, useState} from "react";
import Header from "./Components/Header"
import Shelves from "./Components/Shelves";
import Book from "./Components/Book";
import * as React from "react";
import * as BooksAPI from "./BooksAPI";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

function App() {

    const [books, setBooks] = useState([]);
    //the search bar query
    const [query, setQuery] = useState("");
    //the res of the query
    const [queryBooks, setQueryBooks] = useState([])
    const [allBooks, setAllBooks] = useState([]);
    const [idOfBooks, setidOfBooks] = useState(new Map());

    useEffect(() => {
        BooksAPI.getAll().then(data => {
            setBooks(data);
            setidOfBooks(mapOfBooks(data));
        });

    }, []);

    useEffect(() => {
        let flag = true;
        if (query)
            //show books you're looking for
            BooksAPI.search(query).then(data => {
                if (data.error) setQueryBooks([]); else if (flag) setQueryBooks(data);
            })
        else
            //show books u have
            BooksAPI.getAll().then(data => {
                if (data.error) setQueryBooks([]); else if (flag) setQueryBooks(data);
            })
        return () => {
            flag = false;
            setQueryBooks([]);
        }
    }, [query])

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

    useEffect(() => {
        const sum = queryBooks.map(book => {
            if (idOfBooks.has(book.id)) {
                return idOfBooks.get(book.id);
            } else {
                return book;
            }
        })
        setAllBooks(sum);
    }, [queryBooks]);

    const mapOfBooks = (books) => {
        const mapOfBooks = new Map();
        books.map(book => mapOfBooks.set(book.id, book));
        return mapOfBooks;
    }

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/search">
                        <div className="search-books">
                            <div className="search-books-bar">
                                <Link to="/">
                                    <button className="close-search">Close</button>
                                </Link>
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
                                    {allBooks.map(b => (<li key={b.id}>
                                            <Book book={b} updateShelves={updateShelves}/>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </Route>
                    <Route path="/">
                        <div className="list-books">
                            <Header/>
                            <div className="list-books-content">
                                <Shelves books={books} updateShelves={updateShelves}/>
                            </div>
                            <div className="open-search">
                                <Link to="/search">
                                    <button>Add a book</button>
                                </Link>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
