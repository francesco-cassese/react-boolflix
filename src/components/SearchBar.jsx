import { useState } from "react";

function SearchBar({ onSearch }) {
    const [movieSearchTitle, setMovieSearchTitle] = useState("");

    const handleSearchChange = event => {
        setMovieSearchTitle(event.target.value);
    };

    const handleMovieSearch = event => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <form onSubmit={handleMovieSearch}>
                <label htmlFor="titoloFilm" className="form-label">
                    Ricerca il titolo del film
                </label>

                <input
                    type="text"
                    id="titoloFilm"
                    className="form-control"
                    value={movieSearchTitle}
                    onChange={handleSearchChange}
                />

                <button className="btn btn-secondary" type="submit">
                    Ricerca
                </button>
            </form>
        </div>
    );
}

export default SearchBar;