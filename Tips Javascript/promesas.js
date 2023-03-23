Promise.resolve(2)
    .then(valor => valor + 1); // 2
// Estas promesas pueden irse "encadenando", es decir, que puedes sumarle o restarle
Promise.resolve(valor)
    .then(valor => console.log(valor)); // 3