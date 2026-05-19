import { useEffect, useState } from "react";

function useSearchMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setMovies([]);
            return;
        }

        const token = import.meta.env.VITE_TMDB_API_KEY;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const urlMovies = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
        const urlTv = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}`;

        setIsLoading(true);
        setError(null);

        Promise.all([
            fetch(urlMovies, options).then(response => {
                if (!response.ok) throw new Error("Errore proveniente da Movies");
                return response.json();
            }),
            fetch(urlTv, options).then(response => {
                if (!response.ok) throw new Error("Errore proveniente da Tv");
                return response.json();
            }),
        ])
            .then(([moviesData, tvData]) => {
                const moviesMapped = (moviesData.results ?? []).map((item) => ({
                    id: item.id,
                    title: item.title,
                    originalTitle: item.original_title,
                    poster: item.poster_path,
                    rating: item.vote_average,
                    originalLanguage: item.original_language,
                    type: "movie",
                }));

                const tvMapped = (tvData.results ?? []).map((item) => ({
                    id: item.id,
                    title: item.name,
                    originalTitle: item.original_name,
                    poster: item.poster_path,
                    rating: item.vote_average,
                    originalLanguage: item.original_language,
                    type: "tv",
                }));

                const mergedList = [...moviesMapped, ...tvMapped];

                setMovies(mergedList);
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [query]);

    return { movies, isLoading, error };
}

export default useSearchMovies;