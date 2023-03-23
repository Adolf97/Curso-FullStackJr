Promise.resolve(2)
    .then(valor => valor + 1); // 2
// Estas promesas pueden irse "encadenando", es decir, que puedes sumarle o restarle
Promise.resolve(valor)
    .then(valor => console.log(valor)); // 3

/////CATCH
Promise.reject(2) // Con el .reject lo que hacemos es que se salte hasta el catch
    .catch(e => console.error(e)); // Esto nos imprime un mensaje de error en la consola