import { format, differenceInMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date, formatStr = 'dd/MM/yyyy HH:mm') => {
    if (!date) return 'N/A';

    try {
        return format(new Date(date), formatStr, { locale: es });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Fecha inválida';
    }
};

export const calculateTimeElapsed = (startDate, endDate = new Date()) => {
    if (!startDate) return 'N/A';

    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInMinutes = differenceInMinutes(end, start);

        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return `${hours}h ${minutes}m`;
    } catch (error) {
        console.error('Error calculating time elapsed:', error);
        return 'Error de cálculo';
    }
};
