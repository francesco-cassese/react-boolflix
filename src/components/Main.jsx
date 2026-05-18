import usePopularMovies from "../hooks/usePopularMovies"
import CardMovie from "./CardMovie";
import Loader from "./Loader";

function Main() {

    const { movies, error, isLoading } = usePopularMovies();
    console.log(movies);

    if (error) return <p>Si è verificato un errore!</p>;
    return (
        <section>
            <h1>I film del momento</h1>
            <div className="container d-flex overflow-x-auto gap-3 py-3">
                {isLoading ? (<Loader />) : (movies.map(movie => {
                    return <article key={movie.id}><CardMovie movie={movie} /></article>
                }))}
            </div>
        </section>
    )
}
export default Main