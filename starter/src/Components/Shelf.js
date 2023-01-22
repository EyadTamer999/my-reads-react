import React, {Component} from "react";
import Book from "./Book";

const Shelf = ({title, books}) => {

    return (<div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(b => (
                        <li>
                            <Book book={b}/>
                        </li>
                    )
                    )
                    }

                </ol>
            </div>
        </div>
    )
}

export default Shelf;