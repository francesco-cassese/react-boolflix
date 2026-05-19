import { useState, useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { BsSearch } from 'react-icons/bs';
import styles from "./Header.module.css"

function SearchBar() {
    const [movieSearchTitle, setMovieSearchTitle] = useState("");

    const { setQuery } = useContext(MovieContext);

    const handleSearchChange = (event) => {
        const { value } = event.target;

        setMovieSearchTitle(value);
    };

    const handleMovieSearch = (event) => {
        event.preventDefault();

        setQuery(movieSearchTitle);
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleMovieSearch}>
                <div className={`input-group align-items-center ${styles.searchBox}`}>
                    <label
                        htmlFor="titoloFilm"
                        className="form-label visually-hidden"
                    >
                        Ricerca il titolo del film
                    </label>

                    <span className="input-group-text bg-transparent border-0 text-dark pe-2" id="search-addon">
                        <BsSearch size={18} />
                    </span>

                    <input
                        type="text"
                        id="titoloFilm"
                        className="form-control bg-transparent border-0 text-dark shadow-none ps-0"
                        placeholder="Inserisci il titolo da cercare..."
                        value={movieSearchTitle}
                        onChange={handleSearchChange}
                        aria-label="Cerca un film"
                        aria-describedby="search-addon"
                    />


                    <button
                        className="btn btn-secondary"
                        type="submit"
                    >
                        Ricerca
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;