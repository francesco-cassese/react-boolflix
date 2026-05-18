import useFetch from "./useFetch";
import mapMovie from "../utils/mapMovie";

const URL_MOVIES = 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=ritorno+al+futuro'

function useSearchMovies() {

    const { data, isLoading, error } = useFetch(URL_MOVIES);

    const movies = data.map(movie => ({
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
