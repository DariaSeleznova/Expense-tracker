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

function getTopCategories(expenses) {
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
     <div class="top-bar">
        <div 
            class="top-bar-fill"
            data-category="${item.category}"
            style="width: ${item.percent}%;background: ${CategoryColors.get(item.category)};"
        ></div>
      </div>

      <div class="top-row">
        <span class="top-category">
            ${Language.t(item.category)} ${item.percent.toFixed(1)}%
        </span>

        <span class="top-amount">
            ${item.amount.toFixed(2)} ${Currency.getSymbol()}
        </span>
      </div>
`

        container.appendChild(row)
    })
}
function renderCategoryChart(expenses) {
    const container = document.querySelector("#category-percent")
    if (!container) return

    const data = getTopCategories(expenses)
    if (!data.length) {
        container.innerHTML = "<p>No data</p>"
        return
    }

    let currentAngle = 0
    const parts = []

    data.forEach(item => {
        const start = currentAngle
        const end = currentAngle + item.percent
        currentAngle = end

        parts.push(
            `${CategoryColors.get(item.category)} ${start}% ${end}%`
        )
    })
    const legend = data.map(item => `
    <div class="legend-item">
        <span 
            class="legend-dot"
            style="background:${CategoryColors.get(item.category)}"
        ></span>
        <span>${Language.t(item.category)}</span>
    </div>
`).join("")


    container.innerHTML = `
    <div class="donut"
        style="background: conic-gradient(${parts.join(",")})"
    ></div>
    <div class="legend">
        ${legend}
    </div>
`

}
