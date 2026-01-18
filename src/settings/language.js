const Language = {
    current: "en",

    translations: {
        pl: {
            week: "W tym tygodniu",
            month: "Miesiąc",
            category: "Kategoria",
            ascending: "Rosnąco",
            descending: "Malejącej",
            total: "Łącznie wydano",
            balance: "Saldo",
            topup: "Doładuj",
            amount: "Kwota",
            expenses: "Wydatki",
            addExpense: "Dodać wydatek",
            recent: "Ostatni",
            january: "Styczeń",
            february: "Luty",
            march: "Marzec",
            april: "Kwiecień",
            may: "Maj",
            june: "Czerwiec",
            july: "Lipiec",
            august: "Sierpień",
            september: "Wrzesień",
            october: "Październik",
            november: "Listopad",
            december: "Grudzień",
            all: "Wszystko",
            foodstuffs: "Artykuły spożywcze",
            transport: "Transport",
            cosmetics: "Kosmetyki/Chemia gospodarcza",
            subscriptions: "Subskrypcje/Operator komórkowy/Internet",
            loans: "Pożyczki/kredyty hipoteczne",
            entertainment: "Rozrywka/Podróże/Sport",
            gifts: "Prezenty/Darowizny",
            clothing: "Odzież/Obuwie",
            renovation: "Renowacja/Wnętrza",
            other: "Inny",
            sorting: "Brak sortowania",
            amount: "Kwota",
            topExpenses: "Top wytrat"
        },
        en: {
            week: "This week",
            month: "Month",
            category: "Category",
            ascending: "Ascending",
            descending: "Descending",
            total: "Total",
            balance: "Balance",
            topup: "Top up",
            amount: "Amount",
            expenses: "Expenses",
            addExpense: "Add expense",
            recent: "Recent",
            january: "January",
            february: "February",
            march: "March",
            april: "April",
            may: "May",
            june: "June",
            july: "July",
            august: "August",
            september: "September",
            october: "October",
            november: "November",
            december: "December",
            all: "All",
            foodstuffs: "Foodstuffs",
            transport: "Transport",
            cosmetics: "Cosmetics/Household Chemicals",
            subscriptions: "Subscriptions/Mobile Operator/Internet",
            loans: "Loans/Mortgages",
            entertainment: "Entertainment/Travel/Sport",
            gifts: "Gifts/Donations",
            clothing: "Clothing/Shoes",
            renovation: "Renovation/Interior",
            other: "Other",
            sorting: "No sorting",
            amount: "Amount",
            topExpenses: "Top Expenses"
        },
        uk: {
            week: "Цей тиждень",
            month: "Місяць",
            category: "Категорія",
            ascending: "За зростанням",
            descending: "За спаданням",
            total: "Всього",
            balance: "Баланс",
            topup: "Поповнити",
            amount: "Сума",
            expenses: "Витрати",
            addExpense: "Додати витрату",
            recent: "Недавні",
            january: "Січень",
            february: "Лютий",
            march: "Березень",
            april: "Квітень",
            may: "Травень",
            june: "Червень",
            july: "Липень",
            august: "Серпень",
            september: "Вересень",
            october: "Жовтень",
            november: "Листопад",
            december: "Грудень",
            all: "Всього",
            foodstuffs: "Продукти харчування",
            transport: "Транспорт",
            cosmetics: "Косметика/Побутова хімія",
            subscriptions: "Підписки/Мобільний оператор/Інтернет",
            loans: "Кредити/Іпотеки",
            entertainment: "Розваги/Подорожі/Спорт",
            gifts: "Подарунки/Пожертви",
            clothing: "Одяг/Взуття",
            renovation: "Ремонт/Інтер'єр",
            other: "Інше",
            sorting: "Без сортування",
            amount: "Сума",
            topExpenses: "Топ витрат"
        }
    },

    init() {
        const saved = localStorage.getItem("language")
        if (saved) this.current = saved
    },

    set(lang) {
        this.current = lang
        localStorage.setItem("language", lang)
        this.apply()
    },

    t(key) {
        return this.translations[this.current][key] || key
    },

    apply() {
        document.querySelectorAll("[data-language]").forEach(el => {
            if (el.children.length > 0) return;
            const key = el.dataset.language
            el.textContent = this.t(key)
        })
    }
}
