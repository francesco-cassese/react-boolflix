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
            {isLoading ? (<Loader />) : (movies.map(movie => {
                return <article key={movie.id}><CardMovie movie={movie} /></article>
            }))}
        </section>
    )
}
export default Main