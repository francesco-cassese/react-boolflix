import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import CardMovie from "./CardMovie";
import Loader from "./Loader";
import useFetch from "../hooks/useFetch";
import useTrendingMovies from "../hooks/useTrendingMovies";

const URL_TRENDING_MOVIE = 'https://api.themoviedb.org/3/trending/movie/week'

function Main() {
    const { query } = useContext(MovieContext);

    const { movies, isLoading, error } = useSearchMovies(query);
    const { trendingMovies } = useTrendingMovies();

    const moviesToShow = query ? movies : trendingMovies;

    if (error) {
        return <p>Si è verificato un errore!</p>;
    }

    return (
        <section>
            <h1>
                {query ? "Film trovati" : "Film di tendenza"}
            </h1>
            <div className="container d-flex overflow-x-auto gap-3 py-3">
                {isLoading ? (
                    <Loader />
                ) : (
                    moviesToShow.map(item => (
                        <article key={item.id}>
                            <CardMovie movie={item} />
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

export default Main;