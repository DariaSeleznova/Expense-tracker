let currentExpenses = []

const balanceManager = new BalanceManager()
const manager = new ExpenseManager(balanceManager)

const expenseList = new ExpenseList(manager, expense => expenseForm.openForEdit(expense))
const expenseForm = new ExpenseForm(manager, expenseList)


expenseList.initEvents()
expenseForm.initEvents()
const totalElement = document.querySelector("#total-amount")
const monthSelect = document.querySelector("#month-select")
const yearSelect = document.querySelector("#year-select")
const categoryFilter = document.querySelector("#category-filter")
const weekBtn = document.querySelector("#weekBtn")
const sortSelect = document.querySelector("#sort-select")
const currencySelect = document.querySelector("#currency-select")
const topUpInput = document.querySelector("#topup-input")
const topUpBtn = document.querySelector("#topup-btn")
const langSelect = document.querySelector("#language-select")

Language.init()
Language.apply()

Currency.init()
currencySelect.value = Currency.current

langSelect.value = Language.current

langSelect.addEventListener("change", () => {
    Language.set(langSelect.value)
})

currencySelect.addEventListener("change", () => {
    Currency.set(currencySelect.value)

    renderExpenses(currentExpenses)
    renderBalance(balanceManager, manager.expenses)
})

topUpBtn.addEventListener("click", () => {
    const amount = Number(topUpInput.value)

    if (!amount || amount <= 0) return

    balanceManager.addTopUp(amount)

    renderBalance(balanceManager, manager.expenses)

    topUpInput.value = ""
})

weekBtn.addEventListener("click", () => {
    Filters.mode = "week"

    monthSelect.value = ""
    yearSelect.value = new Date().getFullYear()
    categoryFilter.value = "all"

    const range = Filters.week()
    const weekExpenses = Filters.apply(manager.expenses, range)
    renderExpenses(weekExpenses)
})

monthSelect.addEventListener("change", () => {
    Filters.mode = "month"
    applyMonthCategoryFilter()
})

yearSelect.addEventListener("change", () => {
    if (Filters.mode === "month") applyMonthCategoryFilter()
})

categoryFilter.addEventListener("change", () => {
    if (Filters.mode === "month") applyMonthCategoryFilter()
})

sortSelect.addEventListener("change", () => {
    let expensesToRender = [...manager.expenses]

    if (Filters.mode === "week") {
        const range = Filters.week()
        expensesToRender = Filters.apply(expensesToRender, range)
    } else if (Filters.mode === "month") {
        const year = Number(yearSelect.value)
        const month = Number(monthSelect.value)
        expensesToRender = manager.getExpensesByMonth(year, month)

        const category = categoryFilter.value
        if (category !== "all") {
            expensesToRender = expensesToRender.filter(e => e.category === category)
        }
    }

    if (sortSelect.value === "amount-asc") {
        expensesToRender.sort((a, b) => a.amount - b.amount)
    } else if (sortSelect.value === "amount-desc") {
        expensesToRender.sort((a, b) => b.amount - a.amount)
    }

    renderExpenses(expensesToRender)
})

const initialWeek = Filters.week()
const weekExpenses = Filters.apply(manager.expenses, initialWeek)

renderExpenses(Filters.apply(manager.expenses, initialWeek))
renderBalance(balanceManager, manager.expenses)


function renderExpenses(expenses) {
    currentExpenses = expenses

    expenseList.render(expenses)

    const total = getTotal(expenses)
    totalElement.textContent = `${total.toFixed(2)} ${Currency.getSymbol()}`

    renderCategoryPercent(expenses)
}

function applyMonthCategoryFilter() {
    const year = Number(yearSelect.value)
    const month = Number(monthSelect.value)
    const category = categoryFilter.value

    if (!isNaN(year) && !isNaN(month)) {
        let filtered = manager.getExpensesByMonth(year, month)

        if (category !== "all") {
            filtered = filtered.filter(e => e.category === category)
        }

        renderExpenses(filtered)
    }
}

function renderBalance(balanceManager, expenses) {
    const el = document.querySelector("#balance-amount")
    if (!el) return

    el.textContent = `${getCurrentBalance(balanceManager, expenses).toFixed(2)} ${Currency.getSymbol()}`
}