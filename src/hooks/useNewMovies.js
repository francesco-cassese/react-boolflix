import { useEffect, useState } from "react";
import { getNewMovies } from "../utils/tmdbUtils";

function useNewMovies() {
    const [newMovies, setNewMovies] = useState([]);
    const [isNewLoading, setIsNewLoading] = useState(false);
    const [newError, setNewError] = useState(null);

    useEffect(() => {
        setIsNewLoading(true);
        setNewError(null);

        getNewMovies()
            .then(mappedMovies => {
                setNewMovies(mappedMovies);
            })
            .catch(error => {
                setNewError(error.message);
            })
            .finally(() => {
                setIsNewLoading(false);
            });

    }, []);

    return { newMovies, isNewLoading, newError };
}

export default useNewMovies;