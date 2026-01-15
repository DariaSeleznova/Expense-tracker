const Currency = {
    current: "PLN",

    symbols: {
        PLN: "zł",
        EUR: "€",
        USD: "$",
        UAH: "₴"
    },

    set(code) {
        if (!this.symbols[code]) return
        this.current = code
        Storage.save("currency", code)
    },

    init() {
        const saved = Storage.load("currency")
        if (saved && this.symbols[saved]) {
            this.current = saved
        }
    },

    getSymbol() {
        return this.symbols[this.current]
    }
}
