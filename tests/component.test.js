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