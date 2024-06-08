db = new Mongo().getDB("cafe");

db.createCollection('eventos');
db.createCollection('carta');
db.createCollection('articulos');
db.createCollection('reservas');
db.createCollection('usuarios');

db.eventos.insert([{
  "_id": ObjectId("6656d7ec2ff90a73e1a320db")
  ,
  "data": {
    "Titulo": "Club de Lectura",
    "Descripcion": "Únete a nosotros en el Club de Lectura para una noche llena de intriga y suspense. En esta ocasión, discutiremos el bestseller 'La Sombra del Asesino' de Julia Navarro. ¡Comparte tus teorías y descubre quién es el asesino!",
    "Fecha": "15-06-2024 19:00",
    "Estado": "Pendiente",
    "Participantes": [
      "email1@ejemplo.com",
      "email2@ejemplo.com"
    ],
    "Organizador": "Librería La Tarara"
  }
},
{
  "_id": ObjectId("6656d8392ff90a73e1a320dd"),
  "data": {
    "Titulo": "Jam Session",
    "Descripcion": "Una experiencia única donde la música fluye libremente, sin setlists ni ensayos, solo la pasión por la música. Un grupo de músicos de diferentes estilos y géneros se reunen en el escenario y la música surge en el momento, con improvisaciones épicas y momentos de conexión entre los músicos y el público",
    "Fecha": "22-04-2024 22:00",
    "Estado": "Completado",
    "Participantes": [
      "email1@ejemplo.com",
      "email2@ejemplo.com"
    ],
    "Organizador": "The Lighthouse Music Group"
  }
},
{
  "_id": ObjectId("665742e32ff90a73e1a320df"),
  "data": {
    "Titulo": "Club de la Lucha",
    "Descripcion": "Primera regla del Club de la Lucha: no hablas del Club de la Lucha.<br>\nSegunda regla del Club de la Lucha: no hablas del Club de la Lucha.<br>\nTercera regla del Club de la Lucha: si alguien dice 'stop' o tiene una lesión, la lucha se detiene.<br>\nCuarta regla del Club de la Lucha: solo dos personas luchan a la vez.<br>\nQuinta regla del Club de la Lucha: solo luchas sin camisa.<br>\nSexta regla del Club de la Lucha: las luchas son sin límite de tiempo.<br>\nSéptima regla del Club de la Lucha: luchas hasta que alguien gane.<br>\nOctava y última regla del Club de la Lucha: si esta es tu primera noche en el Club de la Lucha, tienes que luchar.",
    "Fecha": "13-12-2024",
    "Estado": "Pendiente",
    "Participantes": [],
    "Organizador": "David Fincher"
  }
}]);

db.carta.insert([{
  "_id": ObjectId("6658c365e3c33e092c2fd0f5"),
  "data": {
    "Titulo": "Sinatra",
    "Precio": "20",
    "Descripcion": " Cóctail hecho a base de zumo de piña, menta, granadina y extracto de fruta de la pasión ",
    "Disponibilidad": true
  }
},
{
  "_id": ObjectId("6658c38de3c33e092c2fd0f6"),
  "data": {
    "Titulo": "Pink Floid",
    "Descripcion": "Batido artesanal de fresa con galleta acompañado por una bola de helado de nata",
    "Precio": "4.00",
    "Disponibilidad": true
  }
},
{
  "_id": ObjectId("6658c424e3c33e092c2fd0f7"),
  "data": {
    "Titulo": "Nat ting-llas",
    "Descripcion": "Natillas de receta clásica con toppings personalizables",
    "Precio": "2.50",
    "Disponibilidad": true
  }
},
{
  "_id": ObjectId("6658c435e3c33e092c2fd0f8"),
  "data": {
    "Titulo": "Café con leche",
    "Descripcion": "Café con leche simple\nCon opción para llevar",
    "Precio": "1",
    "Disponibilidad": true
  }
},
{
  "_id": ObjectId("665746b42ff90a73e1a320e6"),
  "data": {
    "Descripcion": "Tabla de tartaletas de crema de chocolate, limón y pistacho \<br> Opción sin gluten",
    "Disponibilidad": true,
    "Precio": "5",
    "Titulo": "Air, Soil and Water"
  }
},
{
  "_id": ObjectId("66607aaa39622c854c93c223"),
  "data": {
    "Descripcion": "Té de Limón con notas de canela acompañado por unas pastas exquisitas pastas artesanales de té verde",
    "Disponibilidad": true,
    "Precio": "5",
    "Titulo": "John Lemon"
  }
},
{
  "_id": ObjectId("6658b654e3c33e092c2fd0ee"),
  "data": {
    "Titulo": "Coolio",
    "Descripcion": "Granizado de café con leche coronado por galletas de barquillo",
    "Precio": "3.50",
    "Disponibilidad": true
  }
},
{
  "_id": ObjectId("66608395d2247307f3bdb42a"),
  "data": {
    "Titulo": "Tarta de Lotus",
    "Precio": "4",
    "Descripcion": "Mondogno de lotus",
    "Disponibilidad": true
  }
}
]);

