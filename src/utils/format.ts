export class Format {
  static formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  static formatDate = (dateRaw: string | Date) => {
    const date = new Date(dateRaw);

    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  static formatTime = (dateRaw: string | Date) => {
    const date = new Date(dateRaw);

    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  static formatDayOfWeek = (day_of_week: string): string => {
    if (Array.isArray(day_of_week)) {
      return day_of_week.join(", ");
    }
    if (typeof day_of_week === "object" && day_of_week !== null) {
      return (
        Object.entries(day_of_week)
          // eslint-disable-next-line
          .filter(([_, value]) => value)
          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
          .join(", ")
      );
    }
    return String(day_of_week || "-");
  };
}
