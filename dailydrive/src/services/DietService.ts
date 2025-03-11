const API_URL = 'api/DailyDiet'; 

export const getDietByDate = async (date: Date) => {
    try {
        const response = await fetch(`${API_URL}/${date.toISOString()}`)
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | startCurrentWorkout' }}
    }
}