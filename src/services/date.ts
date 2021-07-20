export const formatDate = (date: string | number | Date) => {
  date = new Date(date)

  const day = formatNumber(date.getDate())
  const month = formatNumber(date.getMonth() + 1)
  const year = formatNumber(date.getFullYear())

  const hours = formatNumber(date.getHours())
  const minutes = formatNumber(date.getMinutes())

  return `${day}/${month}/${year} ${hours}:${minutes}h`
}

function formatNumber (n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}