db.articulos.insert([
    {
      "_id": ObjectId("665ce0fab1de030d6c8812a5"),
      "data": {
        "Titulo": "Discovery",
        "Artista": "Daft Punk",
        "Release": "2001",
        "Estado": "Nuevo",
        "Foto": "https://i.scdn.co/image/ab67616d0000b27348905438b9c1153978d9fbf4",
        "Descripcion": "Discovery es el segundo álbum de estudio del dúo francés de música house Daft Punk, lanzado en marzo de 2001. Marcó un cambio en el sonido desde el Chicago house, género por el que eran conocidos, al disco, post-disco y house inspirado en el synthpop."
      }
    },
    {
      "_id": ObjectId("665ce3e2b1de030d6c8812a7"),
      "data": {
        "Titulo": "In the Heat of the Night",
        "Artista": "Imagination",
        "Release": "1982",
        "Estado": "Usado",
        "Foto": "https://i.scdn.co/image/ab67616d0000b27323e3de02327a72bcf7a1c5d3",
        "Descripcion": "'In the Heat of the Night' es el segundo álbum de estudio del grupo británico de música soul y funk Imagination, lanzado en septiembre de 1982. Este álbum consolidó el estilo distintivo del grupo, fusionando elementos de soul, funk y R&B con influencias del disco, lo que resultó en un sonido sensual y sofisticado. El álbum incluye éxitos como 'Just an Illusion' y 'Music and Lights', y es reconocido por su producción pulida y sus melodías pegajosas que capturan la esencia del sonido de los años 80."
      }
    },
    {
      "_id": ObjectId("665ce912b1de030d6c8812a9"),
      "data": {
        "Titulo": "Hotel California",
        "Artista": "Eagles",
        "Release": "1976",
        "Estado": "Con poco uso",
        "Foto": "https://i.scdn.co/image/ab67616d0000b2734637341b9f507521afa9a778",
        "Descripcion": "'Hotel California' es el quinto álbum de la banda estadounidense Eagles, lanzado en diciembre de 1976. Con una mezcla de rock y country, el álbum aborda temas de decadencia y exceso en la vida californiana. Incluye los éxitos 'Hotel California', 'New Kid in Town' y 'Life in the Fast Lane', y es reconocido por su producción meticulosa y armonías vocales distintivas."
      }
    },
    {
      "_id": ObjectId("66608d5309106bd8cb293ba4"),
      "data": {
        "Titulo": "The Car",
        "Estado": "Como Nuevo",
        "Foto": "https://i.scdn.co/image/ab67616d0000b27307823ee6237208c835802663",
        "Descripcion": "'The Car' es el séptimo álbum de Arctic Monkeys, lanzado en octubre de 2022. Presenta un sonido más sofisticado, con influencias de rock orquestal y baroque pop. Las letras introspectivas abordan temas de amor y nostalgia, destacándose por su producción detallada y el uso de cuerdas y elementos sinfónicos.",
        "Artista": "Arctic Monkeys",
        "Release": "2022"
      }
    }
]);

db.reservas.insert([{
  "_id": "asd_2024-06-06",
  "data": {
    "email": "asd",
    "fecha": "2024-06-06",
    "n_personas": "2",
    "estado": "Denegada"
  }
}]);

db.usuarios.insert([
  {
    "_id": ObjectId("666239da9fb45edacbae67cf"),
    "data": {
      "email": "1",
      "pssw": "$2b$05$IvWRNZLY.DaGncdZrfFXweV7yOcqFuELK8jq8ghuBrZEPXU8ZUX9u",
      "nombre": "",
      "tlf": ""
    }
  },
  {
    "_id": ObjectId("66623a019fb45edacbae67d0"),
    "data": {
      "email": "2",
      "pssw": "$2b$05$azeaf3zOX9qElBifVTPGFu7VcsMcaVckNe1vp.ltPQ.aMWe/b8ZRG",
      "nombre": "",
      "tlf": "",
      "admin": true
    }
  }
]);

db.usuarios.createIndex({"data.email": 1}, {unique : true})