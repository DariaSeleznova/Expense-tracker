// Управляет всеми расходами:

// хранит массив расходов

// добавляет

// удаляет

// считает итоги

// фильтрует

// 👉 Это бизнес-логика, и она отдельно от UI — это большой плюс.

class ExpenseManager {
    constructor() {
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
        console.log(expense)
        return expense
    }
    removeExpense(id) {
        const initialLength = this.expenses.length

        this.expenses = this.expenses.filter(expense => expense.id !== id)

        if (this.expenses.length === initialLength) {
            return false
        }

        this.save()
        return true
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

}