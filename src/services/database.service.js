const getRequest = (url) =>
    fetch(url)
        .then((response) => response.json());

const postRequest = (url, data) =>
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())

const deleteRequest = (url, id) =>
    fetch([url, id].join("/"), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
    }).then((response) => response.json())


const putRequest = (url, id, data) =>
    fetch([url, id].join("/"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())

export {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest
};