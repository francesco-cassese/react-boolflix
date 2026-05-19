import langToCountry from "../utils/languageMap";
import styles from "./CardMovie.module.css";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useState } from "react";

function CardMovie({ movie, variant = "full" }) {

    const [open, setOpen] = useState(false);

    const isHome = variant === "home"
    const isSearch = variant === "search"

    function handleClick() {
        if (isSearch) {
            setOpen(!open);
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
        <div className={`card position-relative h-100 mt-5  ${styles.card} ${open ? styles.open : ""}`} onClick={handleClick} >
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
            {isSearch && open && (
                <div className={styles.info}>

                    <p>
                        <strong>Titolo:</strong> {movie.title}
                    </p>

                    <p>
                        <strong>Titolo originale:</strong> {movie.originalTitle}
                    </p>

                    <p>
                        <strong>Trama</strong> {movie.overview}
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