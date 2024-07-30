var prompt = require('prompt-sync')();

let alunos = [
  {
    matricula: 1, 
    nome: 'Mateus', 
    materias: [
      {
        numero: 1,
        nome: 'Port',
        nota1: null,
        nota2: null,
        nota3: null,
        faltas: 0
      }
    ]
  }
];

/*
  Opções do menu
*/

/*

1 - CADASTRAR ALUNO

*/
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

/*

2 - CADASTRAR MATÉRIAS

*/
function cadastrarMaterias() {
  //exibe lista de alunos e solicita matrícula desejada
  exibirAlunos();
  let matricula = solicitarNumero('matricula');
  //pesquisa aluno por matrícula
  alunos.filter(aluno => {
    if (matricula === aluno.matricula) {
      let i = aluno.materias.length;
      let continuar = 1;
      do {
        //solicitar no mínimo 3 matérias
        if (i < 3) {
          console.log(`Matéria ${i + 1}`);
          incluirMateria(aluno);
        } else {
          //verificar se deseja cadastrar mais matérias
          continuar = solicitarNumero('continuar');
          if (continuar) {
            console.log(`Matéria ${i + 1}`);
            incluirMateria(aluno);
          }
        }
        i++;
      } while ((i < 3) || continuar);
    }
  })
}

function incluirMateria(aluno) {
  let nomeMateria = prompt('Qual o nome da matéria? ');
  let novaMateria = {numero: (aluno.materias.length + 1), nome: nomeMateria, nota1: null, nota2: null, nota3: null, faltas: 0};
  aluno.materias.push(novaMateria);
}

