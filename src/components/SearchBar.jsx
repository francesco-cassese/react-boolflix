import { useState, useContext, useEffect } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { BsSearch } from 'react-icons/bs';
import styles from "./SearchBar.module.css"

function SearchBar() {
    const [movieSearchTitle, setMovieSearchTitle] = useState("");
    const [isCompact, setIsCompact] = useState(
        () => window.matchMedia("(max-width: 991.98px)").matches
    );

    const { setQuery } = useContext(MovieContext);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 991.98px)");
        const handleChange = (event) => setIsCompact(event.matches);

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const handleSearchChange = (event) => {
        const { value } = event.target;

        setMovieSearchTitle(value);
    };

    const handleMovieSearch = (event) => {
        event.preventDefault();

        setQuery(movieSearchTitle);
    };

    return (
        <div className="me-5">
            <form onSubmit={handleMovieSearch}>
                <div className={`input-group align-items-center ${styles.searchBox}`}>
                    <label
                        htmlFor="titoloFilm"
                        className="form-label visually-hidden"
                    >
                        Ricerca il titolo del film
                    </label>

                    <span className="input-group-text bg-transparent border-0 text-white pe-2" id="search-addon">
                        <BsSearch size={18} />
                    </span>

                    <input
                        type="text"
                        id="titoloFilm"
                        className={`form-control bg-transparent border-0 text-dark shadow-none ps-0 text-white ${styles.searchInput}`}
                        placeholder={isCompact ? "Cerca un film..." : "Inserisci il titolo da cercare..."}
                        value={movieSearchTitle}
                        onChange={handleSearchChange}
                        aria-label="Cerca un film"
                        aria-describedby="search-addon"
                    />


                    <button
                        className={styles.searchButton}
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