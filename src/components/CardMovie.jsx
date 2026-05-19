import langToCountry from "../utils/languageMap";
import styles from "./CardMovie.module.css";

function CardMovie({ movie }) {

    const country = langToCountry(movie.originalLanguage);

    return (
        <div className="card h-100 position-relative">
            <h4>{movie.title}</h4>
            <span className={`badge position-absolute top-0 end-0 ${movie.type === 'movie' ? 'bg-success' : 'bg-danger'}`}>{movie.type}</span>
            <img
                src={
                    movie.poster
                        ? `https://image.tmdb.org/t/p/w342${movie.poster}`
                        : '/placeholder.svg'
                }
                alt={movie.title}
            />
            <h2>{movie.originalTitle}</h2>
            {
                country ? (<img
                    src={`https://flagcdn.com/${country}.svg`}
                    alt={movie.originalLanguage}
                    className={styles.countryFlag}
                />) : (
                    <span>🌐{movie.originalLanguage}</span>
                )
            }
            <span>{movie.rating}</span>
        </div >
    )
}
export default CardMovie