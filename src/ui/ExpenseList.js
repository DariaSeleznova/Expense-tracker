class ExpenseList {
    constructor(manager, onEditExpense) {
        this.manager = manager
        this.listElement = document.querySelector("#expense-list")
        this.onEditExpense = onEditExpense
    }

    renderItem(expense) {
        const li = document.createElement("li")
        li.dataset.id = expense.id

        li.innerHTML = `
        <div class="expense">
            <span>${expense.category}</span>
            <span>${expense.amount.toFixed(2)}</span>
            <button class="edit-btn">✎</button>
            <button class="delete-btn">✖</button><br/>
            <p>(${expense.comments}) ${expense.getFormattedDate()}</p>
        </div>
        `
        return li
    }

    initEvents() {
        this.listElement.addEventListener("click", (event) => {
            const li = event.target.closest("li")
            if (!li) return
            const id = li.dataset.id

            if (event.target.classList.contains("delete-btn")) {
                const removed = this.manager.removeExpense(id)
                if (removed) this.render(this.manager.expenses)
            }

            if (event.target.classList.contains("edit-btn")) {
                const expense = this.manager.expenses.find(e => e.id === id)
                if (expense && this.onEditExpense) {
                    this.onEditExpense(expense)
                }
            }
        })
    }

    render(expenses) {
        this.listElement.innerHTML = ""
        expenses.forEach(expense => {
            this.listElement.appendChild(this.renderItem(expense))
        })
    }
}


