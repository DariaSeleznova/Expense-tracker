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

expenseList.render(manager.expenses)

