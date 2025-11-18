const API_ROUTE = `${process.env.REACT_APP_API_URL}/home`; 

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
