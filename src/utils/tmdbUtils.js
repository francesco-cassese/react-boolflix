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
        type: mediaType
    };
};

const getPopularMovies = () => {
    return fetchTmdb('/movie/popular')
        .then(data => {
            const results = data.results ?? [];
            return results.map(item => mapMediaItem(item, "movie"));
        });
};

const getPopularTv = () => {
    return fetchTmdb('/tv/popular')
        .then(data => {
            const results = data.results ?? [];
            return results.map(item => mapMediaItem(item, "tv"));
        });
};


const getTrendingMovies = () => {
    return fetchTmdb('/trending/all/week')
        .then(data => {
            const results = data.results ?? [];
            return results.map(item => mapMediaItem(item, item.media_type))
        })
}

const getNewMovies = () => {
    return fetchTmdb('/movie/now_playing')
        .then(data => {
            const results = data.results ?? [];
            return results.map(item => mapMediaItem(item, 'movie'))
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

export { searchMoviesAndTv, getPopularMovies, getTrendingMovies, getNewMovies, getPopularTv };