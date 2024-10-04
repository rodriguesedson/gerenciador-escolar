// VARIÁVEL P/ MANIPULAÇÃO DO REGISTRO
// const {alunos} = db.data;

// MODELO DE ALUNO
// let aluno = {
//   'Matrícula': 1,
//   'Nome': 'Tião',
//   'Matérias': [
//     {'Nome': 'Português', 'nota1': 10, 'nota2': 10, 'nota3': 10}
//   ]
// }

//CADASTRAR ALUNO
// alunos.push(aluno)


// LISTAR ALUNOS
// alunos.forEach(item => {
//   console.log(`Matrícula: ${item["Matrícula"]} - Nome: ${item['Nome']}`);
// })


// FILTRAR POR MATRÍCULA
// const aluno1 = alunos.filter(aluno => aluno['Matrícula'] === 1)[0];
// console.log(aluno1)


// FILTRAR POR ÍNDICE (não mt útil aqui)
// alunos.at(0)['Nome']


// FILTRAR POR NOME
// alunos.filter(aluno => aluno['Nome'].includes('Tião'))


// BUSCAR POR MATRÍCULA (busca mais eficiente que filter)
// const aluno2 = alunos.find(aluno => aluno['Matrícula'] === 1)
// console.log(aluno2)