class BalanceView {
    constructor(balanceManager, expenseManager) {
        this.balanceManager = balanceManager
        this.expenseManager = expenseManager

        this.amountEl = document.querySelector("#balance-amount")
        this.showBtn = document.querySelector("#show-topup-btn")
        this.panel = document.querySelector("#topup-panel")
        this.input = document.querySelector("#topup-input")
        this.addBtn = document.querySelector("#topup-btn")
    }

    initEvents() {
        this.showBtn.addEventListener("click", () => {
            this.panel.classList.toggle("hidden")
            this.input.focus()
        })

        this.addBtn.addEventListener("click", () => {
            const value = Number(this.input.value)
            if (!value || value <= 0) return

            this.balanceManager.addTopUp(value)
            this.render()

            this.input.value = ""
            this.panel.classList.add("hidden")
        })
    }

    render() {
        const balance = getCurrentBalance(
            this.balanceManager,
            this.expenseManager.expenses
        )

        this.amountEl.textContent = balance.toFixed(2)
    }
}
