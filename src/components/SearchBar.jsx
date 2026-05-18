import { useState } from "react";

function SearchBar() {

    const [movieSearchTitle, setMovieSearchTitle] = useState('');

    const handleSearchChange = event => {
        const { value } = event.target;

        setMovieSearchTitle(value);
    }

    const handleMovieSearch = event => {
        event.preventDefault()
        console.log('sto cercando il film', movieSearchTitle);

    }

    return (
        <div className="container">
            <form onSubmit={handleMovieSearch}>
                <label
                    htmlFor="titoloFilm"
                    className="form-label"> Ricerca il titolo del film
                </label>

                <input
                    type="text"
                    id="titoloFilm"
                    className="form-control"
                    value={movieSearchTitle}
                    onChange={handleSearchChange} />

                <button
                    className="btn btn-secondary"
                    type="submit"
                > Ricerca
                </button>
            </form>
        </div>
    )
}
export default SearchBar