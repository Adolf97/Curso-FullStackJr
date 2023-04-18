# Pasos a seguir:

Para poder hacer la aplicación de mensajería, lo primero es instalar las dependencias necesarias:
```
npm i -S express dotenv @sendgrid/mail
```

Cada dependencia servirá para algo en específico:
* Express: Para poder crear la aplicación en sí.
* dotenv: Para poder importar una variable de entorno a nuestra aplicación, y poder usarla en sendgrid.
###### Hay que recordar que los archivos .env deben ser puestos en el archivo .gitignore, para evitar problemas de seguridad.
* sendgrid: Es una página que permite enviar correos, desde el correo verificado que hayamos puesto.