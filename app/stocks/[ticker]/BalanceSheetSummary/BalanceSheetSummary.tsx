import { DataTable } from "@/components/DataTable/DataTable";
import { ErrorAlert } from "@/components/ErrorAlert/ErrorAlert";
import Formatter from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";

type BalanceSheetItem = (string | number | null)[]

async function getBalanceSheetData(companyId: number): Promise<BalanceSheetItem[] | null> {
    try {
        const response = await fetch(`${process.env.STOCK_API}/api/balance-sheet/yearly/${companyId}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

interface BalanceSheetProps {
    companyId: number
};

export default async function BalanceSheet({ companyId }: Readonly<BalanceSheetProps>) {
    const balanceSheetData = await getBalanceSheetData(companyId);

    const { columns, rows } = handleBalanceSheetData();

    function handleBalanceSheetData() {
        if (!balanceSheetData) return { columns: [], rows: [] };

        const headers = balanceSheetData[0];

        const columns: ColumnDef<unknown>[] = headers.map((item) => {
            return {
                accessorKey: item ? item.toString() : '#',
                header: item ? item.toString() : ''
            }
        });

        const rows = [];
        balanceSheetData.shift();

        for (let i = 0; i < balanceSheetData.length; i++) {
            const sheetItem = balanceSheetData[i].shift();
            const row = [['#', sheetItem]];
            row.push(...balanceSheetData[i].map((yearlyValue, idx) => {
                const value = yearlyValue ? Formatter.roundedCurrency(yearlyValue as number) : '-'
                return [headers[idx + 1], value];
            }));
            rows.push(Object.fromEntries(row));
        }

        return { columns, rows }
    }

    return (
        balanceSheetData ? <DataTable columns={columns} data={rows} /> : <ErrorAlert />
    )
}