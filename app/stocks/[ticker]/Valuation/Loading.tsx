import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
    return Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="flex flex-col gap-2 p-4 rounded-2xl">
            <div className="w-full flex justify-end">
                <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-8"/>
                <Skeleton className="w-full h-6"/>
            </div>
        </Card>
    ))
}