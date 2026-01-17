const CategoryColors = {
    foodstuffs: "#37af63",
    transport: "#4281e7",
    cosmetics: "#e23a8e",
    subscriptions: "#b36af7",
    loans: "#f44040",
    entertainment: "#e6e66a",
    gifts: "#41d5c4",
    clothing: "#6b49bb",
    renovation: "#7d97bc",
    other: "#9ca3af",

    get(category) {
        return this[category] || "#9ca3af"
    }
}
