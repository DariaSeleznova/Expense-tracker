class BalanceManager {
    constructor() {
        const data = Storage.load("balance")
        this.initial = data?.initial ?? 0
        this.topUps = data?.topUps ?? []
    }

    addTopUp(amount) {
        this.topUps.push({
            amount,
            date: new Date()
        })
        this.save()
    }

    getTotalTopUps() {
        return this.topUps.reduce((sum, t) => sum + t.amount, 0)
    }

    save() {
        Storage.save("balance", {
            initial: this.initial,
            topUps: this.topUps
        })
    }
}