function runComponentTests() {
  testar("COMPONENT - Formulário deve estar presente na página", () => {
    const form = document.getElementById("form");
    if (!form) throw new Error("Formulário não encontrado");
  });

  testar("COMPONENT - Inputs devem receber valores corretamente", () => {
    const input1 = document.getElementById("num1");
    const input2 = document.getElementById("num2");

    input1.value = "10";
    input2.value = "5";

    if (input1.value !== "10" || input2.value !== "5") {
      throw new Error("Inputs não aceitaram valores corretamente");
    }
  });

  testar("COMPONENT - Formulário dispara evento de submit", () => {
    const form = document.getElementById("form");
    let chamado = false;

    const listener = (e) => {
      chamado = true;
      e.preventDefault();
      form.removeEventListener("submit", listener);
    };

    form.addEventListener("submit", listener);
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    if (!chamado) throw new Error("Evento de submit não foi chamado");
  });
}
function testarComponentes() {
  const mensagens = [];
  const resultado = document.getElementById("teste-resultado-final");
  resultado.innerHTML = ""; // Limpa conteúdo anterior

  const idsEsperados = [
    { id: "largura", tipo: "input" },
    { id: "altura", tipo: "input" },
    { id: "testes-resultados", tipo: "div" },
    { id: "teste-resultado-final", tipo: "div" }
  ];

  let passou = 0;
  let falhou = 0;

  idsEsperados.forEach((componente, index) => {
    const elemento = document.getElementById(componente.id);
    if (!elemento) {
      mensagens.push(`❌ Componente ${componente.id} não encontrado no DOM.`);
      falhou++;
    } else {
      const tag = elemento.tagName.toLowerCase();
      if (
        (componente.tipo === "input" && tag === "input") ||
        (componente.tipo === "div" && tag === "div")
      ) {
        mensagens.push(`✅ ${componente.id} está presente e é do tipo ${componente.tipo}.`);
        passou++;
      } else {
        mensagens.push(`❌ ${componente.id} encontrado, mas o tipo está incorreto (esperado: ${componente.tipo}, encontrado: ${tag}).`);
        falhou++;
      }
    }
  });

  // Testa se a função calculaArea existe
  if (typeof calculaArea === "function") {
    mensagens.push("✅ Função calculaArea() está definida.");
    passou++;
  } else {
    mensagens.push("❌ Função calculaArea() não está definida.");
    falhou++;
  }

  // Mostra o resultado
  resultado.innerHTML = mensagens.join("<br>") + `<br><br><strong>Resumo:</strong> ${passou} passaram, ${falhou} falharam.`;
  resultado.style.color = falhou > 0 ? "red" : "green";
}
function rodarTestesComponentes() {
  const componentes = [
    { id: 'nome', nome: 'Input Nome Completo', esperado: { tag: 'INPUT', type: 'text' } },
    { id: 'email', nome: 'Input Email', esperado: { tag: 'INPUT', type: 'email' } },
    { id: 'cpf', nome: 'Input CPF', esperado: { tag: 'INPUT', type: 'text' } },
    { id: 'telefone', nome: 'Input Telefone', esperado: { tag: 'INPUT', type: 'text' } },
    { id: 'btnCadastrar', nome: 'Botão Cadastrar Cliente', esperado: { tag: 'BUTTON', type: 'submit' } },
    { id: 'testUnit', nome: 'Botão Teste Unitário', esperado: { tag: 'BUTTON', type: 'button' } },
    { id: 'testComponent', nome: 'Botão Teste de Componente', esperado: { tag: 'BUTTON', type: 'button' } }
  ];

  const resultados = {};

  componentes.forEach(c => {
    const el = document.getElementById(c.id);

    if (!el) {
      resultados[c.id] = {
        passou: false,
        msg: `${c.nome}: não encontrado no DOM.`
      };
      return;
    }

    // Valida tag
    if (el.tagName !== c.esperado.tag) {
      resultados[c.id] = {
        passou: false,
        msg: `${c.nome}: tag incorreta (esperado ${c.esperado.tag}, encontrado ${el.tagName}).`
      };
      return;
    }

    // Valida tipo (para inputs e botões)
    if (el.type !== c.esperado.type) {
      resultados[c.id] = {
        passou: false,
        msg: `${c.nome}: type incorreto (esperado "${c.esperado.type}", encontrado "${el.type}").`
      };
      return;
    }

    resultados[c.id] = {
      passou: true,
      msg: `${c.nome}: presente com tag e type corretos.`
    };
  });

  return resultados;
}

function exibirResultadosComponentes(resultados) {
  const resultadoDiv = document.getElementById('resultadoCadastro');
  const linhas = [];

  for (const key in resultados) {
    const teste = resultados[key];
    const prefixo = teste.passou ? '✅' : '❌';
    linhas.push(`${prefixo} ${teste.msg}`);
  }

  resultadoDiv.textContent = linhas.join('\n');
}

function executarTestesComponentes() {
  const resultados = rodarTestesComponentes();
  exibirResultadosComponentes(resultados);
}