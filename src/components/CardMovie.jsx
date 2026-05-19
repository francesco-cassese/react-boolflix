import langToCountry from "../utils/languageMap";
import styles from "./CardMovie.module.css";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function CardMovie({ movie, variant = "full", isOpen, onOpen }) {

    const isHome = variant === "home"
    const isSearch = variant === "search"

    function handleClick() {
        if (variant === "search") {
            onOpen();
        }
    }

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
        <div className={`card position-relative h-100  ${styles.card} ${isOpen ? styles.open : ""}`} onClick={handleClick} >
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
            <div className="position-absolute start-5 bottom-0">
                {
                    country ? (<img
                        src={`https://flagcdn.com/${country}.svg`}
                        alt={movie.originalLanguage}
                        className={styles.countryFlag}
                    />) : (
                        <span>🌐{movie.originalLanguage}</span>
                    )}
            </div>
            {isSearch && (
                <div className={styles.back}>
                    <h6 className={styles.cardTitle}>{movie.originalTitle}</h6>
                </div>
            )}
            {isSearch && isOpen && (
                <div className={styles.info}>

                    <p className={styles.row}>
                        <span className={styles.label}>Titolo:</span>
                        <span className={styles.value}>{movie.title}</span>
                    </p>

                    <p className={styles.row}>
                        <span className={styles.label}>Titolo originale:</span>
                        <span className={styles.value}>{movie.originalTitle}
                        </span>
                    </p>

                    <p className={styles.row}>
                        <span className={styles.label}>Trama</span>
                        <span className={styles.value}>{movie.overview}
                        </span>
                    </p>

                    <div className="d-flex gap-1 text-warning">
                        {stars(movie.rating ?? 0).map((type, i) => {
                            if (type === "full") return <BsStarFill key={i} color="gold" />;
                            if (type === "half") return <BsStarHalf key={i} color="gold" />;
                            return <BsStar key={i} color="gold" />;
                        })}
                    </div>

                    <div className={styles.languageInfo}>
                        <strong>Lingua:</strong>

                        {country ? (
                            <img
                                src={`https://flagcdn.com/${country}.svg`}
                                alt={movie.originalLanguage}
                                className={styles.countryFlag}
                            />
                        ) : (
                            <span>🌐 {movie.originalLanguage}</span>
                        )}
                    </div>

                </div>
            )}
        </div>
    )
}
export default CardMovie