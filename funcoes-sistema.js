const fs = require('fs');

function listarAlunos() {
  let db = connection();
  if (db.read.alunos.length > 0) {
    console.log(db.read.alunos)
  } else {
    console.log('Sem alunos cadastrados');
  }
}

function connection() {
  let file = 'database.json';
  let read = JSON.parse(fs.readFileSync(file));
  return {
    file: file,
    read: read
  };
}

module.exports = {listarAlunos, cadastrarAluno};