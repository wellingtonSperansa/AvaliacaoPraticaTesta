// Funções matemáticas puras
function somar(a, b) {
  return a + b;
}

function subtrair(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  if (b === 0) throw new Error("Divisão por zero");
  return a / b;
}

// Interação com DOM
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const operacao = document.getElementById("operacao").value;
  let resultado;

  try {
    switch (operacao) {
      case "soma":
        resultado = somar(num1, num2);
        break;
      case "subtracao":
        resultado = subtrair(num1, num2);
        break;
      case "multiplicacao":
        resultado = multiplicar(num1, num2);
        break;
      case "divisao":
        resultado = dividir(num1, num2);
        break;
    }
    document.getElementById("resultado").textContent = resultado;
  } catch (erro) {
    document.getElementById("resultado").textContent = "Erro: " + erro.message;
  }
});
function calculaArea() {
  const largura = parseFloat(document.getElementById("largura").value);
  const altura = parseFloat(document.getElementById("altura").value);

  // Verificação de valores inválidos
  if (largura <= 0 || altura <= 0 || isNaN(largura) || isNaN(altura)) {
    document.getElementById("testes-resultados").textContent =
      "❌ Erro: Não é permitido usar valores menores ou iguais a zero.";
    return;
  }

  const area = largura * altura;
  document.getElementById("testes-resultados").textContent =
    "O resultado da área é: " + area.toFixed(2) + " m².";
}
function limparTestes() {
  // Limpa os campos de input
  document.getElementById("largura").value = "";
  document.getElementById("altura").value = "";

  // Limpa os resultados
  document.getElementById("testes-resultados").textContent = "";
  document.getElementById("teste-resultado-final").innerHTML = "";
}
const indexbd = [];

const form = document.getElementById('formCadastro');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (nome && email && cpf && telefone) {
    const cliente = { nome, email, cpf, telefone };
    indexbd.push(cliente);
    mostrarResultado(`✅ Cliente cadastrado com sucesso:\n${JSON.stringify(cliente, null, 2)}`);
    form.reset();
  } else {
    mostrarResultado('❌ Preencha todos os campos.');
  }
});
function mostrarResultado(mensagem) {
  resultadoCadastro.innerHTML = mensagem;
}