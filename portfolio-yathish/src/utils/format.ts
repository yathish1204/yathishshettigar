export function formatDate(dateString?: string): string {
  if (!dateString) return 'Present';
  if (dateString.toLowerCase() === 'present') return 'Present';

  if (dateString.includes('/')) {
    return dateString;
  }

  const parts = dateString.split('-');
  if (parts.length === 1) return parts[0];

  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (monthIdx >= 0 && monthIdx < 12) {
    return `${months[monthIdx]} ${year}`;
  }

  return dateString;
}

export function formatYearRange(startDate: string, endDate?: string, current?: boolean): string {
  const start = formatDate(startDate);
  const end = current ? 'Present' : formatDate(endDate);
  return `${start} — ${end}`;
}
