import {listarAlunos, cadastrarAluno} from './system-functions.js';
import {contarEncerramento} from './aux-functions.js';

// main menu
function mainMenu(opcao) {
  switch(opcao) {
    case 1:
      console.clear();
      console.log('Lista de Alunos')
      listarAlunos();
      break;
    case 2:
      console.clear();
      console.log('Cadastro de Aluno')
      cadastrarAluno();
      break;
    case 0:
      console.clear();
      console.log('Encerrando o sistema...');
      contarEncerramento();
      break;
    default:
      console.log('Opção inválida. Tente uma das opções do menu.');
  }
}

// continue menu

export {
  mainMenu
}