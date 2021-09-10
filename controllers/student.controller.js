const roleRigth = require('../controllers/role_rigth')

module.exports = {
    //GET /report/student
    student_table: async (req , res) => {
      //  res.send(200, "OKOK /report/student")
        try {
            const { user_id } = req.jwtDecode
            const rigth = await roleRigth.Rigth_permission(user_id, 'student', 'read:student')
            const role = roleRigth.whatRole(user_id)
            if (rigth) {
              res.status(200).send()
            } else {
                res.send(200, []);
            }
        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            res.send(400, err.message);
        }
    }
}

function value(number) {
    if (number === 1) {
        
    } else if (number === 2) {
        
    } else {
        return [
            {
                id: 1,
                name: 'John Doe',
                faculty_id: '123456',
                faculty: 'Engineering',
                field_id: '000456',
                field: 'Computer Engineering',
                role: 'admin',
                active: 1,
                updated: 'yyyy-mm-dd',
                created: 'yyyy-mm-dd'
            },
            {
                id: 2,
                name: 'Jane Doe',
                faculty_id: '123457',
                faculty: 'Engineering',
                field_id: '000457',
                field: 'Computer Engineering',
                role: 'professor',
                active: 1,
                updated: 'yyyy-mm-dd',
                created: 'yyyy-mm-dd'
            },
            {
                id: 3,
                name: 'Baby Doe',
                faculty_id: '123458',
                faculty: 'Science',
                field_id: '000458',
                field: 'Computer Science',
                role: 'professor',
                active: 1,
                updated: 'yyyy-mm-dd',
                created: 'yyyy-mm-dd'
            },
            {
                id: 4,
                name: 'Kid Doe',
                faculty_id: '123459',
                faculty: 'Science',
                field_id: '000459',
                field: 'Computer Science',
                role: 'student',
                active: 1,
                updated: 'yyyy-mm-dd',
                created: 'yyyy-mm-dd'
            },
            {
                id: 5,
                name: 'Anna Doe',
                faculty_id: '123460',
                faculty: 'Science',
                field_id: '000460',
                field: 'Mathematics',
                role: 'student',
                active: 1,
                updated: 'yyyy-mm-dd',
                created: 'yyyy-mm-dd'
            },
            {
                id: 6,
                name: 'the babadook',
                faculty_id: '',
                faculty: '',
                field_id: '',
                field: '',
                role: 'guest',
                active: 3,
                updated: 'yyyy-mm-dd',
                created: 'yyyy-mm-dd'
            },
        ]
    }
}