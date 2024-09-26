const fs = require('node:fs');
const prompt = require('prompt-sync')();

function listarAlunos() {
  const db = conectarDb();
  const alunos = db.file.alunos;
  if (alunos.length === 0) {
    console.log("Sem alunos cadastrados")
  } else {
    alunos.forEach(aluno => {
      console.log(`
      Matrícula: ${aluno.matricula} - Nome: ${aluno.nome}
      `);
    })
  }
}

function cadastrarAluno() {
  const db = conectarDb();
  const matricula = db.file.alunos.length + 1;
  const nomeAluno = prompt('Qual o nome do aluno? ');
  const novoAluno = criarAluno(matricula, nomeAluno);

  db.file.alunos.push(novoAluno);

  fs.writeFileSync(db.src, JSON.stringify(db.file))
  console.log('Registro de aluno criado.')
}

function conectarDb() {
  const src = 'database.json';
  const file = JSON.parse(fs.readFileSync(src));
  
  return {src: src, file: file};
}

function criarAluno(matricula, nomeAluno) {
  return {
    matricula: matricula,
    nome: nomeAluno,
    matérias: []
  }
}

module.exports = {listarAlunos, cadastrarAluno};