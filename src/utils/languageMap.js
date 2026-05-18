const languageToCountry = {
    en: "gb",
    it: "it",
    fr: "fr",
    es: "es",
    de: "de",
    ja: "jp",
    ko: "kr",
    ru: "ru",
    th: "th",
    tl: "tl"
};

function langToCountry(language) {
    if (!language) return null;

    const code = language.toLowerCase();

    return languageToCountry[code] || null;
}

export default langToCountry;