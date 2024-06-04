export default function SingleColumn({
    children,
    className
}: Readonly<{
    children: React.ReactNode;
    className?: string
}>) {
    return (
        <section className={`w-full flex justify-center items-center ${className}`}>
            <main className="w-full xl:max-w-[1184px] flex flex-col justify-center items-center gap-8">
                {children}
            </main>
        </section>
    )
}
