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
    },

    softDeleteStudent: function() {
        return this.rootUrl+`/admin/student`
    }

}

export default AdminApi