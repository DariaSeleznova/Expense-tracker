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


        this.datePicker = flatpickr("#date-input", {
            dateFormat: "d.m.Y",
            defaultDate: null,
            allowInput: true
        })
    }

    initEvents() {

        this.showBtn.addEventListener("click", () => {
            this.container.classList.toggle("hidden")
        })


        this.form.addEventListener("submit", (event) => {
            event.preventDefault()

            const formData = new FormData(this.form)

            const expense = this.manager.addExpense({
                category: formData.get("category"),
                amount: Number(formData.get("amount")),
                comments: formData.get("comments"),
                date:
                    this.datePicker.selectedDates.length > 0
                        ? this.datePicker.selectedDates[0]
                        : new Date()
            })

            if (expense) {
                applyFiltersAndSort()
                this.form.reset()
                this.container.classList.add("hidden")
            }

        })
    }
}
