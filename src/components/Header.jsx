import SearchBar from "./SearchBar";
import styles from "./Header.module.css";
import { useNavigate } from "react-router";

function Header() {

    const navigate = useNavigate();


    return (
        <header className={`d-flex p-3 sticky-top ${styles.containerHeader}`}>
            <div className="container">
                <div className='row align-items-center justify-content-between'>
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                        <img src="/boolflix.png" alt="logo" className={`img-fluid ${styles.headerLogo}`} onClick={event => navigate('/')} />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;
