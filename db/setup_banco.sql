CREATE DATABASE agendamento_entregas;
USE agendamento_entregas;

CREATE TABLE fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    endereco VARCHAR(255),
    telefone VARCHAR(15) NOT NULL
);


CREATE TABLE lojas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(15)
);


CREATE TABLE notas_fiscais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_nf VARCHAR(50) NOT NULL UNIQUE,
    fornecedor_id INT,
    data_emissao DATE NOT NULL,
    xml_nf LONGTEXT NOT NULL, 
    -- Ver com o Murilo se LONGTEXT é melhor opção para o projeto,
    -- Pois em grandes quantidades de dados, pode ser mais lento.
    -- Tendo opção de dados em nuvem, pode ser uma opção mais otimizada.
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fornecedor_id INT NOT NULL,
    loja_id INT NOT NULL,
    nota_fiscal_id INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    status ENUM('PENDENTE', 'CONFIRMADO', 'CANCELADO') DEFAULT 'PENDENTE',
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id),
    FOREIGN KEY (loja_id) REFERENCES lojas(id),
    FOREIGN KEY (nota_fiscal_id) REFERENCES notas_fiscais(id)
);

SHOW TABLES;

INSERT INTO fornecedores (nome, cnpj, endereco, telefone)
 VALUES ('Seara', '12345678901234', 'Rua Antonio Gaspar, 5585', '35232323'),
        ('Coca-Cola', '5646412468465', 'Av Pio Salvador , 2323' , '35258968');

INSERT INTO lojas (nome, endereco, telefone)
 VALUES ('Parana Matriz 001', 'Rua Miguel Luiz Pereira, 1583', '35252001'),
        ('Parana Max 003', 'Av Irmãos Pereira , 1500', '35252003');

INSERT INTO notas_fiscais (numero_nf, fornecedor_id, data_emissao, xml_nf)
VALUES ('NF12345', 1, '2025-03-01', '<xml>...</xml>'),
       ('NF67890', 2, '2025-03-02', '<xml>...</xml>');

ALTER TABLE agendamentos
ADD COLUMN data_entrega DATE;
ALTER TABLE agendamentos
ADD COLUMN confirmado BOOLEAN DEFAULT FALSE;

INSERT INTO agendamentos (fornecedor_id, loja_id, data_agendamento, data_entrega, nota_fiscal_id, confirmado)
VALUES (1, 1, '2025-03-10 10:00:00', '2025-03-15', 1, FALSE),
       (2, 2, '2025-03-12 14:00:00', '2025-03-18', 2, TRUE);

DESCRIBE fornecedores;

DESC notas_fiscais;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('FORNECEDOR', 'FUNCIONARIO') NOT NULL
);

SELECT * FROM agendamentos;

