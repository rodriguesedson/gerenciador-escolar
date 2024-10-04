function contarEncerramento() {
  let counter = 4;
  let id = setInterval(() => {
    counter--;
    console.log(counter.toString());
    if (counter === 1) clearInterval(id)
  }, 1000)
}

function criarAluno(matricula, nomeAluno) {
  return {
    "Matrícula": matricula,
    "Nome": nomeAluno,
    "Matérias": []
  }
}

export {
  contarEncerramento,
  criarAluno
}