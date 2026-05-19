import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import Loader from "./Loader";
import MovieRow from "./MovieRow";
import styles from "./Main.module.css"


function Main() {
    const { query } = useContext(MovieContext);

    const { searchMovies, isSearchingLoading, searchError } = useSearchMovies(query);
    const { popularMovies, isPopularLoading, popularError } = usePopularMovies();

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
                    <MovieRow title="" movies={searchMovies} />
                ) : (
                    <>
                        <MovieRow title="Film Popolari" movies={popularMovies} />
                    </>
                )}
            </div>
        </section>
    );
}

export default Main;