import { useState, createContext } from "react";

const MovieContext = createContext(null);

function MovieProvider({ children }) {
    const [query, setQuery] = useState("");

    const value = {
        query,
        setQuery
    }

    return (
        <MovieContext value={value}>
            {children}
        </MovieContext>
    );
};

export { MovieContext, MovieProvider };