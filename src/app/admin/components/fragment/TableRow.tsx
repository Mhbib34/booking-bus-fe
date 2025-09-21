type TableRowProps = {
  children: React.ReactNode;
  onClick?: () => void;
};
const TableRow = ({ children, onClick }: TableRowProps) => (
  <tr
    className={`border-b border-gray-700 hover:bg-gray-800/50 transition-colors ${
      onClick ? "cursor-pointer" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </tr>
);

export default TableRow;
