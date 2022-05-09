const data ={  
    usuarios:{
        email : 'federico@gmial.com',
        nombreDeUsuario : 'Fede12',
        imagenPerfil : '/images/users/fede.jpeg',
    },

    libros: [{
        title:'Harry Potter y el cáliz de fuego',
        edition: 2018,
        description: 'Harry Potter y el cáliz de fuego es el cuarto libro de la serie literaria Harry Potter, escrita por la autora británica J. K. Rowling en 2000.',
        imagenProduct: '/images/products/harryPotter.png',
    },
        
    {
        title:'El señor de los anillos: El retorno del rey',
        edition: 2017,
        description: ' The Lord of the Rings: The Return of the King es la tercera película de la trilogía cinematográfica de El Señor de los Anillos, dirigida por Peter Jackson y basada en la tercera parte de la obra de J. R. R. Tolkien, El Señor de los Anillos.',
        imagenProduct:'/images/products/señordelosanillos.jpg',
    },
    {
        title:'El señor de los anillos: Las dos torres',
        edition: 2017,
        description: 'The Lord of the Rings: The Two Towers es una película basada en el segundo tomo de la novela El Señor de los Anillos, del escritor británico J. R. R. Tolkien. Es la secuela de La Comunidad del Anillo y precede a la última entrega de la serie, El retorno del Rey.',
        imagenProduct: '/images/products/lastorresdos.jpg',
    },
    {
        title:'Después',
        edition: 2021,
        description:'Después es una novela policial del escritor Stephen King. Fue publicada originalmente el 2 de marzo de 2021 en idioma inglés y el 21 de junio en idioma español. La novela entró en la lista de superventas del periódico The New York Times en el número 2',
        imagenProduct: '/images/products/despues.jpg',
    },
    {
        title:'Maze Runner',
        edition: 2018,
        description:'The Maze Runner, es una novela distópica escrita por el autor estadounidense James Dashner, como primer libro de la trilogía homónima. Fue publicado en octubre de 2009 por Delacorte Press, división de Random House Mondadori.',
        imagenProduct:'/images/products/mazerunner.jpg',
    },
    {
        title:'El cerebro del futuro',
        edition: 2018,
        description: 'Facundo Manes y Mateo Niro unen de nuevo sus fuerzas y nos presentan un sólido y minucioso trabajo en el que analizan los aspectos más relevantes que tendremos que afrontar de cara a un mañana que ya está entre nosotros, y aquellos otros a los que deberemos atender sin excepción para alcanzar una sociedad en la que el bienestar sea general. De este modo, desarrollan temas fundamentales como el papel que deben jugar en este contexto las neurociencias y el trabajo interdisciplinario; el impacto de las nuevas tecnologías en el cerebro; la neuroética y los límites que deberán establecerse frente a los avances científicos; la incidencia y los posibles tratamientos de las enfermedades mentales cada vez más propagadas; y una reflexión profunda acerca de las problemáticas sociales actuales y el rol de la ciencia para su resolución. Tras el enorme éxito de Usar el cerebro, Manes y Niro nos invitan en su nuevo libro a dar un paso más allá en esta magnífica aventura que significa entender el presente para vivir una «vida moderna» plena, desarrollada y humana.',
        imagenProduct:'/images/products/cerebrodelfuturo.jpg',
    },
    {
        title:'La casa de Hojas',
        edition: 2017,
        description: 'House of Leaves es la primera novela del autor estadounidense Mark Z. Danielewski, publicada en marzo de 2000 por Pantheon Books. Un éxito de ventas, se ha traducido a varios idiomas y le sigue una pieza complementaria, The Whalestoe Letters.',
        imagenProduct: '/images/products/losjuegos.jpg',

    },
    {
        title:'Bajo la misma estrella',
        edition: 2019,
        description: 'Bajo la misma estrella es una novela escrita por John Green, la sexta en su carrera como autor literario, publicada el 10 de enero de 2012.',
        imagenProduct: '/images/products/bajolamisma.jpg',
    },
    {
        title:'A ciegas',
        edition: 2018,
        description: 'A Ciegas es su primera novela y es un más que buen comienzo. Para aquellos que queráis encontrar información de primera mano sobre ella, el título original es Bird Box (Jaula para pájaros).',
        imagenProduct: 'images/products/aciegas.jpg',

    },
    {
        title:'Romeo y Julieta',
        edition: 2009,
        description: 'Cuenta la historia de dos jóvenes que, a pesar de la oposición de sus familiares, rivales entre sí, deciden casarse de forma ilegal y vivir juntos; sin embargo, la presión de esa rivalidad y una serie de fatalidades conducen a que la pareja elija el suicidio antes que vivir separados.',
        imagenProduct: 'images/products/romeoyjulieta.jpg',
    },
    {
        title:'A solas',
        edition: 2021,
        description: 'En el mundo actual y especialmente a partir de una cierta edad, parece que la soledad se entiende como un fracaso: estar soltero, divorciado o separado es algo que debe superarse a toda costa. Sin embargo, saber estar solo es en realidad un signo de madurez, de autonomía, de riqueza personal.',
        imagenProduct: 'images/products/asolas.jpg',
    },
    {
        title:'Ciudad de Papel',
        edition: 2016,
        description: 'Una joven desaparece dejando una serie de pistas que solo su mejor amigo de la infancia podrá descifrar... Una novela de John Green, el autor de Bajo la misma estrella. En su último año de instituto, Quentin no ha aprobado ni en popularidad ni en asuntos del corazón.',
        imagenProduct: '/images/products/ciudaddepapel.jpg',
    },
    {
        title:'It ends with us',
        autor:'Colleen Hoover',
        genre:'Romance',
        edition: 2021,
        editorial:'Bubok',
        language:'Ingles'
    },
    {
        title:'The Proposal',
        autor:'Jasmine Guillory',
        genre:'Romance',
        edition: 2017,
        editorial:'Bubok',
        language:'Ingles'
    },
    {
        title:'Dune',
        autor:'Frank Herbert',
        genre:'Ciencia Ficción',
        edition: 2019,
        editorial:'Círculo Rojo',
        language:'Español'
    },
    {
        title:'1984',
        autor:'George Orwell',
        genre:'Ciencia Ficción',
        edition: 2016,
        editorial:'Caligrama',
        language:'Español'
    },
    {
        title:'Fahrenheit 451',
        autor:'Ray Bradbury',
        genre:'Ciencia Ficción',
        edition: 2021,
        editorial:'Bubok',
        language:'Ingles'
    },
    {
        title:'El problema d los tres cuerpos',
        autor:'Liu Cixin',
        genre:'Ciencia Ficción',
        edition: 2018,
        editorial:'Círculo Rojo',
        language:'Español'
    },
    {
        title:'Enders game',
        autor:'Orson Scott Card',
        genre:'Ciencia Ficción',
        published: 2020,
        editorial:'Bubok',
        language:'Ingles'
    },
    {
        title:'Gullivers Travels',
        autor:'Jonathan Swift',
        genre:'Aventura',
        published: 2015,
        editorial:'Bubok',
        language:'Ingles'
    },
    {
        title:'Moby Dick',
        autor:'Herman Melville',
        genre:'Aventura',
        published: 2017,
        editorial:'Círculo Rojo',
        language:'Español'
    },
    {
        title:'Treasure Island',
        autor:'Jonathan Swift',
        genre:'Aventura',
        published: 2015,
        editorial:'Bubok',
        language:'Ingles'
    },
    {
        title:'Las minas del Rey Solomon',
        autor:'Rider Haggard',
        genre:'Aventura',
        published: 2017,
        editorial:'Círculo Rojo',
        language:'Español'
    },
    {
        title:'The Adventures of Huckleberry Finn',
        autor:'Mark Twain',
        genre:'Aventura',
        published: 2018,
        editorial:'Bubok',
        language:'Ingles'
    },
    {
        title:'Libro de Poemas',
        autor:'Federicoo García Lorca',
        genre:'Poesia',
        published: 2020,
        editorial:'Círculo Rojo',
        language:'Español'
    },
    {
        title:'Veinte poemas de amor y una canción desesperada',
        autor:'Pablo Neruda',
        genre:'Poesia',
        published: 2017,
        editorial:'Círculo Rojo',
        language:'Español'
    },
    {
        title:'Rimas y leyendas',
        autor:'Gustavo Adolfo Bécquer',
        genre:'Aventura',
        published: 2016,
        editorial:'Caligrama',
        language:'Español'
    },
    {
        title:'Poesia completa',
        autor:'Alejandra Pizarnik',
        genre:'Poesia',
        published: 2018,
        editorial:'Círculo Rojo',
        language:'Español'
    },
    {
        title:'Pillow Thoughts',
        autor:'Courtney Peppernell',
        genre:'Poesia',
        published: 2019,
        editorial:'Bubok',
        language:'Ingles'
    }
],

comentarios:[{
    nombre : 'Martina',
    opinion: 'Increible libro, brinda una experiencia inolvidable al lector',
    image: 'images/users/usuario 1.png',

},

{
    nombre : 'Florencia',
    opinion: 'Donde lo consigo?',
    image: '/images/users/usuario 2.png',
},

{
    nombre : 'Camila',
    opinion: 'Me gustó más el anterior',
    image: '/images/users/usuario 3.jpg',
},

{
    nombre : 'Juana',
    opinion: 'Excelente libro!! hay parte II?',
    image: '/images/users/usuario 4.jpg',
},

{
    nombre : 'Franco',
    opinion: 'Recomiendo este libro, es muy interesante!',
    image: '/images/users/usuario 5.jpg',
},

{
    nombre : 'Esteban',
    opinion: 'Para cuando la el segundo?',
    image: '/images/users/usuario 6.jpg',
}]
}
module.exports = data