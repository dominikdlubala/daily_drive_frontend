const API_URL = 'api/Statistics'

export const fetchStatisticsData = async (token: string, period: string = 'month') => {
    try {
        const response = await fetch(`${API_URL}/workout-statistics/${period}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }); 
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data }; 
    } catch (err) {
        return { error: { message: 'Unexpected error | fetchWorkoutTemplates'}}
    }

}
