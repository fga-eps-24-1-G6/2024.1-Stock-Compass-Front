export const Formatter = {
    percentage: (num: number) => {
        return num.toFixed(2) + '%'
    },
    currency: (num: number) => {
        return 'R$ ' + num.toFixed(2).toString().replace('.', ',')
    },
    shortCurrency: (num: number) => {
        let shortNum = num;
        let symbol = '';

        if (num > 1_000_000_000) {
            shortNum = num / 1_000_000_000
            symbol = 'B'
        }
        else if (num > 1_000_000) {
            shortNum = num / 1_000_000
            symbol = 'M'
        }
        else if (num > 1_000) {
            shortNum = num / 1_000
            symbol = 'K'
        }
        return `R$ ${shortNum.toFixed(2).toString().replace('.', ',')} ${symbol}`
    }
}
