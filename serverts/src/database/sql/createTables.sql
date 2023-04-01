DROP TABLE IF EXISTS avantropometrica;
DROP TABLE IF EXISTS compcorp;
DROP TABLE IF EXISTS pacientes;

CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    sexo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    celular VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    data_nascimento VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT NOW()
);

CREATE TABLE avantropometrica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    estatura INT NOT NULL,
    comprimento_pe INT NOT NULL,
    altura_ombro INT NOT NULL,
    largura_ombro INT NOT NULL,
    envergadura INT NOT NULL,
    altura_quadril INT NOT NULL,
    largura_quadril INT NOT NULL,
    altura_joelho INT NOT NULL,
    altura_tornozelo INT NOT NULL,
    data_avaliacao DATETIME DEFAULT NOW(),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE TABLE compcorp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    massa INT NOT NULL,
    imc INT NOT NULL,
    gordura_corporal INT NOT NULL,
    gordura_visceral INT NOT NULL,
    metabolismo_basal INT NOT NULL,
    musculos_esqueleticos INT NOT NULL,
    idade_corporal INT NOT NULL,
    data_avaliacao DATETIME DEFAULT NOW(),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);