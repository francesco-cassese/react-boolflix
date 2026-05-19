import { useEffect, useState } from "react";
import { getPopularMovies } from "../utils/tmdbUtils";

function usePopularMovies() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [isPopularLoading, setIsPopularLoading] = useState(false);
    const [popularError, setPopularError] = useState(null);

    useEffect(() => {
        setIsPopularLoading(true);
        setPopularError(null);

        getPopularMovies()
            .then(mappedMovies => {
                setPopularMovies(mappedMovies);
            })
            .catch(error => {
                setPopularError(error.message);
            })
            .finally(() => {
                setIsPopularLoading(false);
            });

    }, []);

    return { popularMovies, isPopularLoading, popularError };
}

export default usePopularMovies;