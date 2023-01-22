import "./App.css";
import {useState} from "react";
import Header from "./Components/Header"
import Shelves from "./Components/Shelves";

function App() {

    const intialState = {
        showSearchPage: false,
        books: [
            {
                img: "",
                title: "",
                author: [],
                shelf: ""
            }
        ]
    }

    const [showSearchPage, setShowSearchpage] = useState(intialState);

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
                        <Shelves books={intialState.books}/>
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
