const AuthApi = {
    "rootUrl":"http://localhost:3001",

    authLogin: function() {
        return this.rootUrl+`/authLogin`
    },

}

export default AuthApi;