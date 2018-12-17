var server = 'https://projexor.oidiotlin.com/api/v1';
// var server = 'http://localhost:8000/api/v1';
export const api = {
    login: function () {
        return server + '/users/login/';
    },
    register: function () {
        return server + '/users/register/';
    },
    user: function (id) {
        const rt = server + '/users/';
        if (id) return rt + id + '/';
        return rt;
    },
    project: function (id) {
        const rt = server + '/projects/';
        if (id) return rt + id + '/';
        return rt;
    },
    task: function (id) {
        const rt = server + '/tasks/';
        if (id) return rt + id + '/';
        return rt;
    },
    resource: function (id) {
        const rt = server + '/resources/';
        if (id) return rt + id + '/';
        return rt;
    },
    issue: function (id) {
        const rt = server + '/posts/';
        if (id) return rt + id + '/';
        return rt;
    },
    reply: function (id) {
        const rt = server + '/replies/';
        if (id) return rt + id + '/';
        return rt;
    },
};
