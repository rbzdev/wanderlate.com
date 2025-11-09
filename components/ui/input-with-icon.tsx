import * as React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface InputWithIconProps extends React.ComponentProps<"input"> {
  icon?: string;
  iconPosition?: "left" | "right";
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, icon, iconPosition = "left", ...props }, ref) => {
    return (
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon icon={icon} className="w-4 h-4 text-zinc-400" />
          </div>
        )}
        <input
          type={type}
          ref={ref}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-secondary focus-visible:ring-secondary focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            icon && iconPosition === "left" ? "pl-9 pr-3" : "px-3",
            icon && iconPosition === "right" ? "pr-9 pl-3" : "",
            className
          )}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon icon={icon} className="w-4 h-4 text-zinc-400" />
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
