var square = x => x * x; // var square = (x) => x * x;

console.log(square(10));

var user = {
    name: 'Who',
    sayHi: () => {
        // this, в случае со стрелочной функцией, не будет в области объекта
        // это будет глобальный объект
        console.log(arguments);
        console.log(`Hi. I am ${this.name}`);
    },
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi. I am ${this.name}`);
    }
};

user.sayHi(1, 2, 'foo');
user.sayHiAlt(1, 2, 'foo');
