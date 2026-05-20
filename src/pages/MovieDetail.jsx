import { useParams } from "react-router";
import Loader from "../components/Loader";
import useMovieDetail from "../hooks/useMovieDetail";
import { getTmdbImage } from "../utils/tmdbUtils";
import styles from "./MovieDetail.module.css";

function MovieDetail() {
    const { id } = useParams();
    const { movie, cast, loading, error } = useMovieDetail(id);

    if (loading) return <Loader />;

    if (error) return <p className="text-danger container py-4">Errore nel caricamento del film</p>;

    if (!movie) return null;
    return (
        <section className={styles.detailPage}>
            <div className={styles.hero}>
                <img src={getTmdbImage(movie.backdrop_path, "original")} alt={movie.title} className={styles.backdrop} />
                <div className={styles.overlay} />
                <div className={`container ${styles.heroContent}`}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <div className={styles.meta}>
                        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span>📅 {movie.release_date}</span>
                        <span>🔥 {Math.round(movie.popularity)}</span>
                    </div>
                </div>
            </div>

            {/*Contenuto*/}
            <div className={`container ${styles.content}`}>
                <div className="row g-4">
                    <div className="col-md-4">
                        <img src={getTmdbImage(movie.poster_path, "w500")} alt={movie.title} className={styles.poster} />
                    </div>
                    <div className="col-md-8">
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Overview</h2>
                            <p className={styles.overview}>{movie.overview}</p>
                        </div>
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Details</h2>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p><strong>Lingua:</strong> {movie.original_language}</p>
                                    <p><strong>Voti:</strong> {movie.vote_count}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p><strong>Popolarità:</strong> {Math.round(movie.popularity)}</p>
                                    <p><strong>Adult:</strong> {movie.adult ? "Si" : "No"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Cast</h2>
                    <div className={styles.castContainer}>
                        {cast.slice(0, 10).map(actor => (
                            <div key={actor.id} className={styles.actorCard}>
                                <img src={actor.profile_path ? getTmdbImage(actor.profile_path, "w185") : "/placeholder.svg"} alt={actor.name} className={styles.actorImage} />
                                <p className={styles.actorName}>{actor.name}</p>
                                <small className={styles.character}>{actor.character}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default MovieDetail;