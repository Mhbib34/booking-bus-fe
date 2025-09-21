type ActionButtonProps = {
  icon: React.ElementType;
  onClick: () => void;
  variant?: "default" | "danger" | "success";
};
const ActionButton = ({
  icon: Icon,
  onClick,
  variant = "default",
}: ActionButtonProps) => {
  const variants = {
    default: "text-gray-400 hover:text-white",
    danger: "text-red-400 hover:text-red-300",
    success: "text-green-400 hover:text-green-300",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded transition-colors ${variants[variant]}`}
    >
      <Icon className={`h-4 w-4`} />
    </button>
  );
};

export default ActionButton;
