// Тут:

// создаётся ExpenseManager

// инициализируются UI-компоненты

// связывается логика и интерфейс

// 📌 Это единственное место, где всё “сходится”.

const manager = new ExpenseManager()
const expenseList = new ExpenseList(manager)
const expenseForm = new ExpenseForm(manager, expenseList)

expenseList.initEvents()
expenseForm.initEvents()

// DOM элементы
const totalElement = document.querySelector("#total-amount")
const monthSelect = document.querySelector("#month-select")
const yearSelect = document.querySelector("#year-select")
const weekBtn = document.querySelector("#weekBtn")
const sortSelect = document.querySelector("#sort-select")
const startDateInput = document.querySelector("#start-date")
const endDateInput = document.querySelector("#end-date")

const startDatePicker = flatpickr(startDateInput, { dateFormat: "Y-m-d", allowInput: true })
const endDatePicker = flatpickr(endDateInput, { dateFormat: "Y-m-d", allowInput: true })

// Сбрасываем все фильтры кроме текущего
function resetAllFilters() {
    startDatePicker.clear()
    endDatePicker.clear()
    monthSelect.value = ""
    yearSelect.value = ""
}

// Универсальная функция фильтрации + сортировки
function applyFiltersAndSort() {
    let expenses = [...manager.expenses]

    // Фильтр по режиму
    if (Filters.mode === "week") {
        const range = Filters.week()
        expenses = Filters.apply(expenses, range)
    }
    else if (Filters.mode === "month") {
        const year = Number(yearSelect.value)
        const month = Number(monthSelect.value)
        if (!isNaN(year) && !isNaN(month)) {
            const range = Filters.byMonth(year, month)
            expenses = Filters.apply(expenses, range)
        }
    }
    else if (Filters.mode === "range") {
        const start = startDateInput.value ? new Date(startDateInput.value) : null
        const end = endDateInput.value ? new Date(endDateInput.value) : null
        if (start || end) {
            const range = Filters.byRange(start, end)
            expenses = Filters.apply(expenses, range)
        }
    }

    // Сортировка
    if (sortSelect.value === "amount-asc") {
        expenses.sort((a, b) => a.amount - b.amount)
    } else if (sortSelect.value === "amount-desc") {
        expenses.sort((a, b) => b.amount - a.amount)
    }

    // Рендер
    expenseList.render(expenses)
    totalElement.textContent = getTotal(expenses)
    renderCategoryPercent(expenses)
}

// Обработчики событий
weekBtn.addEventListener("click", (e) => {
    e.preventDefault()
    Filters.mode = "week"
    resetAllFilters()
    applyFiltersAndSort()
})

monthSelect.addEventListener("change", () => {
    if (monthSelect.value) {  // только если выбран месяц
        Filters.mode = "month"
        startDatePicker.clear()
        endDatePicker.clear()
        applyFiltersAndSort()
    }
})

yearSelect.addEventListener("change", () => {
    if (monthSelect.value) {  // пересчёт только если месяц выбран
        Filters.mode = "month"
        startDatePicker.clear()
        endDatePicker.clear()
        applyFiltersAndSort()
    }
})

startDateInput.addEventListener("change", () => {
    Filters.mode = "range"
    monthSelect.value = ""
    yearSelect.value = ""
    applyFiltersAndSort()
})

endDateInput.addEventListener("change", () => {
    Filters.mode = "range"
    monthSelect.value = ""
    yearSelect.value = ""
    applyFiltersAndSort()
})

sortSelect.addEventListener("change", () => {
    applyFiltersAndSort()
})

// Первичный рендер при загрузке
Filters.mode = "week"
applyFiltersAndSort()
