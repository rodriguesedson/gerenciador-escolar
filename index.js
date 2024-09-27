const {listarAlunos, cadastrarAluno, consultarAluno} = require('./src/js/funcoes-sistema.js');
const prompt = require('prompt-sync')();

function main() {
  console.log('Bem vindo ao sistema');
  let continuar = true;

  do {
    console.log(`
      \r==============Menu==============
      \r1 - Lista de alunos
      \r2 - Cadastrar aluno
      \r3 - Consultar cadastro de aluno
      \r4 - Cadastrar matérias
      \r5 - Inserir notas
      \r6 - Inserir faltas
      \r0 - Encerrar
      \r================================
    `);
    let opcao = +prompt('Selecione uma opção do menu: ');
    switch(opcao) {
      case 1:
        console.log("\n========Lista de alunos========\n");
        listarAlunos();
        break;
      case 2:
        console.log("\n=====Cadastro de novo aluno=====\n");
        const nomeAluno = prompt('Qual o nome do aluno? ');
        cadastrarAluno(nomeAluno);
        break;
      case 3:
        console.log("\n========Consulta de aluno========\n");
        const matricula = +prompt('Qual a matrícula do aluno? ');
        consultarAluno(matricula);
        break;
      case 4:
        cadastrarMaterias();
        break;
      case 5:
        inserirNotas();
        break;
      case 6:
        inserirFaltas();
        break;
      case 0:
        console.log('Encerrando o sistema');
        setTimeout(() => {
          console.clear();
        }, 2000);
        continuar = false;
        break;
      default:
        console.log('Opção inválida. Escolha uma das opções do menu');
    }
  } while (continuar);
}

main()