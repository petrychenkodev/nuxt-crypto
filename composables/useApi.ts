import axios from 'axios'

export const useApi = () => {

    const fetchData = async <T>(url: string, options = {}, retries = 2): Promise<{ data: T | null; error: any; success: boolean }> => {
        let attempt = 0;

        while (attempt <= retries) {
            try {
                const res = await axios.get<T>(url, options);

                return {
                    data: res.data,
                    error: null,
                    success: true,
                };
            } catch (err) {
                attempt++;

                if (attempt > retries) {
                    console.error("API Error:", err);
                    return {
                        data: null,
                        error: err,
                        success: false,
                    };
                }

                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        return {
            data: null,
            error: "Unknown error",
            success: false,
        };
    };

    const postData = async <T>(url: string, body: any, options = {}) => {
        try {
            const res = await axios.post<T>(url, body, options);
            return { data: res.data, error: null, success: true };
        } catch (err) {
            console.error("POST API Error:", err);
            return { data: null, error: err, success: false };
        }
    };

    const putData = async <T>(url: string, body: any, options = {}) => {
        try {
            const res = await axios.put<T>(url, body, options);
            return { data: res.data, error: null, success: true };
        } catch (err) {
            console.error("PUT API Error:", err);
            return { data: null, error: err, success: false };
        }
    };

    const deleteData = async <T>(url: string, options = {}) => {
        try {
            const res = await axios.delete<T>(url, options);
            return { data: res.data, error: null, success: true };
        } catch (err) {
            console.error("DELETE API Error:", err);
            return { data: null, error: err, success: false };
        }
    };

    return {
        fetchData,
        postData,
        putData,
        deleteData,
    }
}