const daysArr = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export const dateRange = () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 3);

    const todayDay = today.getDate();
    const todayMonthName = getMonthName(today.getMonth());
    
    const endDateDay = endDate.getDate();
    const endDateMonthName = getMonthName(endDate.getMonth());

    return `${todayDay} de ${todayMonthName} - ${endDateDay} de ${endDateMonthName}`;
}

export const getDayNamesForNextDays = (daysToAdd: number): string[] => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i <= daysToAdd; i++) {
        const newDate = new Date(today)
        newDate.setDate(today.getDate() + i)
        const dayName = daysArr[newDate.getDay()]
        days.push(dayName)
    }    
    return days;
}

const getMonthName = (monthIndex: number): string => {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[monthIndex];
}