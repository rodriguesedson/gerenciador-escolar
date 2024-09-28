const {listarAlunos, cadastrarAluno, consultarAluno, cadastrarMaterias} = require('./src/js/funcoes-sistema.js');
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
        console.log("\n========Lista de Alunos========\n");
        listarAlunos();
        break;
      case 2:
        console.log("\n=====Cadastro de Novo Aluno=====\n");
        cadastrarAluno();
        break;
      case 3:
        console.log("\n========Consulta de Aluno========\n");
        consultarAluno();
        break;
      case 4:
        console.log("\n=======Cadastrar Matérias=======\n");
        cadastrarMaterias();
        break;
      case 5:
        console.log("\n==========Inserir Notas==========\n");
        inserirNotas();
        break;
      case 6:
        console.log("\n==========Inserir Faltas==========\n");
        inserirFaltas();
        break;
      case 0:
        console.log('Encerrando o sistema ***************');
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