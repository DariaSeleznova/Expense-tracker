const Language = {
    current: "en",

    translations: {
        pl: {
            week: "W tym tygodniu",
            month: "Miesiąc",
            category: "Kategoria",
            total: "Łącznie wydano",
            balance: "Saldo",
            topup: "Doładuj",
            amount: "Kwota",
            addExpense: "Dodać wydatek",
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
            amount: "Kwota"
        },
        en: {
            week: "This week",
            month: "Month",
            category: "Category",
            total: "Total",
            balance: "Balance",
            topup: "Top up",
            amount: "Amount",
            addExpense: "Add expense",
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
            amount: "Amount"
        },
        uk: {
            week: "Цей тиждень",
            month: "Місяць",
            category: "Категорія",
            total: "Всього",
            balance: "Баланс",
            topup: "Поповнити",
            amount: "Сума",
            addExpense: "Додати витрату",
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
            amount: "Сума"
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
