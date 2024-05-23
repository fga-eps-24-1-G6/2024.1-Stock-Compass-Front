export default function SingleColumn({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="w-full flex justify-center items-center">
            <main className="w-full xl:max-w-[1184px] p-6 xl:p-0 flex flex-col justify-center items-center gap-8">
                {children}
            </main>
        </section>
    )
}
