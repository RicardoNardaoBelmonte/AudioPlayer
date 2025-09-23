import Database from 'better-sqlite3';

const db = new Database('music.db');


db.prepare(`
        CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        senha TEXT NOT NULL 
        );
    `).run();

db.prepare(`
        CREATE TABLE IF NOT EXISTS musicas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        artista TEXT NOT NULL,
        path TEXT NOT NULL,
        duracao TEXT NOT NULL,
        thumb TEXT,
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
    `).run();

export async function criarUsuario(nome, senha){
    const stmt = db.prepare(`INSERT INTO usuarios (nome, senha) VALUES (?, ?)`)
    const info = stmt.run(nome, senha);
    return info.lastInsertRowid;
}

export async function buscarUsuario(nome){
    const stmt = db.prepare("SELECT * FROM usuarios WHERE nome = ? ");
    const info = stmt.get(nome); 
    return info;
}

export async function deletarUsuario(id){
    const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
    const info = stmt.run(id);
    return info.changes;
}

export async function criarMusica(titulo, artista, path, duracao, thumb, usuario_id ){
    const stmt = db.prepare("INSERT INTO musicas (titulo, artista, path, duracao, thumb, usuario_id) VALUES (?, ?, ?, ?, ?, ?)");
    const info = stmt.run(titulo, artista, path, duracao, thumb, usuario_id);
    return info.lastInsertRowid;
}   

export async function deletarMusica(id){
    const stmt = db.prepare("DELETE FROM musicas WHERE id = ?");
    const info = stmt.run(id);
    return info.changes;
}

export async function buscarMusicaPorTitulo(titulo) {
    const stmt = db.prepare("SELECT * FROM musicas WHERE titulo = ?");
    return stmt.get(titulo); 
}
  
  export async function listarMusicas() {
    const stmt = db.prepare("SELECT * FROM musicas");
    return stmt.all(); 
}