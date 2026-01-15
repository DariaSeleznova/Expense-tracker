class ExpenseManager {
    constructor() {
        this.balanceManager = balanceManager
        this.expenses = []
        const data = Storage.load("expenses")
        this.expenses = data.map(item =>
            new Expense(
                item.category,
                item.amount,
                item.comments,
                new Date(item.date)
            )
        )
    }
    addExpense({ category, amount, comments = "", date = new Date() }) {
        if (!category || amount <= 0) {
            return null
        }

        const expense = new Expense(category, amount, comments, date)
        this.expenses.push(expense)

        this.save()
        renderBalance(balanceManager, manager.expenses)
        return expense
    }
    removeExpense(id) {
        const initialLength = this.expenses.length

        this.expenses = this.expenses.filter(expense => expense.id !== id)

        if (this.expenses.length === initialLength) {
            return false
        }

        this.save()
        renderBalance(balanceManager, manager.expenses)
        return true
    }
    getTotalAllTime() {
        return this.expenses.reduce((total, expense) => {
            return total + expense.amount
        }, 0)
    }

    save() {
        Storage.save("expenses", this.expenses)
    }
    getExpensesByMonth(year, month) {
        return this.expenses.filter(e =>
            e.date.getFullYear() === year &&
            e.date.getMonth() === month
        )
    }

    updateExpense(id, { category, amount, comments, date }) {
        const expense = this.expenses.find(e => e.id === id)
        if (!expense) return null

        expense.category = category
        expense.amount = amount
        expense.comments = comments
        expense.date = date

        this.save()
        renderBalance(balanceManager, manager.expenses)
        return expense
    }

}