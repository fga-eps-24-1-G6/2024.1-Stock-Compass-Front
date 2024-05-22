import { DataTable } from "@/components/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface BalanceSheetItem {
    item: string,
    yearlyValues: {
        year: number,
        value: number
    }[],
}

async function getBalanceSheetData(ticker: string): Promise<BalanceSheetItem[]> {
    const response = await fetch(`${process.env.STOCK_API}/api/balance-sheet/37`);//${ticker}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

interface BalanceSheetProps {
    ticker: string
};

export default async function BalanceSheet({ ticker }: Readonly<BalanceSheetProps>) {
    const balanceSheetData = await getBalanceSheetData(ticker);

    const { columns, values } = handleBalanceSheetData();

    function handleBalanceSheetData() {
        if (!balanceSheetData) throw new Error('Balance sheet data not found');

        const headers = balanceSheetData[0].yearlyValues.map((item) => item.year.toString());

        const columns: ColumnDef<unknown>[] = [{ accessorKey: '#', header: '' }];
        columns.push(...headers.map((item) => (
            { accessorKey: item, header: item }
        )));

        const values = [];
        for (let i = 0; i < balanceSheetData.length; i++) {
            const row = [['#', balanceSheetData[i].item]];
            row.push(...headers.map((item, idx) => {
                let value = balanceSheetData[i].yearlyValues[idx].value ? balanceSheetData[i].yearlyValues[idx].value.toString() : '-'
                return [item, value];
            }));

            values.push(Object.fromEntries(row));
        }

        return { columns, values }
    }

    return <DataTable columns={columns} data={values} />
}