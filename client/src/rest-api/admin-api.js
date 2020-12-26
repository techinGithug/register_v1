const AdminApi = {
    "rootUrl":"http://localhost:3001",

    admin: function() {
        return this.rootUrl+`/admin`
    },

    addTeacher: function() {
        return this.rootUrl+`/admin/teacher`
    },

    addStudent: function() {
        return this.rootUrl+`/admin/student`
    },

    addSubject: function() {
        return this.rootUrl+`/admin/subject`
    },

    countAdmin: function() {
        return this.rootUrl+`/admin/countAdmin`
    },

    countTeacher: function() {
        return this.rootUrl+`/admin/countTeacher`
    },

    countStudent: function() {
        return this.rootUrl+`/admin/countStudent`
    },

    countSubject: function() {
        return this.rootUrl+`/admin/countSubject`
    },

    countRegistration: function() {
        return this.rootUrl+`/admin/countRegistration`
    },

    getAllSubjects: function() {
        return this.rootUrl+`/admin/subjects`
    },

    getAllTeachers: function() {
        return this.rootUrl+`/admin/teachers`
    },

    getAllRegistration: function() {
        return this.rootUrl+`/admin/registration`
    },

    getAllStudents: function() {
        return this.rootUrl+`/admin/students`
    }, 

    softDeleteTeacher: function() {
        return this.rootUrl+`/admin/teacher`
    },

    softDeleteStudent: function() {
        return this.rootUrl+`/admin/student`
    }

}

export default AdminApi