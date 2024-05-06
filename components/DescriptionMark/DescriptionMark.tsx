'use client'

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { CircleHelp } from "lucide-react";
import { Card } from "../ui/card";

export function DescriptionMark() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <CircleHelp className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                    <Card className="p-4">
                        Descrição genérica
                    </Card>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}