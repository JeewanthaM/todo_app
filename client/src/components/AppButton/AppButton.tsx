import "./button.scss";

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick: CallableFunction;
  
}

export const AppButton = ({
  primary = false,
  size = "medium",
  label,
  onClick,
}: ButtonProps) => {
  const mode = primary ? "app-button--primary" : "app-button--secondary";
  return (
    <button
      type="button"
      className={["app-button", `app-button--${size}`, mode].join(" ")}      
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </button>
  );
};
