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
        p.textContent = `${cat}: ${percents[cat]}%`
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

