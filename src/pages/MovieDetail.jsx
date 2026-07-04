import { useParams } from "react-router";
import Loader from "../components/Loader";
import useMovieDetail from "../hooks/useMovieDetail";
import { getTmdbImage } from "../utils/tmdbUtils";
import styles from "./MovieDetail.module.css";
import { useNavigate } from "react-router";

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movie, cast, loading, error } = useMovieDetail(id);

    if (loading) return <Loader />;
    if (error) return <p className="text-danger container py-4">Errore nel caricamento</p>;
    if (!movie) return null;

    return (
        <div className={`container ${styles.page}`}>

            <button
                className="btn btn-secondary my-3"
                onClick={() => navigate(-1)}
            >
                Torna indietro
            </button>


            <div className={`d-flex flex-column flex-lg-row align-items-center align-items-lg-start gap-4 ${styles.header}`}>
                <img
                    src={getTmdbImage(movie.poster_path, "w500")}
                    alt={movie.title}
                    className={`img-fluid ${styles.poster}`}
                />

                <div className={`w-100 ${styles.info}`}>
                    <h1>{movie.title}</h1>

                    <p>{movie.overview}</p>

                    <p><strong>Data:</strong> {movie.release_date}</p>
                    <p><strong>Lingua:</strong> {movie.original_language}</p>
                    <p><strong>Voto:</strong> {movie.vote_average ? Math.round(movie.vote_average) : "N/D"}</p>
                </div>
            </div>

            <div className={styles.cast}>
                <h3>Cast</h3>

                <div className="container">
                    <div className={styles.castList}>
                        {cast?.filter(actor => actor.order <= 5)
                            .map(actor => (
                                <div key={actor.id} className={styles.actor}>
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