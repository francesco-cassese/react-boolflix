const TOKEN_V4 = import.meta.env.VITE_TMDB_API_KEY;
const URL_TMBD = 'https://api.themoviedb.org/3'

const fetchTmdb = (endpoint, params) => {
    const urlParameters = new URLSearchParams({
        adults: false,
        language: 'it-IT',
        ...params
    })

    const fullUrl = `${URL_TMBD}${endpoint}?${urlParameters.toString()}`;

    const fetchOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN_V4}`
        }
    }

    return fetch(fullUrl, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP! Stato della risposta: ${response.status}`);
            }
            return response.json();;
        })
        .catch(error => {
            console.error(`Errore durante la chiamata TMDB all'endpoint [${endpoint}]:`, error);
            throw error;
        });
}

const getTmdbImage = (path, size = 'original') => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

const mapMediaItem = (item, mediaType) => {
    return {
        id: item.id,
        adult: item.adult,
        title: item.title || item.name,
        originalTitle: item.original_title || item.original_name,
        poster: item.poster_path,
        rating: item.vote_average,
        originalLanguage: item.original_language,
        overview: item.overview,
        type: mediaType,
        backdrop: item.backdrop_path,
        releaseDate: item.release_date || item.first_air_date,
        genreIds: item.genre_ids,
        voteCount: item.vote_count,
        popularity: item.popularity
    };
};

const fetchMediaMovies = (endpoint, mediaType) => {
    return fetchTmdb(endpoint)
        .then(data => {
            const results = data.results ?? [];
            return results.map(item => mapMediaItem(item, mediaType ?? item.media_type));
        })
}


const searchMoviesAndTv = query => {
    const moviesPromise = fetchTmdb('/search/movie', { query })
        .then(data => {
            const results = data.results ?? [];

            return results.map(item => mapMediaItem(item, "movie"));
        });

    const tvPromise = fetchTmdb('/search/tv', { query })
        .then(data => {
            const results = data.results ?? [];
            return results.map(item => mapMediaItem(item, "tv"));
        });

    return Promise.all([moviesPromise, tvPromise])
        .then(([moviesMapped, tvMapped]) => {
            return [...moviesMapped, ...tvMapped];
        });
};

export { searchMoviesAndTv, fetchMediaMovies };