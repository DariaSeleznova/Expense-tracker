const Theme = {
    current: "light",

    init() {
        const saved = localStorage.getItem("theme");
        if (saved) this.set(saved);
    },

    set(theme) {
        document.body.classList.remove(
            "theme-light",
            "theme-dark",
            "theme-rainbow"
        );

        document.body.classList.add(`theme-${theme}`);
        this.current = theme;
        localStorage.setItem("theme", theme);
    }
};
