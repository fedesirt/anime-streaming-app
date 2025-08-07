const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'anime.db'));

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log('📋 Creando tablas...');
      
      // Tabla de usuarios
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        subscription_status TEXT DEFAULT 'free',
        subscription_end_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) console.error('Error creando tabla users:', err);
        else console.log('✅ Tabla users creada');
      });

      // Tabla de planes de suscripción
      db.run(`CREATE TABLE IF NOT EXISTS subscription_plans (
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

      // Tabla de suscripciones
      db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
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
      db.run(`CREATE TABLE IF NOT EXISTS anime (
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
        requires_subscription BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) console.error('Error creando tabla anime:', err);
        else console.log('✅ Tabla anime creada');
      });

      // Tabla de temporadas
      db.run(`CREATE TABLE IF NOT EXISTS seasons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        anime_id INTEGER NOT NULL,
        season_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        episode_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (anime_id) REFERENCES anime (id)
      )`, (err) => {
        if (err) console.error('Error creando tabla seasons:', err);
        else console.log('✅ Tabla seasons creada');
      });

      // Tabla de episodios
      db.run(`CREATE TABLE IF NOT EXISTS episodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        anime_id INTEGER NOT NULL,
        season_id INTEGER NOT NULL,
        episode_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        duration INTEGER DEFAULT 24,
        video_url TEXT,
        thumbnail_url TEXT,
        requires_subscription BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (anime_id) REFERENCES anime (id),
        FOREIGN KEY (season_id) REFERENCES seasons (id)
      )`, (err) => {
        if (err) console.error('Error creando tabla episodes:', err);
        else console.log('✅ Tabla episodes creada');
      });

      // Tabla de favoritos
      db.run(`CREATE TABLE IF NOT EXISTS favorites (
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

      // Tabla de historial de reproducción
      db.run(`CREATE TABLE IF NOT EXISTS watch_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        episode_id INTEGER NOT NULL,
        progress REAL DEFAULT 0,
        completed BOOLEAN DEFAULT 0,
        last_watched DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (episode_id) REFERENCES episodes (id)
      )`, (err) => {
        if (err) console.error('Error creando tabla watch_history:', err);
        else console.log('✅ Tabla watch_history creada');
      });

      console.log('📝 Insertando datos de ejemplo...');

      // Insertar planes de suscripción
      const samplePlans = [
        {
          name: 'Plan Gratuito',
          price: 0.00,
          duration_days: 0,
          features: 'Acceso limitado a contenido básico'
        },
        {
          name: 'Plan Premium Mensual',
          price: 3500.00,
          duration_days: 30,
          features: 'Acceso completo a todo el catálogo, sin anuncios, calidad HD'
        },
        {
          name: 'Plan Premium Anual',
          price: 25000.00,
          duration_days: 365,
          features: 'Acceso completo a todo el catálogo, sin anuncios, calidad 4K, descargas'
        }
      ];

      const insertPlans = db.prepare(`INSERT OR IGNORE INTO subscription_plans 
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
      console.log('✅ Planes de suscripción insertados');

      // Insertar animes
      const sampleAnime = [
        {
          title: 'Attack on Titan',
          description: 'La humanidad vive dentro de ciudades rodeadas por enormes muros debido a la amenaza de los Titanes, gigantes humanoides que devoran humanos. Eren Yeager y sus amigos se unen al ejército para luchar contra esta amenaza.',
          genre: 'Acción, Drama, Fantasía',
          year: 2013,
          episodes: 25,
          status: 'Completado',
          rating: 9.0,
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center',
          video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          requires_subscription: 1
        },
        {
          title: 'Death Note',
          description: 'Un estudiante encuentra un cuaderno sobrenatural que le permite matar a cualquiera cuyo nombre escriba en él. Comienza a usarlo para crear un mundo perfecto, pero un detective genio intenta detenerlo.',
          genre: 'Suspenso, Psicológico, Thriller',
          year: 2006,
          episodes: 37,
          status: 'Completado',
          rating: 8.9,
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center',
          video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          requires_subscription: 1
        },
        {
          title: 'One Piece',
          description: 'Las épicas aventuras de Monkey D. Luffy y su tripulación de piratas en busca del legendario tesoro One Piece en los mares más peligrosos.',
          genre: 'Aventura, Comedia, Acción',
          year: 1999,
          episodes: 1000,
          status: 'En emisión',
          rating: 8.8,
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center',
          video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          requires_subscription: 0
        },
        {
          title: 'Naruto',
          description: 'Un joven ninja huérfano busca convertirse en el líder de su aldea mientras descubre los secretos de su pasado y el poder del demonio sellado en su interior.',
          genre: 'Acción, Aventura, Fantasía',
          year: 2002,
          episodes: 720,
          status: 'Completado',
          rating: 8.7,
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center',
          video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          requires_subscription: 0
        },
        {
          title: 'Dragon Ball Z',
          description: 'Goku y sus amigos protegen la Tierra de amenazas alienígenas cada vez más poderosas mientras entrenan para alcanzar nuevos niveles de poder.',
          genre: 'Acción, Aventura, Fantasía',
          year: 1989,
          episodes: 291,
          status: 'Completado',
          rating: 8.6,
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center',
          video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          requires_subscription: 0
        }
      ];

      const insertAnime = db.prepare(`INSERT OR IGNORE INTO anime 
        (title, description, genre, year, episodes, status, rating, image_url, video_url, requires_subscription) 
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
          anime.requires_subscription
        ]);
      });

      insertAnime.finalize();
      console.log('✅ Animes insertados');

      // Insertar temporadas y episodios para Attack on Titan
      db.run(`INSERT OR IGNORE INTO seasons (anime_id, season_number, title, description, episode_count) VALUES (1, 1, 'Temporada 1', 'La primera temporada de Attack on Titan', 25)`, (err) => {
        if (err) console.error('Error insertando temporada:', err);
        else {
          console.log('✅ Temporada 1 de Attack on Titan insertada');
          
          // Insertar episodios para Attack on Titan
          const insertEpisodes = db.prepare(`INSERT OR IGNORE INTO episodes 
            (anime_id, season_id, episode_number, title, description, video_url, requires_subscription) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`);

          for (let i = 1; i <= 25; i++) {
            insertEpisodes.run([
              1, // anime_id
              1, // season_id
              i, // episode_number
              `Episodio ${i}`,
              `Descripción del episodio ${i} de Attack on Titan`,
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              1 // requires_subscription
            ]);
          }
          insertEpisodes.finalize();
          console.log('✅ Episodios de Attack on Titan insertados');
        }
      });

      // Insertar temporadas y episodios para Death Note
      db.run(`INSERT OR IGNORE INTO seasons (anime_id, season_number, title, description, episode_count) VALUES (2, 1, 'Temporada 1', 'La temporada completa de Death Note', 37)`, (err) => {
        if (err) console.error('Error insertando temporada:', err);
        else {
          console.log('✅ Temporada 1 de Death Note insertada');
          
          // Insertar episodios para Death Note
          const insertEpisodes = db.prepare(`INSERT OR IGNORE INTO episodes 
            (anime_id, season_id, episode_number, title, description, video_url, requires_subscription) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`);

          for (let i = 1; i <= 37; i++) {
            insertEpisodes.run([
              2, // anime_id
              2, // season_id
              i, // episode_number
              `Episodio ${i}`,
              `Descripción del episodio ${i} de Death Note`,
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              1 // requires_subscription
            ]);
          }
          insertEpisodes.finalize();
          console.log('✅ Episodios de Death Note insertados');
        }
      });

      // Insertar temporadas y episodios para One Piece
      db.run(`INSERT OR IGNORE INTO seasons (anime_id, season_number, title, description, episode_count) VALUES (3, 1, 'Saga East Blue', 'La primera saga de One Piece', 61)`, (err) => {
        if (err) console.error('Error insertando temporada:', err);
        else {
          console.log('✅ Temporada 1 de One Piece insertada');
          
          // Insertar episodios para One Piece
          const insertEpisodes = db.prepare(`INSERT OR IGNORE INTO episodes 
            (anime_id, season_id, episode_number, title, description, video_url, requires_subscription) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`);

          for (let i = 1; i <= 61; i++) {
            insertEpisodes.run([
              3, // anime_id
              3, // season_id
              i, // episode_number
              `Episodio ${i}`,
              `Descripción del episodio ${i} de One Piece`,
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              0 // requires_subscription
            ]);
          }
          insertEpisodes.finalize();
          console.log('✅ Episodios de One Piece insertados');
          
          // Cerrar la base de datos después de que todas las operaciones se completen
          db.close((err) => {
            if (err) {
              console.error('❌ Error cerrando base de datos:', err);
              reject(err);
            } else {
              console.log('🎉 Base de datos inicializada correctamente');
              resolve();
            }
          });
        }
      });
    });
  });
};

module.exports = { initializeDatabase }; 