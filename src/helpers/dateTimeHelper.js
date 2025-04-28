export function formatDateForInput(dateString) {
    if (!dateString) return '';
    return dateString.substring(0, 10);  
}

export function calculateAge(dateString) {
    const birth = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}