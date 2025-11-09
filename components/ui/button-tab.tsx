import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "data-id": string;
}

export default function ButtonTab({ 
  children, 
  className,
  ...props 
}: ButtonTabProps) {
  return (
    <button
      className={cn(
        "px-2 py-2 text-xs md:text-sm w-full text-zinc-600 dark:text-zinc-400",
        "data-[checked=true]:text-primary-foreground flex items-center justify-center cursor-pointer",
        "transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
