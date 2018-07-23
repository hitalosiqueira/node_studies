var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if(typeof a === "number" && typeof b === "number"){
                resolve(a + b);
            }else{
                reject("a and b must be numbers");
            }
        }, 1500);
    });
}

asyncAdd(5,7).then((result) => {
    console.log(result);
    return asyncAdd(result, 10);
}, (error) => {
    console.log(error);
}).then((result) => {
    console.log(result);
},(error) => {
    console.log(error);
});