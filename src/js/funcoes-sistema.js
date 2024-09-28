const fs = require('node:fs');
const prompt = require('prompt-sync')();

// FUNÇÕES DO SISTEMA

function listarAlunos() {
  const db = conectarDb();

  if (db.alunos.length === 0) {
    console.log("\nSem alunos cadastrados...")
  } else {
    db.alunos.forEach(aluno => {
      console.log(`Matrícula: ${aluno.matricula} - Nome: ${aluno.nome}`);
    })
  }
}

function cadastrarAluno() {
  const db = conectarDb();
  const nomeAluno = solicitarNome();
  const matricula = db.alunos.length + 1;
  const novoAluno = criarAluno(matricula, nomeAluno);

  db.alunos.push(novoAluno)
  fs.writeFileSync(db.src, JSON.stringify(db.file))
  console.log('Registro de aluno criado.')
}

function consultarAluno() {
  const db = conectarDb();
  const matricula = +prompt('Qual a matrícula do aluno? ');
  const aluno = db.alunos.filter(aluno => {
    if (aluno.matricula === matricula) return aluno;
  });

  exibirDadosAluno(aluno[0]);
}

// cadastrarMaterias
function cadastrarMaterias() {
  const db = conectarDb();
  const matricula = +prompt('Qual a matrícula do aluno? ');
  const indice = matricula - 1;
  
  if (matricula <= db.alunos.length) {
    do {
      const novaMateria = criarMateria();
  
      db.alunos[indice].materias.push(novaMateria);
    } while (db.alunos[indice].materias.length < 3);
    fs.writeFileSync(db.src, JSON.stringify(db.file));
  } else {
    console.log('Aluno não cadastrado.');
  }
}

// inserirNotas

// inserirFaltas

// FUNÇÕES AUXILIARES

function conectarDb() {
  const src = 'src/database/database.json';
  const file = JSON.parse(fs.readFileSync(src));
  const alunos = file.alunos;
  
  return {src: src, file: file, alunos: alunos};
}

function criarAluno(matricula, nomeAluno) {
  return {
    matricula: matricula,
    nome: nomeAluno,
    materias: []
  }
}

function solicitarNome() {
  let nome;
  do {
    nome = prompt('Digite o nome: ');
    if (nome === '') console.log('Campo nome em branco...');
  } while (nome === '');
  return nome;
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
  if (aluno.materias.length > 0) {
    aluno.materias.forEach(item => {
      console.log(`Nome: ${item.nome} - Nota 1: ${item.nota1} - Nota 2: ${item.nota2} - Nota 3: ${item.nota3}`);
    });
  } else {
    return "Matérias pendentes de cadastro."
  }
}

function criarMateria() {
  const nomeMateria = solicitarNome();
  
  return {
    nome: nomeMateria,
    nota1: '-',
    nota2: '-',
    nota3: '-'
  }
}

module.exports = {listarAlunos, cadastrarAluno, consultarAluno, cadastrarMaterias};