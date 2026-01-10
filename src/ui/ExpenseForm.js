// ExpenseForm.js

// считывает данные из формы

// валидирует

// передаёт данные в ExpenseManager

class ExpenseForm {
    constructor(manager, listUI) {
        this.manager = manager
        this.listUI = listUI
        this.form = document.querySelector("#expense-form")
        this.container = document.querySelector("#form-container")
        this.showBtn = document.querySelector("#show-form-btn")
    }

    initEvents() {
        flatpickr("input[name='date']", {
            dateFormat: "d.m.Y", // dd.mm.yyyy
            defaultDate: "today"
        })

        this.showBtn.addEventListener("click", () => {
            this.container.classList.toggle("hidden")
        })

        this.form.addEventListener("submit", (event) => {
            event.preventDefault()

            const formData = new FormData(this.form)

            const dateString = formData.get("date")
            const [day, month, year] = dateString.split(".")
            const date = new Date(year, month - 1, day)

            const expenseData = {
                category: formData.get("category"),
                amount: Number(formData.get("amount")),
                comments: formData.get("comments"),
                date: formData.get("date")
            }

            const expense = this.manager.addExpense(expenseData)

            if (expense) {
                this.listUI.render(this.manager.expenses)
                this.form.reset()
                this.container.classList.add("hidden")
            }
        })
    }
}
