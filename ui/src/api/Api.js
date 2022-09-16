import axios from 'axios';
const token=localStorage.getItem("token")
export const getFetch = async (url) => {
    try {
        const token = localStorage.getItem("token")

        const response = await axios({
            method: "GET",
            url: `${url}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            return await response.data;
        } else {
            console.log('data not fetch');
        }
    } catch (error) {
        console.log(error.response);
    }
};
export const getFetchByLimit = async (url, limit, page) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${url}/${limit}/${page}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            return await response.data;
        } else {
            console.log('data not fetch');
        }
    } catch (error) {
        console.log(error.response);
    }
};
export const getOneFetch = async (url, id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${url}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            return await response.data;
        }
    } catch (error) {
        if (error.response.status === 401) {
            return 401;
        }
        return error;
    }
};
export const postFetch = async (url, data) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios({
            method: 'post',
            url: `${url}`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            data,
            withCredentials: true,
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        if (error.response.status === 401) {
            return 401;
        } else {
            return error.response;
        }
    }
};
export const patchFetch = async (url, id, data) => {
    try {
        const response = await axios({
            method: 'patch',
            url: `${url}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
            withCredentials: true,
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        if (error.response.status === 401) {
            return 401;
        } else {
            return error.response;
        }
    }
};
export const putFetch = async (url, data) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios({
            method: 'put',
            url: `${url}`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            data,
            withCredentials: true,
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        if (error.response.status === 401) {
            return 401;
        } else {
            return error.response;
        }
    }
};
export const deleteFetch = async (url, id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${url}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        if (error.response.status === 401) {
            return 401;
        }
        console.log(error);
    }
};

export const postFetchData = async (url, data) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios({
            method: 'post',
            url: `${url}`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            data,
            withCredentials: true,
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        if (error.response.status === 401) {
            return 401;
        } else {
            return error.response;
        }
    }
};