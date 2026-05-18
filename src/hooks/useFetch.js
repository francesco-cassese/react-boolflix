import { useState, useEffect } from "react"



function useFetch(url) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Stato: ${response.status}`)
                }
                return response.json()
            })
            .then(json => {
                console.log('Dati ricevuti con successo', json);
                setData(json);
            })
            .catch(error => {
                setError(error.message || "Si è verificato un errore imprevisto.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url])

    return { data, isLoading, error };
}

export default useFetch