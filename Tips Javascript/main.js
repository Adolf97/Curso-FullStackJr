const a = { b: 1 };
const b = a;
// Cuando asignamos valores de esta forma, ambos objetos van a ser iguales, incluso cuando más
// adelante uno de los 2 cambie. Ejemplo más abajo.
b === a; // True
b.c = 2;
// En este caso agregamos otro elemento a "b", que se llama "c", con un valor de 2, pero este elemento
// también se agregó a "a".
const c = { ...a };
// Con esta sintaxis, estamos creando un objeto a partir de "a", es decir, que va a tomar todos los
// elementos que ésta contenga, pero que va a ser independiente de ella.
c.d = 12;
c === a; // false
