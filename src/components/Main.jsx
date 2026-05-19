import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import Loader from "./Loader";
import MovieRow from "./MovieRow";


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
        <section className="container py-3">
            <h1 className="text-white mb-4">
                {query ? "Risultati ricerca" : "Home"}
            </h1>

            {query ? (
                <MovieRow title="Risultati ricerca" movies={searchMovies} />
            ) : (
                <>
                    <MovieRow title="Popolari" movies={popularMovies} />
                </>
            )}
        </section>
    );
}

export default Main;