/*

3 - CADASTRAR NOTAS

*/
function cadastrarNotas() {
  //solicitar 3 notas por matéria
  exibirAlunos();
  let matricula = solicitarNumero('matricula');
  // procurar aluno por matrícula
  alunos.filter(aluno => {
    if (matricula === aluno.matricula) {
      exibirMateriasCadastradas(matricula);
      let numeroMateria = solicitarNumero('materia');
      // procurar matéria por número
      aluno.materias.filter(materia => {
        if (numeroMateria === materia.numero) {
          // solicitar as 3 notas e cadastrar
          for (let i = 0; i < 3; i++) {
            console.log(`Digite a nota ${i + 1}`);
            let novaNota = solicitarNumero('nota');
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

/*

4 - CADASTRAR FALTAS

 */
function cadastrarFaltas() {
  //exibe lista de alunos e solicita número de matrícula
  exibirAlunos();
  let matricula = solicitarNumero('matricula');
  // procurar aluno por matrícula
  alunos.filter(aluno => {
    if (matricula === aluno.matricula) {
      //exibe lista de matérias do aluno
      exibirMateriasCadastradas(matricula);
      let numeroMateria = solicitarNumero('materia');
      //pesquisar matéria por número
      aluno.materias.filter(materia => {
        if (numeroMateria === materia.numero) {
          //solicitar número de faltas por matéria
          let numeroFaltas = solicitarNumero('faltas');
          materia.faltas += numeroFaltas;
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

/*

5 - EXIBIR ALUNOS

*/
function exibirAlunos() {
  for(const aluno of alunos) {
    //exibir nome e matrícula por aluno
    console.log(`Matrícula: ${aluno.matricula} | Nome: ${aluno.nome}`);
  }
  console.log('');
}

/*

6 - EXIBIR RESULTADOS

*/
//chamada da exibição do resultado por matéria
function exibirResultados() {
  exibirAlunos();
  let matricula = solicitarNumero('matricula');
  //pesquisar aluno pela matrícula
  alunos.filter(aluno => {
    if(matricula === aluno.matricula) {
      //exibir nome do aluno
      console.log('Aluno: ' + aluno.nome);
      //exibir resultados por matéria
      exibirResultadoMateria(aluno);
    }
  })
}

//exibição individual do resultado por matéria
function exibirResultadoMateria(aluno) {
  /*
  indicar aluno aprovado/reprovado por matéria
  (média das notas ou faltas)
  */
 if(aluno.materias.length !== 0) {
   aluno.materias.forEach(materia => {
     let nota1 = materia.nota1;
     let nota2 = materia.nota2;
     let nota3 = materia.nota3;
     //cálculo da média
     let media = calcularMedia(nota1, nota2, nota3).toFixed(2);
     let faltas = materia.faltas;
     //exibir notas, média, faltas e situação de cada matéria
     console.log(`
      ${materia.numero}. ${materia.nome}
        Nota 1: ${nota1} | Nota 2: ${nota2} | Nota 3: ${nota3}
        Média: ${media} | Faltas: ${faltas}
        Situação: ${verificarSituacao(media, faltas)}
      `);
    })
  }
}

//cálculo da média individual de cada matéria
function calcularMedia(nota1, nota2, nota3) {
  return (nota1 + nota2 + nota3) / 3;
}

//verificar situação do aluno (aprovado/reprovado)
function verificarSituacao(media, faltas) {
  if(media < 7) {
    return 'Reprovado por nota';
  } else if (faltas > 5) {
    return 'Reprovado por faltas';
  } else {
    return 'Aprovado';
  }
}

//solicitação de valor do usuário conforme tipo de entrada
function solicitarNumero(tipoSolicitacao) {
  let valor;
  const pattern = /[abc]/i;
  do {
    //número da matricula
    if (tipoSolicitacao === 'matricula') {
      valor = +prompt('Qual o número da matrícula do aluno? ');
    //número da matéria
    } else if (tipoSolicitacao === 'materia') {
      valor = +prompt('Qual o número da matéria? ');
    //valor da nota
    } else if (tipoSolicitacao === 'nota') {
      valor = +prompt('Digite o valor da nota: ');
    //número de faltas
    } else if (tipoSolicitacao === 'faltas') {
      valor = +prompt('Quantas faltas deseja cadastrar? ');
    } 
    
    //continuar no menu
    if (tipoSolicitacao === 'continuar') {
      //cadastrar nova matéria após as 3 mínimas
      do {
        valor = +prompt('Deseja cadastrar outra matéria? 1 - Sim | 0 - Não: ');
        if (valor < 0 || valor > 1) {
          console.log('Para Informar se deseja continuar, digite 1 para Sim ou 0 para Não');
        }
      } while (valor < 0 || valor > 1);
    }

    if (pattern.test(valor) || valor < 0) {
      console.log('Entrada inválida. Digite apenas números a partir de 0.');
    }
  } while (pattern.test(valor) || valor < 0);
  return valor;
}

/*

  Menu do sistema

*/
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
        continuar = solicitarOpcaoMenu();
        break;
      case 2:
        cadastrarMaterias();
        continuar = solicitarOpcaoMenu();
        break;
      case 3:
        cadastrarNotas();
        continuar = solicitarOpcaoMenu();
        break;
      case 4:
        cadastrarFaltas();
        continuar = solicitarOpcaoMenu();
        break;
      case 5:
        exibirAlunos();
        continuar = solicitarOpcaoMenu();
        break;
      case 6:
        exibirResultados();
        continuar = solicitarOpcaoMenu();
        break;
      case 0:
        console.log('Encerrando o sistema...');
        continuar = false;
    }
  } while(continuar);
}

//solicitação da opção de continuar no sistema
function solicitarOpcaoMenu() {
  let opcao;
  console.log('Voltar ao menu? 1 - Sim | 0 - Não: ');
  do {
    opcao = +prompt('Opção: ');
    if (opcao < 0 || opcao > 1) {
      console.log('Digite 1 para voltar ao menu ou 0 para encerrar o sistema.');
    }
  } while (opcao < 0 || opcao > 1);
  if (opcao == 0) {
    console.log('Encerrando o sistema...');
    return opcao;
  } else {
    return opcao;
  }
}

main();