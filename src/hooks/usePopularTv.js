import { useEffect, useState } from "react";
import { getPopularTv } from "../utils/tmdbUtils";

function usePopularTv() {
    const [popularTv, setPopularTv] = useState([]);
    const [isPopularTvLoading, setIsPopularTvLoading] = useState(false);
    const [popularTvError, setPopularTvError] = useState(null);

    useEffect(() => {
        setIsPopularTvLoading(true);
        setPopularTvError(null);

        getPopularTv()
            .then(mappedMovies => {
                setPopularTv(mappedMovies);
            })
            .catch(error => {
                setPopularTvError(error.message);
            })
            .finally(() => {
                setIsPopularTvLoading(false);
            });

    }, []);

    return { popularTv, isPopularTvLoading, popularTvError };
}

export default usePopularTv;