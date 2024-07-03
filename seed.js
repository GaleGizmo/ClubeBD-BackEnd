const mongoose = require('mongoose');
const Comic = require('./src/api/comics/comic.model');  // Asumiendo que el modelo de comic está en la carpeta models
require("dotenv").config();

const URL_DB = process.env.DB_URL;
const comics = [
  {
    title: 'Batman: Año 1',
    writers: ['Frank Miller'],
    artists: ['David Mazzucchelli'],
    colorists: ['Richmond Lewis'],
    publisher: 'DC Comics',
    published_date: new Date('1987-02-01'),
    genres: ['Superheroes', 'Noir'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978694/comics/Batman-Year_One__cover_u4gvbe.jpg',
    synopsis: 'Retrata o primeiro ano de Bruce Wayne coma Batman e a sua contra contra a corrupción en Gotham.',
    pages: 96,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'La ciudad de cristal',
    writers: ['Paul Auster', 'Paul Karasik'],
    artists: ['David Mazzucchelli'],
    colorists: [],
    publisher: 'Navona Editorial',
    published_date: new Date('1985-01-01'),
    genres: [ 'Misterio'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978703/comics/la-ciudad-de-cristal-navona_iwq72z.jpg',
    synopsis: 'Daniel Quinn, un escritor de novelas policíacas, recibe unha chamada destinada a un detective chamado Paul Auster, e decide facerse pasar por el.',
    pages: 128,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'La espera',
    writers: ['Keum Suk Gendry-Kim'],
    artists: ['Keum Suk Gendry-Kim'],
    colorists: [],
    publisher: 'Reservoir Books',
    published_date: new Date('2020-01-01'),
    genres: [ 'Histórica'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978695/comics/la-espera_vphzk7.jpg',
    synopsis: 'A historia de Gwija, unha muller de 92 anos que vive en Corea do Sur, separada do seu fillo maior durante a guerra de Corea. O cómic reconstrue o trauma das familias separadas pola guerra.',
    pages: 256,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Género Queer',
    writers: ['Maia Kobabe'],
    artists: ['Maia Kobabe'],
    colorists: [],
    publisher: 'Oni Press',
    published_date: new Date('2019-05-28'),
    genres: ['Autobiografía',  'LGBTQ+'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978695/comics/gender-queer-a-memoir-9781549304002_lg_qrdfvc.jpg',
    synopsis: 'Autobiografía gráfica que narra a viaxe de Maia Kobabe dende a adolescencia ata a adultez e a súa exploración da identidade de xénero e a sexualidade, identificándose fora do binario de xénero.',
    pages: 240,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'El gran poder del Chninkel',
    writers: ['Jean Van Hamme'],
    artists: ['Grzegorz Rosiński'],
    colorists: [],
    publisher: 'Norma Editorial',
    published_date: new Date('1986-01-01'),
    genres: ['Fantasía', 'Ciencia Ficción', 'Satírico'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978700/comics/thumb_5283_albumes_big_jhb2qg.jpg',
    synopsis: 'J’on, pertencente á raza dos chninkels, é elexido por U’n, o creador dos mundos, para poñer fin a unha guerra eterna entre os Tres Inmortais. Dotado dun Gran Poder, convírtese nun Mesías que cambiará o curso do mundo para sempre.',
    pages: 184,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Estamos todas bien',
    writers: ['Ana Penyas'],
    artists: ['Ana Penyas'],
    colorists: [],
    publisher: 'Salamandra Graphic',
    published_date: new Date('2017-01-01'),
    genres: ['Histórica', 'Vida cotiá'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978695/comics/estamostodas_vyhtmm.jpg',
    synopsis: 'Unha homenaxe gráfica ás mulleres imprescindibles na vida da autora. Relata as historias das súas aboas, Maruja e Herminia, e a súa vida durante a posguerra e a dictadura de Franco.',
    pages: 176,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Habibi',
    writers: ['Craig Thompson'],
    artists: ['Craig Thompson'],
    colorists: [],
    publisher: 'Astiberri',
    published_date: new Date('2011-01-01'),
    genres: ['Fantasía', 'Relixión', ],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978699/comics/habibi_castellano_xzoi7v.jpg',
    synopsis: 'Narra a historia de Dodola e Zam, dou nenos escravos que escapan y crecen xuntos nunha paisaxe islámica ficticia. O cómic aborda temas coma o amor, a relixión, a pobreza ou a supervivencia.',
    pages: 672,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Hoy no es el día',
    writers: ['Josune Urrutia Asua'],
    artists: ['Josune Urrutia Asua'],
    colorists: [],
    publisher: 'Astiberri',
    published_date: new Date('2022-01-01'),
    genres: ['Autobiografía', 'Feminismo'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978695/comics/hoynoeseldia_anvzaf.jpg',
    synopsis: 'Cómic que relata a experiencia persoal da autora co cancro, así como as historias de seis mulleres, algunhas artistas e outras doutros ámbitos, que tamén o padeceron. Unha homenaxe a como transformaron a súa enfermedade en arte e unha reflexión sobre a relación entre a creación artística e a enfermedade.',
    pages: 224,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Malas ventas',
    writers: ['Alex Robinson'],
    artists: ['Alex Robinson'],
    colorists: [],
    publisher: 'Astiberri',
    published_date: new Date('2012-01-01'),
    genres: ['Comedia', 'Drama'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978699/comics/malasventasverde_rvovt1.jpg',
    synopsis: 'Sigue a vida de Sherman, un aspirante a escritor que traballa nunha librería, e a súa relación con amigos e colegas en Nova Iorke. Unha narrativa sobre as pequenas loitas diarias e ls relacións interpersoais.',
    pages: 608,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Mayor Fatal: El garaje hermético',
    writers: ['Moebius'],
    artists: ['Moebius'],
    colorists: [],
    publisher: 'Norma Editorial',
    published_date: new Date('1988-01-01'),
    genres: ['Fantasía', 'Ciencia Ficción'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978695/comics/mayor_fatal_fiy8qn.jpg',
    synopsis: 'O Maior Grubert controla un asteroide con varios mundos superpostos dende a súa nave espacial, o Ciguri. A obra destaca pola improvisación e a riqueza visual e conceptual.',
    pages: 96,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Nacido salvaje',
    writers: ['Tiitu Takalo'],
    artists: ['Tiitu Takalo'],
    colorists: [],
    publisher: 'ECC Ediciones',
    published_date: new Date('2021-01-01'),
    genres: ['Autobiografía'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978695/comics/cubierta_nacido_salvaje_WEB_kxwa4e.jpg',
    synopsis: 'Unha autobiografía que narra a vida da autora e a súa relación coa natureza e a sociedade.',
    pages: 168,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Soy la malinche',
    writers: ['Alicia Jaraba'],
    artists: ['Alicia Jaraba'],
    colorists: [],
    publisher: 'Nuevo Nueve',
    published_date: new Date('2022-01-01'),
    genres: ['Histórica'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978686/comics/AJ-Soy-la-Malinche-cover01FITXA_nzqgoa.jpg',
    synopsis: 'A historia da Malinche, unha figura clave na conquista de México, dende a súa perspectiva, abordando a súa vida e o seu papel na historia.',
    pages: 224,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Subnormal',
    writers: ['Fernando Llor'],
    artists: ['Miguel Porto'],
    colorists: [],
    publisher: 'Panini',
    published_date: new Date('2020-01-01'),
    genres: ['Autobiográfica'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978699/comics/ssubn001_1_x7jyaj.jpg',
    synopsis: 'Basado na historia real de Iñaki Zubizarreta, un xogador de baloncesto que sufriu acoso escolar na súa infancia e adolescencia.',
    pages: 128,
    average_rating: 0,
    ratings: [],
    comments: []
  },
  {
    title: 'Top 10',
    writers: ['Alan Moore'],
    artists: ['Gene Ha', 'Zander Cannon'],
    colorists: [],
    publisher: "America's Best Comics",
    published_date: new Date('2001-01-01'),
    genres: ['Superheroes', 'Ciencia Ficción'],
    cover: 'https://res.cloudinary.com/dwv0trjwd/image/upload/v1718978678/comics/220px-Top_10_1_qdotw3.jpg',
    synopsis: 'Segue as vidas e casos do departamento de policía nunha cidade onde tódolos habitantes teñen superpoderes.',
    pages: 352,
    average_rating: 0,
    ratings: [],
    comments: []
  }

];

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful');
    return Comic.insertMany(comics);
  })
  .then(() => {
    console.log('Comics seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    mongoose.connection.close();
  });
