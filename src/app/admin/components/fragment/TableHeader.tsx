type TableHeaderProps = {
  children: React.ReactNode;
  sortable?: boolean;
};
const TableHeader = ({ children, sortable = false }: TableHeaderProps) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">
    <div
      className={`flex items-center space-x-1 ${
        sortable ? "cursor-pointer hover:text-gray-300" : ""
      }`}
    >
      {children}
    </div>
  </th>
);

export default TableHeader;
