const languageToCountry = {
    en: "gb",
    it: "it",
    fr: "fr",
    es: "es",
    de: "de",
    ja: "jp",
    ko: "kr",
};

function langToCountry(language) {
    return languageToCountry[language.toLowerCase()] || null;
}

export default langToCountry;