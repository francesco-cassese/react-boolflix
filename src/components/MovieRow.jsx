import CardMovie from "./CardMovie";

function MovieRow({ title, movies }) {
    return (
        <section className="mb-4">
            <h2 className="text-white mb-2">{title}</h2>

            <div className="d-flex overflow-x-auto gap-2 pb-2">

                {movies?.map(movie => (
                    <div key={movie.id}>
                        <CardMovie movie={movie} />
                    </div>
                ))}

            </div>
        </section>
    );
}

export default MovieRow;