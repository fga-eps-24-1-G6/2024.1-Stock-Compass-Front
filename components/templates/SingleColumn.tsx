export default function SingleColumn({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="w-full flex justify-center items-center">
            <main className="w-full xl:max-w-[1184px] flex flex-col justify-center items-center gap-8">
                {children}
            </main>
        </section>
    )
}
