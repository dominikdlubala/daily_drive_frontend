const API_URL = 'api/Home'; 

export const fetchHomePageData = async () => {
    try {
        const response = await fetch(API_URL); 
        if(!response.ok) {
            return { error: response.text() }
        }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err);
        return { error: { message: 'Unexpected error | fetchHomePageData' } }
    }
}
