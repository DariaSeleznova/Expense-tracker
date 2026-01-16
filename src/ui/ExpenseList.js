class ExpenseList {
    constructor(manager, onEditExpense) {
        this.manager = manager
        this.listElement = document.querySelector("#expense-list")
        this.onEditExpense = onEditExpense
    }

    renderItem(expense) {
        const div = document.createElement("div")
        div.className = "transaction-card"
        div.dataset.id = expense.id

        div.innerHTML = `
        <div class="transaction-main">
            <div class="transaction-info">
                <div class="expense-category">
                   <span class="category-dot"  style="background: ${CategoryColors.get(expense.category)}"></span>
                   <span>${Language.t(expense.category)}</span>
                </div>

                <div class="transaction-date">${expense.getFormattedDate()}</div>
            </div>

            <div class="transaction-actions">
                <span class="transaction-amount">
                    ${expense.amount.toFixed(2)} ${Currency.getSymbol()}
                </span>
                <button class="edit-btn">✎</button>
                <button class="delete-btn">✕</button>
            </div>
        </div>

        ${expense.comments ? `
            <div class="transaction-comment">
                ${expense.comments}
            </div>
        ` : ""}
    `

        return div
    }


    initEvents() {
        this.listElement.addEventListener("click", (e) => {
            const card = e.target.closest(".transaction-card")
            if (!card) return

            const id = card.dataset.id
            const expense = this.manager.expenses.find(e => e.id === id)

            if (e.target.classList.contains("delete-btn")) {
                this.manager.removeExpense(id)
            }

            if (e.target.classList.contains("edit-btn")) {
                this.onEditExpense(expense)
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


