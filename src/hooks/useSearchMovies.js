import { useEffect, useState } from "react";
import { searchMoviesAndTv } from "../utils/tmdbUtils";

function useSearchMovies(query) {
    const [searchMovies, setMovies] = useState([]);
    const [isSearchingLoading, setIsSearchingLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    useEffect(() => {

        if (!query || query.trim() === "") {
            setMovies([]);
            return;
        }

        setIsSearchingLoading(true);
        setSearchError(null);

        searchMoviesAndTv(query)
            .then(mergedList => {
                setMovies(mergedList);
            })
            .catch(err => {
                setSearchError(err.message);
            })
            .finally(() => {
                setIsSearchingLoading(false);
            });

    }, [query]);

    return { searchMovies, isSearchingLoading, searchError };
}

export default useSearchMovies;