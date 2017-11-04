const users = [{
    id: 1,
    name: 'Ilia',
    schoolId: 10
}, {
    id: 2,
    name: 'Marta',
    schoolId: 79
}];

const grades = [{
    id: 1,
    schoolId: 10,
    grade: 98
}, {
    id: 2,
    schoolId: 79,
    grade: 67
}, {
    id: 1,
    schoolId: 10,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user)
        } else {
            reject(`Unable to find user with id: ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

// Promises chain.
const getStatus = (userId) => {
    let user;
    // this `user` variable is not available in the next chained promise
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(tempUser.schoolId);
    }).then((grades) => {
        let average = 0;
        
        if (grades.length > 0) {
            /**
             * First time `reduce` is execited, it will take first and the second
             * array elements, then `a` and `b` will be added and summ will be 
             * passed to the next iteration as `a` but `b` will be a third array
             * element.
             */
            average = grades.map((grage) => grage.grade).reduce((a, b) => a + b) / grades.length;
        }

        return `User ${user.name} has a ${average} in the class.`;  
    });
};

// async await
/**
 * async functions return promises by default.
 * throw new Error('yooooo'); - rejected promise will be returned
 * return 'tere'; - resolved promise will be returned
 */
const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    let average = 0;

    if (grades.length > 0) {
        /**
         * First time `reduce` is execited, it will take first and the second
         * array elements, then `a` and `b` will be added and summ will be 
         * passed to the next iteration as `a` but `b` will be a third array
         * element.
         */
        average = grades.map((grage) => grage.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `User ${user.name} has a ${average}% in the class.`;
};

getStatusAlt(1).then((status) => {
    console.log(status);
}).catch((err) => {
    console.log(err);
});

// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((err) => {
//     console.log(err);
// });