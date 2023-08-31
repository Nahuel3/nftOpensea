const express = require('express');
const axios = require('axios');


const app = express();
const port = 3000; // Puerto para el servidor

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Cambia '*' por tu dominio en producción
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Ruta para obtener los datos de OpenSea
app.get('/opensea-data', async (req, res) => {
  try {
    const contractAddress = '0x8ac865B70a212Af1825bdff9f0561a26A2a94b37';
    const apiEndpoint = `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&asset_contract_address=${contractAddress}`;

    const response = await axios.get(apiEndpoint);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener los datos de OpenSea:', error.message);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
