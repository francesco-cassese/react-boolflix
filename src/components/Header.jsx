import SearchBar from "./SearchBar";
import styles from "./Header.module.css";

function Header() {

    return (
        <header className={`d-flex justify-content-between align-items-center ${styles.containerHeader} `}>
            <img src="/boolflix.png" alt="logo" className={styles.headerLogo} />
            <SearchBar />
        </header>
    );
}

export default Header;
