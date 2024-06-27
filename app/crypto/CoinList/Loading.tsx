import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
    return Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="flex flex-col gap-2 p-4 rounded-2xl">
            <div className="w-full flex justify-start">
                <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-full h-10"/>
                <Skeleton className="w-full h-10"/>
            </div>
        </Card>
    ))
}