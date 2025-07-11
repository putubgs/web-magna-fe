const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function publicApiCall(endpoint: string, options: RequestInit = {}) {
    console.log(import.meta.env.VITE_API_URL)
    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
}

export async function PrivateapiCall(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('accessToken');
    
    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
        };
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
    }
    
    return response;
}