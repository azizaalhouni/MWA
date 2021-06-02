


    console.log("Start");
    async function asyncFib(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    const prevValues = await Promise.all([asyncFib(n - 1), asyncFib(n - 2)]);
    
    return prevValues[0] + prevValues[1];
  }
  
// asyncFib(10).then(function(n){console.log(n)})
asyncFib(10).then(n=>console.log(n));
console.log("End");

//   const delay = fn => new Promise(r => setTimeout(() => r(fn()), 100))

// const isConstant = n => delay(() => n < 2)

// const fibo = async n => {
//   if (await isConstant(n)) return n === 0 ? 0 : 1
//   const [prev1, prev2] = await Promise.all([fibo(n - 1), fibo(n - 2)])
//   return delay(() => prev1 + prev2)
// }

// fibo(10).then(n => console.log(n)) 