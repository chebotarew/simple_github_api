export const formatDate = (dateStr: string): string => {
    let date = new Date(dateStr)
    const mounth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getDate()}-${mounth}-${date.getFullYear()}`
}