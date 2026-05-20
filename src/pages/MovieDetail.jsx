import { useParams } from "react-router";
import Loader from "../components/Loader";
import useMovieDetail from "../hooks/useMovieDetail";
import { getTmdbImage } from "../utils/tmdbUtils";
import styles from "./MovieDetail.module.css";

function MovieDetail() {
    const { id } = useParams();
    const { movie, cast, loading, error } = useMovieDetail(id);

    if (loading) return <Loader />;
    if (error) return <p className="text-danger container py-4">Errore nel caricamento</p>;
    if (!movie) return null;

    return (
        <div className={`container ${styles.page}`}>

            <div className={styles.header}>
                <img
                    src={getTmdbImage(movie.poster_path, "w500")}
                    alt={movie.title}
                    className={styles.poster}
                />

                <div className={styles.info}>
                    <h1>{movie.title}</h1>

                    <p>{movie.overview}</p>

                    <p><strong>Data:</strong> {movie.release_date}</p>
                    <p><strong>Lingua:</strong> {movie.original_language}</p>
                    <p><strong>Voto:</strong> {movie.vote_average}</p>
                </div>
            </div>

            <div className={styles.cast}>
                <h3>Cast</h3>

                <div className="container">
                    <div className={` row ${styles.castList}`}>
                        {cast?.filter(actor => actor.order <= 5)
                            .map(actor => (
                                <div key={actor.id} className={`${styles.actor} col-8 col-md-4 col-lg-2 `}>
                                    <img
                                        src={
                                            actor.profile_path
                                                ? getTmdbImage(actor.profile_path, "w185")
                                                : "/placeholder.svg"
                                        }
                                        alt={actor.name}
                                    />
                                    <p>{actor.name}</p>
                                </div>
                            ))}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default MovieDetail;