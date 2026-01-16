// Описывает один расход.

// Пример логики (не код, а идея):

// сумма

// категория

// описание

// дата

// id

// 👉 НЕ работает с DOM

class Expense {
    constructor(category, amount, comments, date) {
        this.category = category
        this.amount = Math.round(Number(amount) * 100) / 100
        this.comments = comments
        this.date = date instanceof Date ? date : new Date(date)
        this.id = crypto.randomUUID()
    }

    getFormattedDate() {
        const d = this.date
        return `${String(d.getDate()).padStart(2, "0")}.${String(
            d.getMonth() + 1
        ).padStart(2, "0")}.${d.getFullYear()}`
    }



}