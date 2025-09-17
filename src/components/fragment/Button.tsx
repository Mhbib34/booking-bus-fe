type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
};
const Button = ({
  children,
  onClick,
  loading: isLoading = false,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white "></div>
          `` <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
