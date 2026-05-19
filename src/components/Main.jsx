import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import Loader from "./Loader";
import MovieRow from "./MovieRow";
import styles from "./Main.module.css"
import CardMovie from "./CardMovie";


function Main() {
    const { query } = useContext(MovieContext);

    const { searchMovies, isSearchingLoading, searchError } = useSearchMovies(query);
    const { popularMovies, isPopularLoading, popularError } = usePopularMovies();
    const { trendingMovies, isTrendingLoading, trendingError } = useTrendingMovies();

    const isLoading = isSearchingLoading || isPopularLoading;
    const isError = searchError || popularError;

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
                                    variant="full"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <MovieRow
                            title="Film Popolari"
                            movies={popularMovies}
                            variant="compact" />
                    </>
                )}
            </div>
        </section>
    );
}

export default Main;