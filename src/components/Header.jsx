import SearchBar from "./SearchBar";
import styles from "./Header.module.css";

function Header() {

    return (
        <header className={`d-flex p-3 ${styles.containerHeader}`}>
            <div className="container">
                <div className='row align-items-center justify-content-between'>
                    <div className="col-12 col-md-6">
                        <img src="/boolflix.png" alt="logo" className={styles.headerLogo} />
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
