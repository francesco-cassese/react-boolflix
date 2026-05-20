import { useEffect, useState } from "react";
import { getMovieFullDetail } from "../utils/tmdbUtils";

function useMovieDetail(id) {

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!id) return;

        setLoading(true);
        setError(null);

        getMovieFullDetail(id)
            .then(({ movie, cast }) => {
                setMovie(movie);
                setCast(cast);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    return {
        movie,
        cast,
        loading,
        error
    };
}

export default useMovieDetail;