var square = x => x*x;

console.log(square(9));

var user = {
    name: "bunda",
    sayHi: () => {
        console.log(`hi ${this.name}`); //not binding with this and arguments
    },
    sayHello(){
        console.log(arguments);
        console.log(`hi ${this.name}`);
    }
}

user.sayHello(1,3,4,3);