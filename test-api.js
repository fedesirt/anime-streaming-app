const axios = require('axios');

async function testAPI() {
  try {
    console.log('🔍 Probando la API...');
    
    // Probar el endpoint principal
    const mainResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Endpoint principal:', mainResponse.data);
    
    // Probar el endpoint de animes populares
    const popularResponse = await axios.get('http://localhost:5000/api/anime/popular/list');
    console.log('✅ Animes populares:', popularResponse.data.length, 'animes encontrados');
    console.log('📺 Primer anime:', popularResponse.data[0]?.title);
    
    // Probar el endpoint de animes recientes
    const recentResponse = await axios.get('http://localhost:5000/api/anime/recent/list');
    console.log('✅ Animes recientes:', recentResponse.data.length, 'animes encontrados');
    console.log('📺 Primer anime:', recentResponse.data[0]?.title);
    
    console.log('\n🎉 ¡Todas las pruebas pasaron!');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📄 Data:', error.response.data);
    }
  }
}

testAPI();





