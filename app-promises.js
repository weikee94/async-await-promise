const users = [
    {
        id: 1,
        name: 'Wei Kee',
        schoolId: 101,
    },
    {
        id: 2,
        name: 'Jackson',
        schoolId: 999,
    }
];

const grades = [
    {
        id: 1,
        schoolId: 101,
        grade: 86,
    },
    {
        id: 2,
        schoolId: 999,
        grade: 100,
    },
    {
        id: 3,
        schoolId: 101,
        grade: 80,
    }
];


// return a promise if resolve else reject and throw error
const getUser = (id) => {
    return new Promise((resolve, reject) => {
        // add the logic here 
        const user = users.find((user) => {
            return user.id === id;
        });

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    });
};

const getGrade = (schoolId) => {
    return new Promise((resolve, reject) => {
        // add logic here
        const grade = grades.filter((grade) => {
            return grade.schoolId === schoolId;
        });

        if (grade) {
            resolve(grade);
        } else {
            reject(`Unable to find grade with the school id of ${shoolId}`);
        }

        // method 2
        // resolve(grades.filter((grade) => grade.schoolId === schoolId));
    })
}

getUser(4).then((user) => {
    console.log(user);    
}).catch((e) => {
    console.log(e);
});

getGrade(101).then((grades) => {
    console.log(grades);
}).catch((e) => {
    console.log(e);
});