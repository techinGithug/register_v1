const AdminApi = {
    "rootUrl":"http://localhost:3001",

    admin: function() {
        return this.rootUrl+`/admin`
    },

    addTeacher: function() {
        return this.rootUrl+`/admin/teacher`
    },

    getAllSubjects: function() {
        return this.rootUrl+`/admin/subjects`
    },

    getAllTeachers: function() {
        return this.rootUrl+`/admin/teachers`
    },

    getAllStudents: function() {
        return this.rootUrl+`/admin/students`
    }, 

    softDeleteTeacher: function() {
        return this.rootUrl+`/admin/teacher`
    }

}

export default AdminApi