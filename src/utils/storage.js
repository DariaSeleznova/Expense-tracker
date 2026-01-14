// Работа с localStorage:

// saveExpenses()

// loadExpenses()

// 👉 Это очень любят — отдельный слой для хранения данных.

// Создаём глобальный объект Storage
const Storage = {
    save: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    },

    load: function (key) {
        const json = localStorage.getItem(key)
        return json ? JSON.parse(json) : []
    },

    clear: function (key) {
        localStorage.removeItem(key)
    }
}
