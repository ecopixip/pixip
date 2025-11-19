#!/bin/bash
# Script de configuração completa do banco PIXIP Fase 1 + deploy rápido

DB_NAME="pixip_db"
DB_USER="postgres"
DB_PASSWORD="pixip123"
ADMIN_PASSWORD_HASH='$2b$10$paH1VR3l/kaf6Gg8YM2Se.DF.o4jWS/3KZID.YFdz8Rzk.VA0.8IS' # Substitua pelo hash real

echo "⚡ Criando banco de dados PIXIP: $DB_NAME"

sudo -u $DB_USER psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
sudo -u $DB_USER psql -c "CREATE DATABASE $DB_NAME;"

echo "📂 Conectando ao banco $DB_NAME e criando tabelas..."

sudo -u $DB_USER psql -d $DB_NAME <<EOF
-- Tabela leads
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela actions_history
CREATE TABLE actions_history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action_type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir admin inicial
INSERT INTO users (username, password_hash, email, role)
VALUES ('admin', '$ADMIN_PASSWORD_HASH', 'admin@pixip.com', 'admin');

-- Inserir leads de teste
INSERT INTO leads (name, email, phone, score)
VALUES ('João Silva', 'joao@email.com', '1111-1111', 80),
       ('Maria Souza', 'maria@email.com', '2222-2222', 95);
EOF

echo "✅ Banco de dados PIXIP Fase 1 criado com sucesso!"

# Opcional: instalar dependências backend e frontend
echo "📦 Instalando dependências backend e frontend..."
cd ../backend && npm install
cd ../frontend && npm install
cd ..

echo "⚡ Setup completo! Backend e frontend prontos para rodar."
