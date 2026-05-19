import langToCountry from "../utils/languageMap";
import styles from "./CardMovie.module.css";

function CardMovie({ movie: item }) {

    const country = langToCountry(item.originalLanguage);

    return (
        <div className="card h-100">
            <h1>{item.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w342${item.poster}`}
                alt={item.title}
            />
            <h2>{item.originalTitle}</h2>
            {country ? (<img
                src={`https://flagcdn.com/${country}.svg`}
                alt={item.originalLanguage}
                className={styles.countryFlag}
            />) : (
                <span>🌐{item.originalLanguage}</span>
            )
            }
            <span>{item.rating}</span>
        </div >
    )
}
export default CardMovie