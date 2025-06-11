// Função que roda todos os testes
function runUnitTests() {
  // Testes de soma
  testar("UNIT - Soma de positivos", () => {
    if (somar(3, 4) !== 7) throw new Error("Esperado 7");
  });

  testar("UNIT - Soma com negativo", () => {
    if (somar(5, -2) !== 3) throw new Error("Esperado 3");
  });

  // Testes de subtração
  testar("UNIT - Subtração de positivos", () => {
    if (subtrair(10, 3) !== 7) throw new Error("Esperado 7");
  });

  testar("UNIT - Subtração com resultado negativo", () => {
    if (subtrair(2, 5) !== -3) throw new Error("Esperado -3");
  });

  // Testes de multiplicação
  testar("UNIT - Multiplicação comum", () => {
    if (multiplicar(4, 5) !== 20) throw new Error("Esperado 20");
  });

  testar("UNIT - Multiplicação por zero", () => {
    if (multiplicar(10, 0) !== 0) throw new Error("Esperado 0");
  });

  // Testes de divisão
  testar("UNIT - Divisão comum", () => {
    if (dividir(20, 4) !== 5) throw new Error("Esperado 5");
  });

  testar("UNIT - Divisão por 1", () => {
    if (dividir(7, 1) !== 7) throw new Error("Esperado 7");
  });

  testar("UNIT - Divisão por zero deve lançar erro", () => {
    let erro = false;
    try {
      dividir(10, 0);
    } catch (e) {
      erro = true;
    }
    if (!erro) throw new Error("Esperado erro de divisão por zero");
  });
}


function testaCalculo() {
  const resultadosContainer = document.getElementById("teste-resultado-final");
  resultadosContainer.innerHTML = ""; // Limpa resultados anteriores

  const testes = [
    { largura: 5, altura: 3, valido: true },
    { largura: 0, altura: 4, valido: false },
    { largura: 7, altura: -2, valido: false },
    { largura: 10, altura: 10, valido: true },
    { largura: -1, altura: -1, valido: false },
    { largura: 2, altura: 2, valido: true },
    { largura: 100, altura: 3, valido: true },
    { largura: 0, altura: 0, valido: false },
    { largura: "abc", altura: 5, valido: false },
    { largura: 3, altura: "xyz", valido: false }
  ];

  let passou = 0;
  let falhou = 0;
  // forEach é o metododo que executa em callback "uma Linha por vez".
  testes.forEach((teste, index) => {
    // Define valores nos inputs
    document.getElementById("largura").value = teste.largura;
    document.getElementById("altura").value = teste.altura;

    // Executa a função
    calculaArea();

    const resultadoDOM = document.getElementById("testes-resultados").textContent;

    if (!teste.valido) {
      if (resultadoDOM.includes("Erro")) {
        resultadosContainer.innerHTML += `✅ Teste ${index + 1} passou (entrada inválida detectada corretamente).<br>`;
        passou++;
      } else {
        resultadosContainer.innerHTML += `❌ Teste ${index + 1} falhou (entrada inválida esperada, mas não detectada).<br>`;
        falhou++;
      }
    } else {
      const areaEsperada = (parseFloat(teste.largura) * parseFloat(teste.altura)).toFixed(2);
      const resultadoEsperado = "O resultado da área é: " + areaEsperada + " m².";
      if (resultadoDOM === resultadoEsperado) {
        resultadosContainer.innerHTML += `✅ Teste ${index + 1} passou (área correta: ${areaEsperada} m²).<br>`;
        passou++;
      } else {
        resultadosContainer.innerHTML += `❌ Teste ${index + 1} falhou (esperado: "${resultadoEsperado}", obtido: "${resultadoDOM}").<br>`;
        falhou++;
      }
    }
  });

  resultadosContainer.innerHTML += `<br><strong>Resumo:</strong> ${passou} passaram, ${falhou} falharam.`;
  resultadosContainer.style.color = falhou > 0 ? "red" : "green";

  // ✅ Limpa div de resultado individual e input de largura
  document.getElementById("testes-resultados").textContent = "";
  document.getElementById("largura").value = "";
}
function preencherFormularioPadrao() {
  document.getElementById('nome').value = 'João Silva';
  document.getElementById('email').value = 'joao.silva@example.com';
  document.getElementById('cpf').value = '12345678901';        // 11 dígitos numéricos
  document.getElementById('telefone').value = '11987654321';   // 11 dígitos numéricos (comum em SP)
}

function rodarTestesUnitarios() {
  preencherFormularioPadrao();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  const resultados = {};

  // Teste nome - não contém números e possui mais de 3 caracteres
  const nomeValido = nome.length >= 3 && !/\d/.test(nome);
  resultados.nome = nomeValido
    ? { passou: true, msg: 'Nome: válido, não contém números e possui mais de 3 caracteres.' }
    : { passou: false, msg: 'Nome: inválido, deve ter mais de 3 caracteres e não conter números.' };

  // Teste email - formato básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  resultados.email = emailRegex.test(email)
    ? { passou: true, msg: 'Email: válido, possui formato correto.' }
    : { passou: false, msg: 'Email: inválido, formato incorreto.' };

  // Teste CPF - exatamente 11 dígitos numéricos
  const cpfRegex = /^\d{11}$/;
  resultados.cpf = cpfRegex.test(cpf)
    ? { passou: true, msg: 'CPF: válido, contém exatamente 11 dígitos numéricos.' }
    : { passou: false, msg: 'CPF: inválido, deve conter exatamente 11 dígitos numéricos.' };

  // Teste telefone - mínimo 10 dígitos numéricos
  const telefoneSoNumeros = telefone.replace(/\D/g, '');
  resultados.telefone = telefoneSoNumeros.length >= 10
    ? { passou: true, msg: 'Telefone: válido, possui pelo menos 10 dígitos numéricos.' }
    : { passou: false, msg: 'Telefone: inválido, deve conter pelo menos 10 dígitos numéricos.' };

  return resultados;
}

function exibirResultados(resultados) {
  const resultadoDiv = document.getElementById('resultadoCadastro');
  const linhas = [];

  for (const key in resultados) {
    const teste = resultados[key];
    const prefixo = teste.passou ? '✅' : '❌';
    linhas.push(`${prefixo} ${teste.msg}`);
  }

  resultadoDiv.textContent = linhas.join('\n');
}

function executarTestesUnitarios() {
  const resultados = rodarTestesUnitarios();
  exibirResultados(resultados);
}