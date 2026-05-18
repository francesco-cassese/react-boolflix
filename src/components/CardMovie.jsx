import langToCountry from "../utils/languageMap"

function CardMovie({ movie }) {

    const country = langToCountry(movie.originalLanguage);

    return (
        <div className="card h-100">
            <h1>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster}`}
                alt={movie.title}
            />
            <h2>{movie.originalTitle}</h2>
            {country ? (<img
                src={`https://flagcdn.com/${country}.svg`}
                alt={movie.originalLanguage}
            />) : (
                <span>🌐</span>
            )
            }
            <span>{movie.rating}</span>
        </div >
    )
}
export default CardMovie