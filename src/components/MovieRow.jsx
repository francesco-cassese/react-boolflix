import CardMovie from "./CardMovie";
import style from "./MovieRow.module.css";
import { useState } from "react";

function MovieRow({ title = "", movies, variant = "full" }) {

    const [openId, setOpenId] = useState(null);

    return (
        <section className="mb-4">
            <h2 className="text-white mb-2">{title}</h2>

            <div className={`d-flex overflow-x-auto gap-2 pb-2 ${style.rowP} `}>

                {movies?.map(movie => (
                    <div key={movie.id}>
                        <CardMovie
                            movie={movie}
                            variant={variant}
                            isOpen={openId === movie.id}
                            onOpen={() => setOpenId(movie.id)}
                        />
                    </div>
                ))}

            </div>
        </section>
    );
}

export default MovieRow;