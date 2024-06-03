'use client'

import { ErrorAlert } from "@/components/ErrorAlert/ErrorAlert";
import SingleColumn from "@/components/templates/SingleColumn";

export default function HandleError() {
    return (
        <SingleColumn>
            <section className="flex flex-grow h-full w-full items-center">
                <ErrorAlert />
            </section>
        </SingleColumn>
    )
}