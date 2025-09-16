import { AlertCircle, Eye, EyeOff } from "lucide-react";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  Icon?: React.ElementType;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  disabled?: boolean;
};

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  Icon,
  error,
  showPasswordToggle = false,
  showPassword: showPass,
  onTogglePassword,
  disabled = false,
}: InputProps) => (
  <div className="space-y-2">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <input
        type={showPasswordToggle ? (showPass ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // disabled={disabled || loading}
        className={`w-full pl-10 pr-${
          showPasswordToggle ? "12" : "4"
        } py-3 bg-gray-800 border ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-600 focus:border-blue-500"
        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500/20" : "focus:ring-blue-500/20"
        } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          // disabled={disabled || loading}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 disabled:opacity-50"
        >
          {showPass ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center space-x-2 text-red-400 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default Input;
