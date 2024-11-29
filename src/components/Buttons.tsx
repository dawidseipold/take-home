import { FC } from "react";
import { RevertIcon, XMarkIcon } from "./icons";
import { cn } from "../utils/cn";

type ButtonProps = React.ComponentProps<"button">

type ExpandButtonProps = ButtonProps & {
  expanded: boolean;
};

type ToggleButtonProps = ButtonProps & {
  toggled: boolean;
};


export const ExpandButton: FC<ExpandButtonProps> = ({ children, onClick, expanded, ...props }) => {
  return (
    <button onClick={onClick} className={cn("hover:text-gray-700 transition-colors flex items-center justify-center", expanded && "rotate-180")} {...props}>
      {children}
    </button>
  );
};

export const ToggleButton: FC<Omit<ToggleButtonProps, "children">> = ({ toggled, onClick, ...props }) => {
  return (
    <button onClick={onClick} className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {toggled ? (
        <RevertIcon />
      ) : (
        <XMarkIcon />
      )}
    </button>
  );
};

export const TextButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="text-white text-sm transition-colors hover:bg-blue-600 bg-blue-500 rounded px-3 py-1" {...props}>
      {children}
    </button>
  )
} 
