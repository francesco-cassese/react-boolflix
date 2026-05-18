import mapMovie from "../utils/mapMovie";
import useFetch from "./useFetch";

const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?language=it-IT'

function usePopularMovies() {

    const { data, error, isLoading } = useFetch(API_URL_POPULAR)

    const movies = data.map(mapMovie);

    return { movies, error, isLoading }
}
export default usePopularMovies