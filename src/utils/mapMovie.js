function mapMovie(movie) {
    return {
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        poster: movie.poster_path,
        rating: movie.vote_average,
        originalLanguage: movie.original_language,
    };
}

export default mapMovie;