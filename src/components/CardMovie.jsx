import langToCountry from "../utils/languageMap";
import styles from "./CardMovie.module.css";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function CardMovie({ movie, variant = "full" }) {

    const isCompact = variant === "compact";
    const country = langToCountry(movie.originalLanguage);

    function stars(vote = 0) {
        const rating = vote / 2;
        const result = [];

        for (let i = 0; i < 5; i++) {
            if (rating >= i + 1) result.push("full");
            else if (rating >= i + 0.5) result.push("half");
            else result.push("empty");
        }

        return result;
    }

    return (
        <div className={`card position-relative h-100 ${styles.card}`} >
            <span className={`badge position-absolute top-0 end-0 ${movie.type === 'movie' ? 'bg-success' : 'bg-danger'}`}>{movie.type}</span>
            <img
                src={
                    movie.poster
                        ? `https://image.tmdb.org/t/p/w342${movie.poster}`
                        : '/placeholder.svg'
                }
                alt={movie.title}
                className={styles.cardImg}
            />
            {!isCompact && (
                <div className="card-info">
                    <h2>{movie.originalTitle}</h2>
                    <div className="d-flex flex-column">
                        {
                            country ? (<img
                                src={`https://flagcdn.com/${country}.svg`}
                                alt={movie.originalLanguage}
                                className={styles.countryFlag}
                            />) : (
                                <span>🌐{movie.originalLanguage}</span>
                            )
                        }
                        <div className="d-flex gap-1 fs-4 text-warning mt-2 flex-shrink-0">
                            <div className="d-flex gap-1 fs-4 mt-2">
                                {stars(movie.rating ?? 0).map((type, i) => {
                                    if (type === "full") return <BsStarFill key={i} color="gold" />;
                                    if (type === "half") return <BsStarHalf key={i} color="gold" />;
                                    return <BsStar key={i} color="gold" />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}
export default CardMovie