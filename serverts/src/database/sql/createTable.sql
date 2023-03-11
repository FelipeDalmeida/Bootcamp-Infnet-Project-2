DROP TABLE IF EXISTS notepads;

CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    sexo VARCHAR(255) NOT NULL,
    data_nascimento VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT NOW()
)