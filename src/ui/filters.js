const Filters = {
    mode: "week", // week | month

    week() {
        const now = new Date()
        const start = new Date(now)
        start.setDate(now.getDate() - now.getDay() + 1) // понедельник
        start.setHours(0, 0, 0, 0)

        const end = new Date(start)
        end.setDate(start.getDate() + 6) // воскресенье
        end.setHours(23, 59, 59, 999)

        return { start, end }
    },

    byMonth(year, month) {
        const start = new Date(year, month, 1)
        const end = new Date(year, month + 1, 0, 23, 59, 59, 999)
        return { start, end }
    },

    apply(expenses, { start, end }) {
        return expenses.filter(e => {
            if (start && e.date < start) return false
            if (end && e.date > end) return false
            return true
        })
    }
}
