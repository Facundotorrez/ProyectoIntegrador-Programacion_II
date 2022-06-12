CREATE SCHEMA Basededatos;
USE Basededatos;

CREATE TABLE usuarios (
id_usuario INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
nombre_usuario VARCHAR(100),
email VARCHAR(100) UNIQUE NOT NULL,
contraseña VARCHAR(100) NOT NULL,
foto_perfil VARCHAR (255) NOT NULL,
fecha DATETIME,
seguido VARCHAR(255),
seguidor VARCHAR(255),
created_at DATETIME,
updated_at DATETIME
);

CREATE TABLE productos (
id_producto INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
titulo VARCHAR(100),
descripcion VARCHAR (450),
id_usuario INT,
FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
createdAt DATETIME,
updatedAt DATETIME
);

CREATE TABLE comentarios (
    id_comentario INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    comentario VARCHAR(450) ,
    id_producto INT,
    id_usuario INT,
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto), 
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    createdAt DATETIME,
    updatedAt DATETIME
);

CREATE TABLE seguidores(
    id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    seguidor_id INT,
    seguido_id INT,
    FOREIGN KEY (seguidor_id) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (seguido_id) REFERENCES usuarios (id_usuario) 
);

INSERT INTO usuarios 
VALUES (DEFAULT, 'FacundoTorrez' ,'Ftorrez@udesa.edu.ar', 'Facundo123',NULL, '2001-09-26', '1254', '709', '2022-06-09', '2022-06-09'),
(DEFAULT, 'JosefinaFrugoni' ,'JFrugoni@udesa.edu.ar', 'Jose123', NULL, '2001-02-13', '2890', '789', '2022-06-09', '2022-06-09'),
(DEFAULT, 'AleDH' ,'Avivone@udesa.edu.ar', 'AlejandroDH',NULL, '1980-03-05', '469', '320', '2022-06-09', '2022-06-09'),
(DEFAULT, 'AnaMaidana' ,'Amaidana@udesa.edu.ar', 'DigitalHouse', NULL, '1989-04-20', '249', '199', '2022-06-09', '2022-06-09');

INSERT INTO productos 
VALUES (DEFAULT, 'Padre Rico Padre Pobre', ' libro obligado para aprender de finanzas personales, ya que explica inteligentes maneras de escapar de este circulo vicioso, en el que las personas trabajan muy duro toda su vida para otros, pero aún así no logran ahorrar nada.', NULL , '2022-06-09','2022-06-09'),
(DEFAULT, 'El método Lean Startup', 'El Lean Startup: cómo los emprendedores de hoy utilizan la innovación continua para crear empresas radicalmente exitosas es un libro de Eric Ries que describe su propuesta de estrategia Lean Startup para empresas de nueva creación.', NULL , '2022-06-09','2022-06-09'),
(DEFAULT, 'Romeo y Julieta','Romeo y Julieta ​ es una tragedia del dramaturgo inglés William Shakespeare. Cuenta la historia de dos jóvenes que, a pesar de la oposición de sus familiares, rivales entre sí, deciden casarse.', NULL , '2022-06-09','2022-06-09'),
(DEFAULT, 'El camino del artista: un sendero espiritual hacia la creatividad', 'La mayoría de nosotros anhelamos ser más creativos y muchos creemos que conseguir serlo es imposible porque en realidad no lo somos. Este planteamiento es erróneo y lo único que provoca es que nuestra creatividad se quede dormida en nuestro interior junto a nuestra verdadera esencia.', NULL , '2022-06-09','2022-06-09');

INSERT INTO comentarios
VALUES (DEFAULT, 'Este libro ha sido uno de mis favoritos. Lo he leído 3 veces. Su contenido tiene gran riqueza para autoconocerse más y mejor. Ha sido de gran utilidad en mi vida. Lo recomiendo ampliamente. Felicidades a los autores.', NULL, NULL,'2022-06-09', '2022-06-09'),
(DEFAULT, 'Este libro me cambió la vida. ¡Absolutamente recomendado!', NULL, NULL,'2022-06-09', '2022-06-09'),
(DEFAULT, 'Otro de mis favoritos!', NULL, NULL,'2022-06-09', '2022-06-09'),
(DEFAULT, 'La verdad es que esperaba más de este libro, no lo recomiendo.', NULL, NULL,'2022-06-09', '2022-06-09');

ALTER TABLE seguidores
ADD createdAt DATETIME,
ADD UpdatedAt DATETIME;

INSERT INTO seguidores
VALUES (DEFAULT, NULL,NULL, '2022-06-09', '2022-06-09'),
(DEFAULT, NULL,NULL, '2022-06-09', '2022-06-09'),
(DEFAULT, NULL,NULL, '2022-06-09', '2022-06-09'),
(DEFAULT, NULL,NULL, '2022-06-09', '2022-06-09');

ALTER TABLE productos
ADD foto_producto VARCHAR (255);