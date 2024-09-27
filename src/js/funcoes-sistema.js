const fs = require('node:fs');
const prompt = require('prompt-sync')();

function listarAlunos() {
  const db = conectarDb();
  const alunos = db.file.alunos;

  if (alunos.length === 0) {
    console.log("\nSem alunos cadastrados...")
  } else {
    alunos.forEach(aluno => {
      console.log(`Matrícula: ${aluno.matricula} - Nome: ${aluno.nome}`);
    })
  }
}

function cadastrarAluno(nomeAluno) {
  const db = conectarDb();
  const matricula = db.file.alunos.length + 1;
  const novoAluno = criarAluno(matricula, nomeAluno);

  db.file.alunos.push(novoAluno);
  fs.writeFileSync(db.src, JSON.stringify(db.file))
  console.log('Registro de aluno criado.')
}

function consultarAluno(matricula) {
  const db = conectarDb();
  const alunos = db.file.alunos;
  const aluno = alunos.filter(aluno => {
    if (aluno.matricula === matricula) return aluno;
  });

  exibirDadosAluno(aluno[0]);
}

function conectarDb() {
  const src = 'src/database/database.json';
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

function exibirDadosAluno(aluno) {
  if (aluno) {
    console.log(`
    \r=================================
    \rMatrícula: ${aluno.matricula}
    \rNome: ${aluno.nome}
    \rMatérias:
    \r  ${exibirMaterias(aluno)}
    \r=================================
    `);
  } else {
    console.log("Não há aluno cadastrado com a matrícula informada.");
  }
}

function exibirMaterias(aluno) {
  if (aluno.materias) {
    aluno.materias.forEach(item => {
      return `
      Nome: ${item.nome}  
      Nota 1: ${item.nota1}
      Nota 2: ${item.nota2}
      Nota 3: ${item.nota3}
      `
    })
  } else {
    return "Matérias pendentes de cadastro."
  }
}

module.exports = {listarAlunos, cadastrarAluno, consultarAluno};