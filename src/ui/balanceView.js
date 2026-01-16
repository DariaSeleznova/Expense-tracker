class BalanceView {
    constructor(balanceManager, expenseManager) {
        this.balanceManager = balanceManager
        this.expenseManager = expenseManager

        this.amountEl = document.querySelector("#balance-amount")

        this.openBtn = document.querySelector("#show-topup-btn")
        this.modal = document.querySelector("#balance-modal-overlay")
        this.closeBtn = this.modal.querySelector(".modal-close")

        this.input = document.querySelector("#balance-input")
        this.submitBtn = document.querySelector("#balance-submit")
    }

    initEvents() {
        this.openBtn.addEventListener("click", () => this.open())
        this.closeBtn.addEventListener("click", () => this.close())

        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) this.close()
        })

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.close()
        })

        this.submitBtn.addEventListener("click", () => this.handleSubmit())
        this.submitBtn.addEventListener("click", () => {
            console.log("TOPUP CLICKED")
        })

    }

    open() {
        this.modal.classList.remove("hidden")
        this.input.focus()
    }

    close() {
        this.modal.classList.add("hidden")
        this.input.value = ""
    }

    handleSubmit() {
        const value = Number(this.input.value)
        if (!value || value <= 0) return

        this.balanceManager.addTopUp(value)
        this.render()
        this.close()
    }

    render() {
        const balance = getCurrentBalance(
            this.balanceManager,
            this.expenseManager.expenses
        )
        this.amountEl.textContent = balance.toFixed(2)
    }
}
console.log("BALANCE VIEW INIT")
console.log("input:", this.input)
console.log("button:", this.submitBtn)

