import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import usePopularTv from "../hooks/usePopularTv";
import Loader from "./Loader";
import MovieRow from "./MovieRow";
import styles from "./Main.module.css"
import CardMovie from "./CardMovie";
import useNewMovies from "../hooks/useNewMovies";


function Main() {
    const { query } = useContext(MovieContext);

    const { searchMovies, isSearchingLoading, searchError } = useSearchMovies(query);
    const { popularMovies, isPopularLoading, popularError } = usePopularMovies();
    const { trendingMovies, isTrendingLoading, trendingError } = useTrendingMovies();
    const { newMovies, isNewLoading, newError } = useNewMovies();
    const { popularTv, isPopularTvLoading, popularTvError } = usePopularTv()

    const isLoading = isSearchingLoading || isPopularLoading || isTrendingLoading;
    const isError = searchError || popularError || trendingError;

    if (isError) {
        return <p className="text-danger container py-3">Errore!</p>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className={`py-3 ${styles.containerMovies}`}>
            <div className="container">
                <h1 className="text-white mb-4">
                    {query ? "Risultati ricerca" : "Home"}
                </h1>

                {query ? (
                    <div className="row g-3">
                        {searchMovies?.map(movie => (
                            <div
                                key={movie.id}
                                className="col-6 col-md-4 col-lg-3 col-xl-2"
                            >
                                <CardMovie
                                    movie={movie}
                                    variant="search"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <MovieRow
                            title="Trending Now"
                            movies={trendingMovies}
                            variant="compact" />

                        <MovieRow
                            title="Popolar Movies"
                            movies={popularMovies}
                            variant="compact" />

                        <MovieRow
                            title="Popolar Tv Series"
                            movies={popularTv}
                            variant="compact" />

                        <MovieRow
                            title="New Releases"
                            movies={newMovies}
                            variant="compact" />



                    </>
                )}
            </div>
        </section>
    );
}

export default Main;