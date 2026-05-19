import useFetch from "./useFetch";

const URL_TRENDING_MOVIE = "https://api.themoviedb.org/3/trending/movie/week";

function useTrendingMovies() {
    const { data, isLoading, error } = useFetch(URL_TRENDING_MOVIE);

    const trendingMovies = (data?.results || []).map(item => ({
        id: item.id,
        title: item.title,
        originalTitle: item.original_title,
        poster: item.poster_path,
        rating: item.vote_average,
        originalLanguage: item.original_language,
        type: item.media_type,
    }));

    return { trendingMovies, isLoading, error };
}

export default useTrendingMovies;