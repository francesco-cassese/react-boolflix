import useFetch from "./useFetch";
import CardMovie from "../components/CardMovie";

const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular'

function usePopularMovies() {

    const { data, error, isLoading } = useFetch(API_URL_POPULAR)

    const movies = data?.results?.map(movie => ({
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        poster: movie.poster_path,
        rating: movie.vote_average,
        originalLanguage: movie.original_language,
    }))

    return { movies, error, isLoading }
}
export default usePopularMovies