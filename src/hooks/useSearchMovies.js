import useFetch from "./useFetch";

function useSearchMovies(query) {
    const URL_MOVIES = query
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURI(query)}`
        : 'https://api.themoviedb.org/3/movie/popular';

    const { data, isLoading, error } = useFetch(URL_MOVIES);

    const movies = (data ?? []).map(movie => ({
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        poster: movie.poster_path,
        rating: movie.vote_average,
        originalLanguage: movie.original_language,
    }));

    return { movies, isLoading, error };
}

export default useSearchMovies;