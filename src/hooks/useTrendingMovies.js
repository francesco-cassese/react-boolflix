import { useEffect, useState } from "react";
import { getTrendingMovies } from "../utils/tmdbUtils"

function useTrendingMovies() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isTrendingLoading, setIsTrendingLoading] = useState(false);
    const [trendingError, setTrendingError] = useState(null);

    useEffect(() => {
        setIsTrendingLoading(true);
        setTrendingError(null);

        getTrendingMovies()
            .then(mappedMovies => {
                setTrendingMovies(mappedMovies);
            })
            .catch(error => {
                setTrendingError(error.message);
            })
            .finally(() => {
                setIsTrendingLoading(false);
            });

    }, []);

    return { trendingMovies, isTrendingLoading, trendingError };
}
export default useTrendingMovies