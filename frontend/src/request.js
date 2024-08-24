import axios from 'axios';

// Function to attach access token and make API requests
export async function apiRequest(url, refreshURL, options = {}) {
    let accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Set the Authorization header
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
    };

    try {
        // Make the API request with the access token
        const response = await axios({
            url,
            ...options,
            headers,
        });

        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Access token expired, try to refresh it
            try {
                const refreshResponse = await axios.post(refreshURL, {
                    refresh: refreshToken,
                });

                if (refreshResponse.status === 200) {
                    const data = refreshResponse.data;
                    accessToken = data.access;
                    localStorage.setItem('accessToken', accessToken);

                    // Retry the original request with the new access token
                    const retryResponse = await axios({
                        url,
                        ...options,
                        headers: {
                            ...headers,
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    return retryResponse;
                } else {
                    // Refresh token expired, log out
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    //window.location.href = '/login'; // Redirect to login
                }
            } catch (refreshError) {
                // Refresh token request failed, log out
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                //window.location.href = '/login'; // Redirect to login
            }
        } else {
            // Throw the original error if it's not a 401
            throw error;
        }
    }
}
