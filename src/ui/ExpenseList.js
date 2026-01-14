// ExpenseList.js

// отображает список расходов

// обновляет DOM

// кнопка “удалить”

class ExpenseList {
    constructor(manager) {
        this.manager = manager
        this.listElement = document.querySelector("#expense-list")
    }
    renderItem(expense) {
        const li = document.createElement("li")
        li.dataset.id = expense.id

        li.innerHTML = `<div class="expense">
    <span>${expense.category}</span>
    <span>${expense.amount.toFixed(2)} </span>
    <button class="delete-btn">✖</button><br/>
     <p>(${expense.comments}) ${expense.getFormattedDate()}</p>
   </div>
  `

        return li
    }
    render(expenses) {
        this.listElement.innerHTML = ""

        expenses.forEach(expense => {
            const item = this.renderItem(expense)
            this.listElement.appendChild(item)
        })
    }
    initEvents() {
        this.listElement.addEventListener("click", (event) => {
            if (!event.target.classList.contains("delete-btn")) return

            const li = event.target.closest("li")
            const id = li.dataset.id

            const removed = this.manager.removeExpense(id)

            if (removed) {
                this.render(this.manager.expenses)
            }
        })
    }

}

