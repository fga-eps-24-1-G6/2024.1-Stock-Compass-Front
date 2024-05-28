
import React from "react";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function ErrorAlert() {
    return (
        <Alert className="text-start w-full">
            <TriangleAlert className="h-4 w-4 text-yellow-400" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>
                Tivemos um problema ao carregar os dados
            </AlertDescription>
        </Alert>
    )
}