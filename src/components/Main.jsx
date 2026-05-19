import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import useSearchMovies from "../hooks/useSearchMovies";
import CardMovie from "./CardMovie";
import Loader from "./Loader";
import usePopularMovies from "../hooks/usePopularMovies";


function Main() {
    const { query } = useContext(MovieContext);

    const { searchMovies, isSearchingLoading, searchError } = useSearchMovies(query);
    const { popularMovies, isPopularLoading, popularError } = usePopularMovies();

    const moviesToShow = query ? searchMovies : popularMovies;

    console.log(popularMovies);


    if (searchError || popularError) {
        return <p>Si è verificato un errore!</p>;
    }

    return (
        <section>
            <h1>
                {query ? "Film trovati" : "Film popolari"}
            </h1>
            <div className="container d-flex overflow-x-auto gap-3 py-3">
                {isSearchingLoading || isPopularLoading ? (
                    <Loader />
                ) : (
                    moviesToShow?.map(item => (
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