import importPrompt from 'prompt-sync';
let prompt = importPrompt();
import {mainMenu} from './src/js/system-menu.js';

function main() {
  console.clear();
  let opcao;
  do {
    console.log(`
    \rMenu
    \r1 - Listar alunos
    \r2 - Cadastrar novo aluno
    \r0 - Encerrar sistema
    `)
    opcao = +prompt('Escolha uma opção do menu acima: ');
    mainMenu(opcao);
  } while(opcao != 0);
}

main();