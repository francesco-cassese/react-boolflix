import { useEffect, useState } from "react";
import { searchMoviesAndTv } from "../utils/tmdbUtils";

function useSearchMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!query || query.trim() === "") {
            setMovies([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        searchMoviesAndTv(query)
            .then(mergedList => {
                setMovies(mergedList);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [query]);

    return { movies, isLoading, error };
}

export default useSearchMovies;