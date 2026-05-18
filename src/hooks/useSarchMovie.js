import useFetch from "./useFetch";

function useSearchMovies(query) {
    const url = query
        ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=it-IT`
        : null;

    const { data, isLoading, error } = useFetch(url);

    const movies = data.map(mapMovie);

    return { movies, isLoading, error };
}

export default useSearchMovies;
