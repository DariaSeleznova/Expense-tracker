// Описывает один расход.

// Пример логики (не код, а идея):

// сумма

// категория

// описание

// дата

// id

// 👉 НЕ работает с DOM

class Expense {
    constructor(category, amount, comments = "", date = new Date()) {
        this.category = category
        this.comments = comments
        this.amount = Number(amount)
        this.date = date instanceof Date ? date : new Date(date)
        this.id = crypto.randomUUID()
    }
    getFormattedDate() {
        const day = this.date.getDate().toString().padStart(2, "0")
        const month = (this.date.getMonth() + 1).toString().padStart(2, "0")
        const year = this.date.getFullYear()
        return `${day}.${month}.${year}`
    }


}