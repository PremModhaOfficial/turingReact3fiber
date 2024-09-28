import { Home, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">
                            Turing Machine Simulator
                        </span>
                    </a>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50" href="/">
                                    <Home className="mr-2 h-4 w-4" /> Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Configuration</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/config/#Variables"
                                                >
                                                    <Settings className="h-6 w-6" />
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        Configuration
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Set up your Turing machine parameters and alphabet.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    href="/config"
                                                >
                                                    <div className="text-sm font-medium leading-none">Tape Alphabet</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        Define the symbols used on your Turing machine's tape.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    href="/config#States"
                                                >
                                                    <div className="text-sm font-medium leading-none">State Configuration</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        Set up the states and transitions for your Turing machine.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50" href="/help">
                                    <HelpCircle className="mr-2 h-4 w-4" /> Help
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add search functionality here if needed */}
                    </div>
                    <nav className="flex items-center space-x-2">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
