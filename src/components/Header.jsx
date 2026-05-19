import SearchBar from "./SearchBar";
import styles from "./Header.module.css";

function Header() {

    return (
        <header className="d-flex align-items-center">
            <img src="/boolflix.png" alt="logo" className={styles.headerLogo} />
            <SearchBar />
        </header>
    );
}

export default Header;
