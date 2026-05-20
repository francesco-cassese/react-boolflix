import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import useMovies from "../hooks/useMovies";
import Loader from "./Loader";
import MovieRow from "./MovieRow";
import styles from "./Main.module.css"
import CardMovie from "./CardMovie";
import { useState } from "react";


function Main() {
    const { query } = useContext(MovieContext);
    const [openId, setOpenId] = useState(null);

    const { searchMovies, isSearchingLoading, searchError } = useSearchMovies(query);
    const { popularMovies, popularTv, trendingMovies, newMovies, loading, error } = useMovies()

    const isError = searchError || error;
    const isLoading = isSearchingLoading || loading;

    function handleToggleMovie(id) {
        setOpenId(prevId => (prevId === id ? null : id));
    }

    if (isError) {
        return <p className="text-danger container py-3">Errore!</p>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className={`py-3 ${styles.containerMovies}`}>
            <div className="container">
                <h1 className={`text-white mb-4 ${styles.pricipalTitle}`}>
                    {query ? "Risultati ricerca" : "Home"}
                </h1>
                {query && searchMovies.length === 0 && (
                    <p className="text-white">
                        OPS... <span className="fw-bold fs-5">{query}</span> non corrisponde a nessun titolo presente nei nostri server
                    </p>
                )}
                {query ? (
                    <div className="row">
                        {searchMovies?.map(movie => (
                            <div
                                key={movie.id}
                                className="col-6 col-md-4 col-lg-3 col-xl-2 mt-5"
                            >
                                <CardMovie
                                    movie={movie}
                                    variant="search"
                                    onOpen={() => handleToggleMovie(movie.id)}
                                    isOpen={openId === movie.id}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <MovieRow
                            title="Trending Now"
                            movies={trendingMovies}
                            variant="home" />

                        <MovieRow
                            title="Popolar Movies"
                            movies={popularMovies}
                            variant="home" />

                        <MovieRow
                            title="Popolar Tv Series"
                            movies={popularTv}
                            variant="home" />

                        <MovieRow
                            title="New Releases"
                            movies={newMovies}
                            variant="home" />
                    </>
                )}
            </div>
        </section >
    );
}

export default Main;