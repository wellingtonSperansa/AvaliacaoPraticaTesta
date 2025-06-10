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