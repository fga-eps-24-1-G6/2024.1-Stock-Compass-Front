import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  item6: string;
  item7: string;
  item8: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "item1",
    header: "",
  },
  {
    accessorKey: "item2",
    header: "Item",
  },
  {
    accessorKey: "item3",
    header: "Item",
  },
  {
    accessorKey: "item4",
    header: "Item",
  },
  {
    accessorKey: "item5",
    header: "Item",
  },
  {
    accessorKey: "item6",
    header: "Item",
  },
  {
    accessorKey: "item7",
    header: "Item",
  },
  {
    accessorKey: "item8",
    header: "Item",
  },
];
