function Loader() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 vh-100">

            <div className="spinner-border text-danger" role="status">

                <span className="visually-hidden">Caricamento in corso...</span>
            </div>

            <p className="mt-3 text-secondary text-uppercase fw-bold small">
                Caricamento in corso...
            </p>
        </div>
    );
}

export default Loader