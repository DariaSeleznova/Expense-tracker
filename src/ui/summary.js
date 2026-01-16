function getTotal(expenses) {
    if (!Array.isArray(expenses)) return 0
    return expenses.reduce((sum, e) => sum + e.amount, 0)
}

function getCategoryPercent(expenses) {
    const total = getTotal(expenses)
    if (total === 0) return {}

    const categories = {}

    expenses.forEach(e => {
        categories[e.category] = (categories[e.category] || 0) + e.amount
    })

    for (const key in categories) {
        categories[key] = ((categories[key] / total) * 100).toFixed(1)
    }

    return categories
}

function renderCategoryPercent(expenses, selector = "#category-percent") {
    const container = document.querySelector(selector)
    if (!container) return

    const percents = getCategoryPercent(expenses)
    container.innerHTML = ""

    for (const cat in percents) {
        const p = document.createElement("p")
        p.textContent = `${Language.t(cat)}: ${percents[cat]}%`
        container.appendChild(p)
    }
}
function renderTotal() {
    totalElement.textContent = manager.getTotalAllTime()
}

function getCurrentBalance(balanceManager, expenses) {
    return (
        balanceManager.initial +
        balanceManager.getTotalTopUps() -
        getTotal(expenses)
    )
}
function renderBalance(balanceManager, expenses) {
    const el = document.querySelector("#balance-amount")
    if (!el) return
    const currentBalace = getCurrentBalance(balanceManager, expenses)
    el.textContent = `${currentBalace.toFixed(2)} ${Currency.getSymbol()}`
}

function getTopCategories(expenses, limit = 5) {
    if (!Array.isArray(expenses) || expenses.length === 0) return []

    const totals = {}

    expenses.forEach(e => {
        totals[e.category] = (totals[e.category] || 0) + e.amount
    })

    const totalSum = getTotal(expenses)

    return Object.entries(totals)
        .map(([category, amount]) => ({
            category,
            amount,
            percent: totalSum ? (amount / totalSum) * 100 : 0
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, limit)
}

function renderTopExpenses(expenses, selector = "#top-expenses") {

    const container = document.querySelector(selector)

    if (!container) return

    const top = getTopCategories(expenses)


    container.innerHTML = ""

    top.forEach(item => {

        const row = document.createElement("div")
        row.className = "top-expense"

        row.innerHTML = `
            <span>${Language.t(item.category)}</span>
            <span>${item.percent.toFixed(1)}%</span>
            <span>${item.amount.toFixed(2)} ${Currency.getSymbol()}</span>
        `

        container.appendChild(row)
    })
}
