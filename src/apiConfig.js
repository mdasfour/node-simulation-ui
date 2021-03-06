const hostname = 'YOUR HOSTNAME HERE';
const port = 'YOUR PORT HERE';
const apiVersion = 'v1';
const baseUrl = `http://${hostname}:${port}/NodeManager/${apiVersion}`;

export const apiConfig = {
    fetch: {
        url: baseUrl.concat('/Nodes/'),
        method: 'get'
    },
    create: {
        url: baseUrl.concat('/AddNode'),
        method: 'post'
    },
    delete: {
        url: baseUrl.concat('/RemoveNode/'),
        method: 'delete'
    },
    online: {
        url: baseUrl.concat('/Online/'),
        method: 'patch'
    },
    offline: {
        url: baseUrl.concat('/Offline/'),
        method: 'patch'
    },
    maxLimits: {
        url: baseUrl.concat('/MaxLimits'),
        method: 'post'
    }
};
