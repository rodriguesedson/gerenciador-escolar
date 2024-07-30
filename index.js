var prompt = require('prompt-sync')();

let alunos = [];

// Opções do menu
// 1 - CADASTRAR ALUNO
function cadastrarAluno() {
  //solicitar nome do aluno
  let nomeAluno = prompt('Digite o nome do aluno: ');
  let novoAluno = {
      matricula: (alunos.length + 1),
      nome: nomeAluno,
      materias: []
  };
  alunos.push(novoAluno);
}

// 2 - CADASTRAR MATÉRIAS
function cadastrarMaterias() {
  //cadastrar no mínimo 3 matérias
  //continuar cadastro até decidir parar
  exibirAlunos();
  let matricula = solicitarMatricula();
  alunos.filter(aluno => {
    if (matricula === aluno.matricula) {
      let i = 1;
      let continuar = 1;
      do {
        //solicitar no mínimo 3 matérias
        if (i <= 3) {
          console.log('Matéria ' + i);
          incluirMateria(aluno);
        } else {
          //verificar se deseja cadastrar mais matérias
          continuar = +prompt('Deseja cadastrar outra matéria? Sim = 1, Não = 0: ');
          if (continuar) {
            console.log('Matéria ' + i);
            incluirMateria(aluno);
          }
        }
        i++;
      } while ((i <= 3) || continuar);
    }
  })
}

function incluirMateria(aluno) {
  let nomeMateria = prompt('Qual o nome da matéria? ');
  let novaMateria = {numero: (aluno.materias.length + 1), nome: nomeMateria, nota1: null, nota2: null, nota3: null, faltas: 0};
  aluno.materias.push(novaMateria);
}

// 3 - CADASTRAR NOTAS
function cadastrarNotas() {
  //solicitar 3 notas por matéria
  exibirAlunos();
  let matricula = solicitarMatricula();
  // procurar aluno por matrícula
  alunos.filter(aluno => {
    if (matricula === aluno.matricula) {
      exibirMateriasCadastradas(matricula);
      let numeroMateria = +prompt('Qual o número da matéria? ');
      // procurar matéria por número
      aluno.materias.filter(materia => {
        if (numeroMateria === materia.numero) {
          // solicitar notas e cadastrar
          for (let i = 0; i < 3; i++) {
            let novaNota = +prompt(`Digite a nota ${i + 1}: `);
            materia['nota'+(i + 1)] = novaNota;
            console.log(`
            ${materia.nome}:
            Nota 1: ${materia.nota1} | Nota 2: ${materia.nota2} | Nota 3: ${materia.nota3}
            `);
          }
        }
      })
    }
  })
}

function exibirMateriasCadastradas(matricula) {
  //pesquisar aluno por matrícula
  alunos.filter(aluno => {
    if (matricula === aluno.matricula) {
      //exibir matérias por número e nome
      aluno.materias.forEach(materia => {
        console.log(`
        ${materia.numero}. ${materia.nome};
        `);
      })
    }
  })
}

// 4 - CADASTRAR FALTAS
function cadastrarFaltas() {
  exibirAlunos();
  let matricula = solicitarMatricula();
  // procurar aluno por matrícula
  alunos.filter(aluno => {
    if (matricula === aluno.matricula) {
      //procurar matéria por número
      exibirMateriasCadastradas(aluno);
      let numeroMateria = +prompt('Qual o número da matéria? ');
      aluno.materias.filter(materia => {
        if (numeroMateria === materia.numero) {
          //solicitar número de faltas por matéria
          let numeroFaltas = +prompt('Quantas faltas deseja cadastrar? ');
          materia.faltas += numeroFaltas;
        }
      })
    }
  })
}

// 5 - EXIBIR ALUNOS
function exibirAlunos() {
  for(const aluno of alunos) {
    console.log(`Matrícula: ${aluno.matricula} | Nome: ${aluno.nome}`);
  }
  console.log('');
}

// 6 - EXIBIR RESULTADOS
function exibirResultados() {
  exibirAlunos();
  let matricula = solicitarMatricula();
  alunos.filter(aluno => {
    if(matricula === aluno.matricula) {
      console.log('Aluno: ' + aluno.nome);
      exibirResultadoMateria(aluno);
    }
  })
}

function exibirResultadoMateria(aluno) {
  //exibir média de cada matéria
  /*
    indicar aluno aprovado/reprovado por matéria
    (média das notas ou faltas)
  */
  if(aluno.materias.length !== 0) {
    aluno.materias.forEach(materia => {
      let nota1 = materia.nota1;
      let nota2 = materia.nota2;
      let nota3 = materia.nota3;
      let media = calcularMedia(nota1, nota2, nota3);
      let faltas = materia.faltas;
      console.log(`
        ${materia.numero}. ${materia.nome}
        Nota 1: ${nota1} | Nota 2: ${nota2} | Nota 3: ${nota3}
        Média: ${media} | Faltas: ${faltas}
        Situação: ${verificarSituacao(media, faltas)}
      `);
    })
  }
}

function calcularMedia(nota1, nota2, nota3) {
  //calcular média individual de cada matéria
  return (nota1 + nota2 + nota3) / 3;
}

function verificarSituacao(media, faltas) {
  if(media < 7) {
    return 'Reprovado por nota';
  } else if (faltas > 5) {
    return 'Reprovado por faltas';
  } else {
    return 'Aprovado';
  }
}

function solicitarMatricula() {
  let matricula;
  do {
      matricula = +prompt('Qual a matrícula do aluno? ');
      if (typeof(matricula) !== 'number') {
        console.log('Entrada inválida. Digite apenas números.');
      }
    } while(typeof(matricula) !== 'number');
  return matricula;
}

// Menu
function main() {
  console.log('Bem vindo ao sistema de gerenciamento de notas\n');
  
  let continuar = true;
  do {
    console.log(`
      Opções:
        1 - Cadastrar aluno;
        2 - Cadastrar matérias;
        3 - Cadastrar notas;
        4 - Cadastrar faltas;
        5 - Exibir alunos;
        6 - Exibir resultados;
        0 - Sair;
    `);

    let opcao = +prompt('Selecione uma das opções acima: ');
    console.log('');

    switch(opcao) {
      case 1:
        cadastrarAluno();
        break;
      case 2:
        cadastrarMaterias();
        break;
      case 3:
        cadastrarNotas();
        break;
      case 4:
        cadastrarFaltas();
        break;
      case 5:
        exibirAlunos();
        break;
      case 6:
        exibirResultados();
        break;
      case 0:
        console.log('Encerrando o sistema...');
        continuar = false;
    }
  } while(continuar);
}

main();