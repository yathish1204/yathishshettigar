const FULL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function formatMonthYear(dateInput?: string | number, short = false): string {
  if (!dateInput) return '';
  const dateStr = String(dateInput).trim();
  if (!dateStr || dateStr.toLowerCase() === 'present') return 'Present';

  // If simple 4-digit year e.g. "2026"
  if (/^\d{4}$/.test(dateStr)) return dateStr;

  const months = short ? SHORT_MONTHS : FULL_MONTHS;

  // Handle DD/MM/YYYY or MM/DD/YYYY or YYYY/MM/DD
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      let year = parts[2];
      let month = parseInt(parts[1], 10);

      // If YYYY/MM/DD
      if (parts[0].length === 4) {
        year = parts[0];
        month = parseInt(parts[1], 10);
      } else if (parts[2].length === 4) {
        if (parseInt(parts[0], 10) <= 12 && parseInt(parts[1], 10) > 12) {
          month = parseInt(parts[0], 10);
        }
      }

      if (!isNaN(month) && month >= 1 && month <= 12 && year) {
        return `${months[month - 1]} ${year}`;
      }
    }
  }

  // Handle YYYY-MM-DD or ISO string
  if (dateStr.includes('-')) {
    const parts = dateStr.split('T')[0].split('-');
    if (parts.length >= 2) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${months[monthIdx]} ${year}`;
      }
    }
  }

  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const month = months[d.getUTCMonth()];
    const year = d.getUTCFullYear();
    return `${month} ${year}`;
  }

  return dateStr;
}

export function formatDate(dateString?: string): string {
  return formatMonthYear(dateString, true);
}

export function formatYearRange(startDate: string, endDate?: string, current?: boolean): string {
  const start = formatMonthYear(startDate, true);
  const end = current ? 'Present' : formatMonthYear(endDate, true);
  return `${start} — ${end}`;
}
