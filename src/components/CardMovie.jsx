import langToCountry from "../utils/languageMap";
import styles from "./CardMovie.module.css";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

function getScaleClass(styles) {
    if (window.matchMedia("(min-width: 992px)").matches) return styles.scaleDesktop;
    if (window.matchMedia("(min-width: 768px)").matches) return styles.scaleTablet;
    return styles.scaleMobile;
}

function CardMovie({ movie, variant = "full", isOpen, onOpen }) {

    const isHome = variant === "home"
    const isSearch = variant === "search"
    const navigate = useNavigate();

    const [scaleClass, setScaleClass] = useState(() => getScaleClass(styles));

    useEffect(() => {
        const tabletQuery = window.matchMedia("(min-width: 768px)");
        const desktopQuery = window.matchMedia("(min-width: 992px)");
        const handleChange = () => setScaleClass(getScaleClass(styles));

        tabletQuery.addEventListener("change", handleChange);
        desktopQuery.addEventListener("change", handleChange);

        return () => {
            tabletQuery.removeEventListener("change", handleChange);
            desktopQuery.removeEventListener("change", handleChange);
        };
    }, []);

    function handleClick() {
        if (variant === "search") {
            onOpen();
        } else {
            navigate(`/movie/${movie.id}`);
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
        <div className={`card position-relative h-100  ${styles.card} ${isOpen ? `${styles.open} ${scaleClass}` : ""}`} onClick={handleClick} >
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
                    <button
                        className="btn btn-danger btn-sm mt-3"
                        onClick={event => {
                            event.stopPropagation();
                            navigate(`/movie/${movie.id}`);
                        }}
                    >
                        Vai al dettaglio
                    </button>

                </div>
            )
            }
        </div >
    )
}
export default CardMovie