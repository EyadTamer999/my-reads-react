import React from "react";
import Shelf from "./Shelf";

const Shelves = ({books, updateShelves}) => {
    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");


    return (
        <div>
            <Shelf title="Currently Reading" books={currentlyReading} updateShelves={updateShelves}/>
            <Shelf title="Want to Read" books={wantToRead} updateShelves={updateShelves}/>
            <Shelf title="Read" books={read} updateShelves={updateShelves}/>
        </div>
    )
}

export default Shelves;