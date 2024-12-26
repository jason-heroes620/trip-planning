import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
    return (
        <div className="flex items-center border rounded-sm">
            <div className="px-2">
                <Search size={20} className="opacity-30" />
            </div>
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border-input bg-background px-2 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});
SearchInput.displayName = "Input";

export { SearchInput };
