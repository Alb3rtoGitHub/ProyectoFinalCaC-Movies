CREATE DATABASE cac_movies;
use cac_movies;

CREATE TABLE registroUsuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255) ,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    fechaNacimiento DATE,
    pais varchar(255)
);

INSERT INTO registroUsuarios (nombre, apellido, email, password, fechaNacimiento, pais)
VALUES
('Juan', 'Perez', 'juan.perez@example.com', 'pass1', '1985-05-15', 'AR'),
('Maria', 'Gomez', 'maria.gomez@example.com', 'pass2', '1990-08-20', 'BO'),
('Carlos', 'Silva', 'carlos.silva@example.com', 'pass3', '1982-12-01', 'BR'),
('Ana', 'Fernandez', 'ana.fernandez@example.com', 'pass4', '1995-07-07', 'CH'),
('Luis', 'Martinez', 'luis.martinez@example.com', 'pass5', '1978-03-30', 'CO'),
('Juana', 'Jerez', 'juana.jerez@example.com', 'pass1', '1985-05-15', 'AR'),
('Mario', 'Pomez', 'mario.pomez@example.com', 'pass2', '1990-08-20', 'BO'),
('Carla', 'Silvia', 'carla.silvia@example.com', 'pass3', '1982-12-01', 'BR'),
('Anastasia', 'Hernandez', 'ana.hernandez@example.com', 'pass4', '1995-07-07', 'CH'),
('Luisa', 'Marti', 'luisa.marti@example.com', 'pass5', '1978-03-30', 'CO'),
('Joan', 'Prez', 'joan.prez@example.com', 'pass1', '1985-05-15', 'AR'),
('Marta', 'Gomez', 'marta.gomez@example.com', 'pass2', '1990-08-20', 'BO'),
('Charly', 'Silvatu', 'charly.silvatu@example.com', 'pass3', '1982-12-01', 'BR'),
('Antoine', 'Dupont', 'a.dupont@example.com', 'pass4', '1995-07-07', 'CH'),
('Lois', 'Wrangler', 'lois.wrangler@example.com', 'pass5', '1978-03-30', 'CO');

CREATE TABLE login (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50),
    contrasena VARCHAR(50)
    );

INSERT INTO login (email, contrasena) VALUES ('admin@prueba.com','admin'), ('alberto@prueba.com','admin');
    
CREATE TABLE peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    sinopsis TEXT,
    imagen VARCHAR(255),
    lenguaje VARCHAR(50)
);

INSERT INTO peliculas (titulo, sinopsis, imagen, lenguaje) VALUES
('Cadena perpetua', 'Una historia de esperanza y amistad en prisión', 'aclamada_1.jpg', 'Inglés'),
('El Padrino', 'La saga de una poderosa familia mafiosa', 'aclamada_2.jpg', 'Inglés'),
('El Padrino: Parte II', 'La continuación de la saga de la familia Corleone', 'aclamada_3.jpg', 'Inglés'),
('La lista de Schindler', 'Un empresario salva a refugiados durante el Holocausto', 'aclamada_4.jpg', 'Inglés'),
('12 hombres sin piedad', 'Miembros de un jurado deliberan sobre un juicio por asesinato', 'aclamada_5.jpg', 'Inglés'),
('El viaje de Chihiro', 'La aventura mágica de una niña en un mundo de espíritus', 'aclamada_6.jpg', 'Japonés'),
('El caballero oscuro', 'Batman se enfrenta a su mayor desafío contra el Joker', 'aclamada_7.jpg', 'Inglés'),
('Parásitos', 'Una familia pobre trama para ser empleada por una familia rica', 'aclamada_8.jpg', 'Coreano'),
('Milagros inesperados', 'Un guardia del corredor de la muerte encuentra a un prisionero con poderes sobrenaturales', 'aclamada_9.jpg', 'Inglés'),
('Forrest Gump', 'El viaje de un hombre simple a través de momentos definitorios de la historia de EE.UU.', 'aclamada_10.jpg', 'Inglés'),
('Pulp Fiction', 'Historias interconectadas de crimen en Los Ángeles', 'aclamada_11.jpg', 'Inglés'),
('El Señor de los Anillos', 'Una épica búsqueda para destruir un anillo poderoso y salvar la Tierra Media', 'aclamada_12.jpg', 'Inglés');