// Работа с localStorage:

// saveExpenses()

// loadExpenses()

// 👉 Это очень любят — отдельный слой для хранения данных.

class Storage {
    static save(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    static load(key) {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : []
    }
}
