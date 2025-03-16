const API_URL = 'api/UserGoal';

export const getUserGoals = async (token: string) => {
    try {
        const response = await fetch(API_URL)
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | fetchProductByName' }}
    }
}