class ExpenseForm {
    constructor(manager, listUI) {
        this.manager = manager
        this.listUI = listUI
        this.form = document.querySelector("#expense-form")
        this.openBtn = document.querySelector("#show-form-btn")
        this.modal = document.querySelector("#modal-overlay")
        this.closeBtn = document.querySelector(".modal-close")
        this.datePicker = flatpickr("#date-input", {
            dateFormat: "d.m.Y",
            defaultDate: null,
            allowInput: true
        })
    }

    initEvents() {

        this.openBtn.addEventListener("click", () => {
            this.open()
        })

        this.closeBtn.addEventListener("click", () => {
            this.close()
        })

        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) {
                this.close()
            }
        })
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.close()
            }
        })

        this.form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.handleSubmit()
        })

    }
    open() {
        this.modal.classList.remove("hidden")
    }

    close() {
        this.modal.classList.add("hidden")
        this.form.reset()
    }

    handleSubmit() {
        const formData = new FormData(this.form)

        const data = {
            category: formData.get("category"),
            amount: Number(formData.get("amount")),
            comments: formData.get("comments"),
            date: this.datePicker.selectedDates[0] || new Date()
        }

        const editId = this.form.dataset.editId

        if (editId) {
            this.manager.updateExpense(editId, data)
            delete this.form.dataset.editId
        } else {
            this.manager.addExpense(data)
        }

        this.close()
        renderByMode()
    }



    openForEdit(expense) {
        this.form.dataset.editId = expense.id
        this.form.querySelector('select[name="category"]').value = expense.category
        this.form.querySelector('input[name="amount"]').value = expense.amount
        this.form.querySelector('input[name="comments"]').value = expense.comments
        this.datePicker.setDate(expense.date, true)
        this.modal.classList.remove("hidden")

    }

}
