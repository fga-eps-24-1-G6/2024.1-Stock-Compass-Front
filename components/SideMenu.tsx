import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"
import { Home, Menu, Search, WalletMinimal } from "lucide-react"
import Link from "next/link"

export function SideMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className="text-muted-foreground" />
            </SheetTrigger>
            <SheetContent>
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <div className="grid gap-4 py-4">
                    <Link href={"/"}>
                        <div className="flex gap-2 items-center">
                            <Home className="w-4 h-4" />
                            Tela inicial
                        </div>
                    </Link>
                    <Link href={"/search"}>
                        <div className="flex gap-2 items-center">
                            <Search className="w-4 h-4" />
                            Pesquisar
                        </div>
                    </Link>
                    <Link href={"/wallets"}>
                        <div className="flex gap-2 items-center">
                            <WalletMinimal className="w-4 h-4" />
                            Carteiras
                        </div>
                    </Link>
                </div>

                <SignedOut>
                    <SheetFooter>
                        <SheetClose asChild>
                            <SignInButton>
                                <Button variant="default" size="default">
                                    Login
                                </Button>
                            </SignInButton>
                        </SheetClose>
                    </SheetFooter>
                </SignedOut>
            </SheetContent>
        </Sheet>
    )
}
