import useFetchMedia from "./useFetchMedia";

function useMovies() {

    const popularMovies = useFetchMedia('/movie/popular', 'movie');
    const popularTv = useFetchMedia('/tv/popular', 'tv');
    const trending = useFetchMedia('/trending/all/week');
    const newMovies = useFetchMedia('/movie/now_playing', 'movie');

    const loading =
        popularMovies.loading ||
        popularTv.loading ||
        trending.loading ||
        newMovies.loading;

    const error =
        popularMovies.error ||
        popularTv.error ||
        trending.error ||
        newMovies.error;

    return {
        popularMovies: popularMovies.data,
        popularTv: popularTv.data,
        trendingMovies: trending.data,
        newMovies: newMovies.data,

        loading,
        error
    };
}

export default useMovies;