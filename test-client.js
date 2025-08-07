const axios = require('axios');

async function testClientServer() {
  try {
    console.log('🔍 Probando comunicación cliente-servidor...');
    
    // Simular las mismas peticiones que hace el cliente
    const popularResponse = await axios.get('http://localhost:5000/api/anime/popular/list');
    const recentResponse = await axios.get('http://localhost:5000/api/anime/recent/list');
    
    console.log('✅ Datos recibidos:');
    console.log('📺 Animes populares:', popularResponse.data.length);
    console.log('📺 Animes recientes:', recentResponse.data.length);
    
    console.log('\n🎬 Primeros 3 animes populares:');
    popularResponse.data.slice(0, 3).forEach((anime, index) => {
      console.log(`${index + 1}. ${anime.title} (${anime.rating})`);
    });
    
    console.log('\n🎉 ¡Comunicación exitosa!');
    
  } catch (error) {
    console.error('❌ Error en la comunicación:', error.message);
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📄 Data:', error.response.data);
    }
  }
}

testClientServer();





