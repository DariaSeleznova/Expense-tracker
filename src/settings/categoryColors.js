const CategoryColors = {
    foodstuffs: "#22c55e",
    transport: "#3b82f6",
    cosmetics: "#ec4899",
    subscriptions: "#a855f7",
    loans: "#ef4444",
    entertainment: "#f59e0b",
    gifts: "#14b8a6",
    clothing: "#6366f1",
    renovation: "#64748b",
    other: "#9ca3af",

    get(category) {
        return this[category] || "#9ca3af"
    }
}
