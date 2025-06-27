<script>
  import { saldo } from '../../../stores/saldo.js';
  import { goto } from '$app/navigation';

  let linhas = 3;
  let colunas = 4;
  let totalCartas = linhas * colunas;
  let simbolos = [];
  let revelados = [];
  let jogoAtivo = false;
  let finalizado = false;
  let premioAcumulado = 0;
  let resultadoMensagem = '';
  let saldoAtual;
  let diamantesPorLinha = [];
  const unsubscribe = saldo.subscribe(v => saldoAtual = v);

  function gerarSimbolos() {
    let tabuleiro = [];
    diamantesPorLinha = [];
    for (let i = 0; i < linhas; i++) {
      let qtdDiamantes = Math.floor(Math.random() * (colunas + 1));
      diamantesPorLinha.push(qtdDiamantes);
      let linhaSimbolos = Array(colunas).fill('outro');
      let posicoes = [...Array(colunas).keys()];
      posicoes.sort(() => Math.random() - 0.5);
      for (let j = 0; j < qtdDiamantes; j++) {
        linhaSimbolos[posicoes[j]] = 'diamante';
      }
      tabuleiro = tabuleiro.concat(linhaSimbolos);
    }
    simbolos = tabuleiro;
    revelados = Array(totalCartas).fill(false);
  }

  function comprarRaspadinha() {
    if (jogoAtivo || saldoAtual < -600 || saldoAtual < 100) {
      resultadoMensagem = saldoAtual < 100 ? 'Saldo insuficiente para jogar.' : '';
      return;
    }
    saldo.update(s => s - 100);
    jogoAtivo = true;
    finalizado = false;
    premioAcumulado = 0;
    resultadoMensagem = '';
    gerarSimbolos();
  }

  async function rasparPosicao(index) {
    if (!jogoAtivo || finalizado || revelados[index]) return;
    revelados[index] = 'animando';
    await new Promise(r => setTimeout(r, 300));
    revelados[index] = true;
    if (revelados.every(v => v === true)) verificarPremio();
  }

  function verificarPremio() {
    premioAcumulado = 0;
    for (let i = 0; i < linhas; i++) {
      let inicio = i * colunas;
      let linha = simbolos.slice(inicio, inicio + colunas);
      let countDiamantes = linha.filter(s => s === 'diamante').length;
      diamantesPorLinha[i] = countDiamantes;
      if (countDiamantes === 3) premioAcumulado += 150;
      else if (countDiamantes === 4) premioAcumulado += 200;
    }
    if (premioAcumulado > 0) {
      resultadoMensagem = `Você ganhou R$${premioAcumulado.toLocaleString('pt-BR')} no total!`;
      saldo.update(s => s + premioAcumulado);
    } else {
      resultadoMensagem = 'Você raspou tudo, mas não encontrou 3 ou mais diamantes na mesma linha.';
    }
    finalizarJogo();
  }

  function finalizarJogo() {
    jogoAtivo = false;
    finalizado = true;
  }

  function voltar() {
    goto('/casadeapostas');
  }
</script>

<style>
  .pagina-sorteador {
    background: #000;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    padding: 2rem 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .container {
    max-width: 500px;
    width: 100%;
    padding: 1.5rem;
    background: #111;
    border-radius: 12px;
    box-shadow: 0 0 35px rgba(204, 0, 0, 0.7);
    text-align: center;
  }
  .logo {
    width: 120px;
    margin-bottom: 1rem;
    border-radius: 50%;
  }
  .descricao {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #ddd;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 60px);
    gap: 10px;
    justify-content: center;
  }
  .carta {
    width: 60px;
    height: 60px;
    font-size: 2rem;
    perspective: 600px;
    cursor: pointer;
  }
  .carta-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.4s;
    transform-style: preserve-3d;
    position: relative;
  }
  .carta.animando .carta-inner,
  .carta.revelada .carta-inner {
    transform: rotateY(180deg);
  }
  .carta .frente,
  .carta .verso {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
  }
  .carta .verso {
    background: #444;
    color: white;
  }
  .carta .frente {
    background: #222;
    transform: rotateY(180deg);
  }
  .result {
    margin-top: 1rem;
    font-size: 1.1rem;
    color: gold;
    min-height: 1.5rem;
  }
  button {
    margin: 0.4rem;
    padding: 0.8rem 1.4rem;
    font-size: 1rem;
    background-color: #cc0000;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    box-shadow: 0 0 10px #cc0000;
  }
  .saldo {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.2rem;
    color: #0f0;
  }
  @media (max-width: 600px) {
    .grid {
      grid-template-columns: repeat(4, 50px);
      gap: 8px;
    }
    .carta {
      width: 50px;
      height: 50px;
      font-size: 1.8rem;
    }
    button {
      width: 100%;
      font-size: 1.2rem;
    }
  }
</style>

<div class="pagina-sorteador">
  <div class="container">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
      alt="Logo do Site"
      class="logo"
    />
    <h2>Raspadinha</h2>
    <p class="descricao">
      Clique em "Comprar Raspadinha" para começar.<br />
      Encontre 3 diamantes na mesma linha para ganhar R$150,<br />
      4 diamantes para ganhar R$200.<br />
    </p>
    {#if !jogoAtivo && !finalizado}
      <button on:click={comprarRaspadinha}>Comprar Raspadinha - R$100</button>
    {/if}
    {#if jogoAtivo || finalizado}
      {#each Array(linhas) as _, linhaIndex}
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 0.5rem;">
          <div
            class="grid"
            style="grid-template-columns: repeat(4, 60px); margin-right: 20px;"
          >
            {#each Array(colunas) as _, colIndex}
              <div
                class="carta {revelados[linhaIndex * colunas + colIndex] === 'animando' ? 'animando' : ''} {revelados[linhaIndex * colunas + colIndex] === true ? 'revelada' : ''}"
                on:click={() => rasparPosicao(linhaIndex * colunas + colIndex)}
              >
                <div class="carta-inner">
                  <div class="verso">🂠</div>
                  <div class="frente">
                    {simbolos[linhaIndex * colunas + colIndex] === 'diamante' ? '💎' : '❌'}
                  </div>
                </div>
              </div>
            {/each}
          </div>
          <div
            style="width: 80px; color: gold; font-weight: bold; text-align: left;"
          >
            {#if finalizado}
              {#if diamantesPorLinha[linhaIndex] >= 3}
                {#if diamantesPorLinha[linhaIndex] === 3}
                  R$150
                {:else if diamantesPorLinha[linhaIndex] === 4}
                  R$200
                {/if}
              {/if}
            {/if}
          </div>
        </div>
      {/each}
      <div class="result">{resultadoMensagem}</div>
      {#if finalizado}
        <button on:click={comprarRaspadinha}>Jogar Novamente</button>
      {/if}
    {/if}
    <div class="saldo">Saldo: R${saldoAtual.toLocaleString('pt-BR')}</div>
    <button on:click={voltar}>Voltar</button>
  </div>
</div>
