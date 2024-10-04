import {JSONFilePreset} from 'lowdb/node';
import importPrompt from 'prompt-sync';
import { criarAluno } from './aux-functions.js';

let prompt = importPrompt();
const defaultData = {"alunos": []}
const db = await JSONFilePreset('../database/db.json', defaultData);
const {alunos} = db.data;

// exibir alunos
function listarAlunos() {
  if (alunos.length !== 0) {
    alunos.forEach(item => {
      console.log(`Matrícula: ${item["Matrícula"]} - Nome: ${item['Nome']}`);
    })
  } else {
    console.log('Sem alunos cadastrados.');
  }
}

// cadastrar aluno
function cadastrarAluno() {
  const nomeAluno = prompt('Qual o nome do aluno? ');
  const matricula = alunos.length + 1;
  let novoAluno = criarAluno(matricula, nomeAluno);
  alunos.push(novoAluno);
}

// consultar aluno (matrícula, nome, matérias, notas e situação - aprovado/reprovado)

// cadastrar materias (mín. 3 - continuar até optar parar)

// cadastrar notas

// cadastrar faltas

// calcular média

// calcular faltas (> 5 = reprovado)

export {
  listarAlunos,
  cadastrarAluno
}