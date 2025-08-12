const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database/anime.db');

console.log('🗑️ Eliminando base de datos existente...');

// Eliminar la base de datos si existe
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('✅ Base de datos eliminada');
}

console.log('🔄 Creando nueva base de datos...');

const db = new sqlite3.Database(dbPath);

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log('📋 Creando tablas...');
      
      // Tabla de usuarios
      db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        premium_access_status TEXT DEFAULT 'free',
        premium_access_end_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) console.error('Error creando tabla users:', err);
        else console.log('✅ Tabla users creada');
      });

      // Tabla de opciones de donación
      db.run(`CREATE TABLE subscription_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        duration_days INTEGER NOT NULL,
        features TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) console.error('Error creando tabla subscription_plans:', err);
        else console.log('✅ Tabla subscription_plans creada');
      });

      // Tabla de donaciones
      db.run(`CREATE TABLE subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        plan_id INTEGER NOT NULL,
        start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        end_date DATETIME NOT NULL,
        status TEXT DEFAULT 'active',
        payment_method TEXT,
        amount_paid REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (plan_id) REFERENCES subscription_plans (id)
      )`, (err) => {
        if (err) console.error('Error creando tabla subscriptions:', err);
        else console.log('✅ Tabla subscriptions creada');
      });

      // Tabla de anime
      db.run(`CREATE TABLE anime (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        genre TEXT,
        year INTEGER,
        episodes INTEGER,
        status TEXT,
        rating REAL DEFAULT 0,
        image_url TEXT,
        video_url TEXT,
        requires_premium BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) console.error('Error creando tabla anime:', err);
        else console.log('✅ Tabla anime creada');
      });

      // Tabla de favoritos
      db.run(`CREATE TABLE favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        anime_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (anime_id) REFERENCES anime (id)
      )`, (err) => {
        if (err) console.error('Error creando tabla favorites:', err);
        else console.log('✅ Tabla favorites creada');
      });

      console.log('📝 Insertando datos de ejemplo...');

      // Insertar opciones de donación
      const samplePlans = [
        {
          name: 'Donación Pequeña',
          price: 1000.00,
          duration_days: 30,
          features: 'Acceso completo por 30 días, sin anuncios, calidad HD'
        },
        {
          name: 'Donación Mediana',
          price: 2500.00,
          duration_days: 90,
          features: 'Acceso completo por 90 días, sin anuncios, calidad HD'
        },
        {
          name: 'Donación Grande',
          price: 5000.00,
          duration_days: 180,
          features: 'Acceso completo por 180 días, sin anuncios, calidad 4K'
        },
        {
          name: 'Donación Extra Grande',
          price: 10000.00,
          duration_days: 365,
          features: 'Acceso completo por 1 año, sin anuncios, calidad 4K, descargas'
        }
      ];

      const insertPlans = db.prepare(`INSERT INTO subscription_plans 
        (name, price, duration_days, features) 
        VALUES (?, ?, ?, ?)`);

      samplePlans.forEach(plan => {
        insertPlans.run([
          plan.name,
          plan.price,
          plan.duration_days,
          plan.features
        ]);
      });

      insertPlans.finalize();
      console.log('✅ Opciones de donación insertadas');

      // Insertar animes
      const sampleAnime = [
        {
          title: 'Attack on Titan',
          description: 'La humanidad vive dentro de ciudades rodeadas por enormes muros debido a la amenaza de los Titanes. Eren Yeager y sus amigos se unen al ejército para luchar contra estos gigantes.',
          genre: 'Acción, Drama, Fantasía',
          year: 2013,
          episodes: 25,
          status: 'Completado',
          rating: 9.0,
          image_url: 'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Attack+on+Titan',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 1
        },
        {
          title: 'Death Note',
          description: 'Un estudiante brillante encuentra un cuaderno sobrenatural que le permite matar a cualquiera cuyo nombre escriba. Una batalla psicológica entre el bien y el mal.',
          genre: 'Suspenso, Psicológico, Thriller',
          year: 2006,
          episodes: 37,
          status: 'Completado',
          rating: 8.9,
          image_url: 'https://via.placeholder.com/300x400/4ecdc4/ffffff?text=Death+Note',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 1
        },
        {
          title: 'One Piece',
          description: 'Las épicas aventuras de Monkey D. Luffy y su tripulación de piratas en busca del legendario tesoro One Piece en los mares más peligrosos.',
          genre: 'Aventura, Comedia, Acción',
          year: 1999,
          episodes: 1000,
          status: 'En emisión',
          rating: 8.8,
          image_url: 'https://via.placeholder.com/300x400/45b7d1/ffffff?text=One+Piece',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 0
        },
        {
          title: 'Naruto',
          description: 'Un joven ninja huérfano busca convertirse en el líder de su aldea mientras descubre los secretos de su pasado y el poder del demonio sellado en su interior.',
          genre: 'Acción, Aventura, Fantasía',
          year: 2002,
          episodes: 720,
          status: 'Completado',
          rating: 8.7,
          image_url: 'https://via.placeholder.com/300x400/96ceb4/ffffff?text=Naruto',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 0
        },
        {
          title: 'Dragon Ball Z',
          description: 'Goku y sus amigos protegen la Tierra de amenazas alienígenas cada vez más poderosas mientras entrenan para alcanzar nuevos niveles de poder.',
          genre: 'Acción, Aventura, Fantasía',
          year: 1989,
          episodes: 291,
          status: 'Completado',
          rating: 8.6,
          image_url: 'https://via.placeholder.com/300x400/feca57/ffffff?text=Dragon+Ball+Z',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 0
        },
        {
          title: 'Demon Slayer',
          description: 'Tanjiro Kamado se convierte en un cazador de demonios para salvar a su hermana y vengar a su familia.',
          genre: 'Acción, Fantasía, Drama',
          year: 2019,
          episodes: 26,
          status: 'Completado',
          rating: 8.5,
          image_url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=600&fit=crop',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 1
        },
        {
          title: 'My Hero Academia',
          description: 'En un mundo donde casi todos tienen superpoderes, un joven sin poderes sueña con convertirse en el mayor héroe.',
          genre: 'Acción, Comedia, Superhéroes',
          year: 2016,
          episodes: 138,
          status: 'En emisión',
          rating: 8.4,
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 1
        },
        {
          title: 'Fullmetal Alchemist',
          description: 'Dos hermanos buscan la Piedra Filosofal para restaurar sus cuerpos después de un experimento fallido de alquimia.',
          genre: 'Aventura, Drama, Fantasía',
          year: 2003,
          episodes: 51,
          status: 'Completado',
          rating: 8.3,
          image_url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=600&fit=crop',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 1
        },
        {
          title: 'Hunter x Hunter',
          description: 'Gon Freecss se embarca en una aventura para convertirse en un cazador y encontrar a su padre.',
          genre: 'Aventura, Acción, Fantasía',
          year: 2011,
          episodes: 148,
          status: 'Completado',
          rating: 8.2,
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 1
        },
        {
          title: 'Bleach',
          description: 'Ichigo Kurosaki obtiene poderes de Shinigami y protege a los humanos de espíritus malignos.',
          genre: 'Acción, Fantasía, Sobrenatural',
          year: 2004,
          episodes: 366,
          status: 'Completado',
          rating: 8.1,
          image_url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=600&fit=crop',
          video_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          requires_premium: 1
        }
      ];

      const insertAnime = db.prepare(`INSERT INTO anime 
        (title, description, genre, year, episodes, status, rating, image_url, video_url, requires_premium) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

      sampleAnime.forEach(anime => {
        insertAnime.run([
          anime.title,
          anime.description,
          anime.genre,
          anime.year,
          anime.episodes,
          anime.status,
          anime.rating,
          anime.image_url,
          anime.video_url,
          anime.requires_premium
        ]);
      });

      insertAnime.finalize();
      console.log('✅ Animes insertados');
    });

    db.close((err) => {
      if (err) {
        console.error('❌ Error cerrando base de datos:', err);
        reject(err);
      } else {
        console.log('🎉 Base de datos recreada exitosamente');
        resolve();
      }
    });
  });
};

initializeDatabase().then(() => {
  console.log('✅ Proceso completado');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
