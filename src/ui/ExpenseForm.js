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
            const category = formData.get("category")
            const amount = Number(formData.get("amount"))
            const comments = formData.get("comments")
            const date = this.datePicker.selectedDates[0] || new Date()

            const editId = this.form.dataset.editId
            if (editId) {
                this.manager.updateExpense(editId, { category, amount, comments, date })
                delete this.form.dataset.editId
            } else {
                this.manager.addExpense({ category, amount, comments, date })
            }

            this.listUI.render(this.manager.expenses)
            renderTotal(this.manager.expenses)
            renderCategoryPercent(this.manager.expenses)
            this.form.reset()
            this.container.classList.add("hidden")
        })

    }
    openForEdit(expense) {
        this.form.dataset.editId = expense.id
        this.form.querySelector('select[name="category"]').value = expense.category
        this.form.querySelector('input[name="amount"]').value = expense.amount
        this.form.querySelector('input[name="comments"]').value = expense.comments
        this.datePicker.setDate(expense.date, true)
        this.container.classList.remove("hidden")
    }

}
