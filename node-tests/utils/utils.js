var add = (a, b) => a + b;
var pow2 = (a) => a*a;

var asyncAdd = (a, b, callback) => {
    setTimeout(() =>{
        callback(a + b);
    }, 1000)
}

module.exports = {
    add,
    pow2,
    asyncAdd
}