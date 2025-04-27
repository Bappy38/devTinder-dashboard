export function formatDateForInput(dateString) {
    if (!dateString) return '';
    return dateString.substring(0, 10);  
}