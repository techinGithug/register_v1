const AdminApi = {
    "rootUrl":"http://localhost:3001",

    admin: function() {
        return this.rootUrl+`/admin`
    },

    getAllSubjects: function() {
        return this.rootUrl+`/admin/subjects`
    }

}

export default AdminApi