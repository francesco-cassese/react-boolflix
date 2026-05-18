import useFetch from "../hooks/useFetch";
import useSearchMovies from "../hooks/useSearchMovies";
import CardMovie from "./CardMovie";
import Loader from "./Loader";

const URL_MOVIES = 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=ritorno+al+futuro'

function Main() {

    const { movies, error, isLoading } = useSearchMovies()

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