import CardMovie from "./CardMovie";
import styles from "./MovieRow.module.css";

function MovieRow({ title = "", movies, variant = "full" }) {

    return (
        <section className="mb-4">
            <h2 className={styles.titleSection}>{title}</h2>

            <div className={`d-flex overflow-x-auto gap-2 pb-2 ${styles.rowP} `}>

                {movies?.map(movie => (
                    <div key={movie.id}>
                        <CardMovie
                            movie={movie}
                            variant={variant}
                        />
                    </div>
                ))}

            </div>
        </section>
    );
}

export default MovieRow;