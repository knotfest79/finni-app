export function getFormattedDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        return 'Invalid Date';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}



export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

// date.js
export function normalizeDateInput(input) {
    const cleaned = input.replace(/\D/g, '');

    if (cleaned.length === 8) {
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`;
    }

    if (cleaned.length === 6) {
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-20${cleaned.slice(4, 6)}`;
    }

    return input; // fallback
}

