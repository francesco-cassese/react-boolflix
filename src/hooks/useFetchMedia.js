import { useEffect, useState } from "react";
import { fetchMediaMovies } from "../utils/tmdbUtils";

function useFetchMedia(endpoint, mediaType) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!endpoint) return;

        setLoading(true);
        setError(null);

        fetchMediaMovies(endpoint, mediaType)
            .then(setData)
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [endpoint, mediaType]);

    return {
        data,
        loading,
        error
    };
}

export default useFetchMedia;