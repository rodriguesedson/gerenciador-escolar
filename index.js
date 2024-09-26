const {listarAlunos, cadastrarAluno} = require('./funcoes-sistema.js');
const prompt = require('prompt-sync')();

function main() {
  console.log('Bem vindo ao sistema');
  let continuar = true;

  do {
    console.log(`
    1 - Lista de alunos
    2 - Cadastrar aluno
    3 - Consultar cadastro de aluno
    4 - Cadastrar matérias
    5 - Inserir notas
    6 - Inserir faltas
    0 - Encerrar
    `);
    let opcao = +prompt('Selecione uma opção do menu: ');
    switch(opcao) {
      case 1:
        listarAlunos();
        break;
      case 2:
        cadastrarAluno();
        break;
      case 3:
        consultarALuno();
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