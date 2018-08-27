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
        schoolId: 102,
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

// Wei has a x% in the class
const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        // define user 在这里的原因是为了让下面的function 可以access
        user = tempUser;
        return getGrade(user.schoolId);
    }).then((grades) => {
        return `${user.name}`;
    })
}

// async await

// these two are identical same 
() => {
    return new Promise((resolve, reject) => {
        resolve('Mike');
    })
}

const getStatusAlt = async (userId) => {
    // throw new Error('This is an error');
    // return 'Mike';
    const user = await getUser(userId);
    const grades = await getGrade(user.schoolId);
    
    console.log(user, grades);
}

// getUser(4).then((user) => {
//     console.log(user);    
// }).catch((e) => {
//     console.log(e);
// });

// getGrade(101).then((grades) => {
//     console.log(grades);
// }).catch((e) => {
//     console.log(e);
// });

// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });

getStatusAlt(123).then((name) => {
    console.log(name);
}).catch((e) => {
    console.log(e);
});
