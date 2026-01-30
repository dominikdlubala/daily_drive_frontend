const API_ROUTE = `${import.meta.env.VITE_API_URL}/home`; 

export const fetchHomePageData = async (token: string) => {
    try {
        const response = await fetch(API_ROUTE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 

        }); 
        if(!response.ok) {
            return { error: await response.text() }
        }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err);
        return { error: 'Unexpected error | fetchProductByName'}
    }
}
