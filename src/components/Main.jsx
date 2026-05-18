import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import CardMovie from "./CardMovie";
import Loader from "./Loader";

function Main() {
    const { query } = useContext(MovieContext);

    const { movies, error, isLoading } = useSearchMovies(query);

    if (error) {
        return <p>Si è verificato un errore!</p>;
    }

    return (
        <section>
            <h1>
                {query ? "I film trovati" : "Film popolari del momento"}
            </h1>

            <div className="container d-flex overflow-x-auto gap-3 py-3">
                {isLoading ? (
                    <Loader />
                ) : (
                    movies.map(movie => (
                        <article key={movie.id}>
                            <CardMovie movie={movie} />
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

export default Main;