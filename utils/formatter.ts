function abvNum(num: number) {
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

    return { shortNum, symbol };
}

const Formatter = {
    percentage: (num: number) => {
        return num.toFixed(2) + '%'
    },
    currency: (num: number) => {
        return 'R$ ' + num.toFixed(2).toString().replace('.', ',')
    },
    roundedCurrency: (num: number) => {
        return 'R$ ' + num.toString().replace('.', ',')
    },
    shortNumber: (num: number) => {
        const { shortNum, symbol } = abvNum(num);
        return `${shortNum.toFixed(2).toString().replace('.', ',')} ${symbol}`
    },
    shortCurrency: (num: number) => {
        const { shortNum, symbol } = abvNum(num);
        return `R$ ${shortNum.toFixed(2).toString().replace('.', ',')} ${symbol}`
    },
    date(dateString: string): string | null {
        try {
            const [year, month, day] = dateString.split("-");
            return `${day}/${month}/${year}`;
        } catch (error) {
            return null;
        }
    },
    dateFromISO(dateString: string): string | null {
        try {
            const [year, month, day] = dateString.split("T")[0].split("-");
            return `${day}/${month}/${year}`;
        } catch (error) {
            return null;
        }
    },
    titleCase(str: string): string {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }
}

export default Formatter;