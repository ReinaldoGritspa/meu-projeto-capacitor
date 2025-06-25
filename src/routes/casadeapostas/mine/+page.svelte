<script>
    import { saldo } from '../../../stores/saldo.js';
    import { goto } from '$app/navigation';
  
    let totalCartas = 25;
    let numBombas = 10; // Fixar número de bombas em 10
    let cartas = [];
    let jogoAtivo = false;
    let finalizado = false;
    let premioAcumulado = 0;
    let cliquesCertos = 0;
    let resultadoMensagem = '';
    let animacaoFinal = '';
    let saldoAtual;
    const unsubscribe = saldo.subscribe(v => saldoAtual = v);
  
    // Função para calcular o multiplicador com base no número de acertos
    function multiplicadorBase() {
      return 0.05; // Multiplicador fixo para o jogo de 10 bombas
    }
  
    // Função para calcular o valor do prêmio
    function calcularPremio(acertos) {
      const incremento = multiplicadorBase(); // Multiplicador fixo
      const premioAtual = Math.round(100 * (1 + incremento * acertos) * 0.5); // Ajusta o prêmio com base no número de acertos
      return premioAtual;
    }
  
    async function iniciarJogo() {
      if (jogoAtivo) return;
      if (saldoAtual < 100) {
        resultadoMensagem = 'Saldo insuficiente para iniciar o jogo.';
        return;
      }
  
      saldo.update(s => s - 100);
  
      const cartasVazias = Array.from({ length: totalCartas }, () => ({
        tipo: 'premio',
        emoji: '💰',
        revelada: false,
        virando: false,
      }));
  
      let indices = Array.from({ length: totalCartas }, (_, i) => i);
      indices.sort(() => Math.random() - 0.5);
      let bombas = indices.slice(0, numBombas);
  
      bombas.forEach(i => {
        cartasVazias[i] = {
          tipo: 'bomba',
          emoji: '💣',
          revelada: false,
          virando: false,
        };
      });
  
      cartas = cartasVazias;
      jogoAtivo = true;
      finalizado = false;
      premioAcumulado = 0;
      cliquesCertos = 0;
      resultadoMensagem = '';
      animacaoFinal = '';
    }
  
    async function clicarCarta(index) {
      if (!jogoAtivo || cartas[index].revelada || finalizado) return;
  
      cartas[index].virando = true;
      await new Promise(r => setTimeout(r, 300));
      cartas[index].revelada = true;
      cartas[index].virando = false;
  
      const carta = cartas[index];
  
      if (carta.tipo === 'bomba') {
        resultadoMensagem = '💥 Você clicou em uma bomba e perdeu tudo!';
        premioAcumulado = 0;
        cliquesCertos = 0;
        animacaoFinal = 'perdeu';
        finalizarJogo();
      } else {
        cliquesCertos++;
        const premioAtual = calcularPremio(cliquesCertos); // Calcula o prêmio com base no número de acertos
        premioAcumulado += premioAtual;
        resultadoMensagem = `🎉 Ganhou R$${premioAtual.toLocaleString('pt-BR')}! Acumulado: R$${premioAcumulado.toLocaleString('pt-BR')}`;
      }
    }
  
    function parar() {
      if (!jogoAtivo || finalizado || premioAcumulado === 0) return;
      saldo.update(s => s + premioAcumulado);
      resultadoMensagem = `🏆 Você parou e levou R$${premioAcumulado.toLocaleString('pt-BR')}!`;
      animacaoFinal = 'sacou';
      finalizarJogo();
    }
  
    function finalizarJogo() {
      cartas = cartas.map(c => ({ ...c, revelada: true }));
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
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow-x: hidden;
    }

    .container {
      max-width: 500px;
      width: 100%;
      padding: 1.5rem;
      background: #111;
      border-radius: 12px;
      box-shadow: 0 0 35px rgba(204, 0, 0, 0.7);
      text-align: center;
      transition: all 0.6s ease;
    }

    .container.sacou {
      box-shadow: 0 0 35px 10px limegreen;
    }

    .container.perdeu {
      box-shadow: 0 0 35px 10px red;
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
      grid-template-columns: repeat(5, 60px);
      gap: 10px;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .carta {
      width: 60px;
      height: 60px;
      font-size: 2rem;
      background: #333;
      color: white;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 600px;
      cursor: pointer;
      position: relative;
    }

    .carta-inner {
      transition: transform 0.4s;
      transform-style: preserve-3d;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .carta.virando .carta-inner {
      transform: rotateY(180deg);
    }

    .carta.revelada .carta-inner {
      transform: rotateY(180deg);
    }

    .carta.frente,
    .carta.verso {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      border-radius: 6px;
    }

    .carta.frente {
      background-color: #222;
      transform: rotateY(180deg);
    }

    .carta.verso {
      background-color: #444;
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

    select {
      padding: 0.4rem;
      font-size: 1rem;
      border-radius: 6px;
      margin-left: 0.5rem;
    }

    .saldo {
      margin-top: 2rem;
      text-align: center;
      font-size: 1.2rem;
      color: #0f0;
    }

    @media (max-width: 600px) {
      .container {
        padding: 1rem;
        max-width: 100%;
      }

      .grid {
        grid-template-columns: repeat(5, 50px);
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
        padding: 1rem;
      }

      .descricao {
        font-size: 0.9rem;
      }
    }
</style>

<div class="pagina-sorteador">
  <div class="container {animacaoFinal}">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
      alt="Logo do Jogo"
      class="logo"
    />
    <h2>Campo Minado</h2>
    <p class="descricao">
      Um jogo de sorte e risco! Você escolhe o número de bombas e tenta evitar as explosões para ganhar dinheiro.<br />
      O prêmio cresce a cada acerto, mas se clicar numa bomba, perde tudo.<br />
      Você começa pagando R$100 por jogo.<br />
      <strong>Jogo fixo com 10 bombas.</strong>
    </p>

    {#if !jogoAtivo}
      <button on:click={iniciarJogo}>Iniciar Jogo</button>
    {/if}

    <div class="grid">
      {#each cartas as carta, index}
        <div
          class="carta {carta.revelada ? 'revelada' : ''} {carta.virando ? 'virando' : ''}"
          on:click={() => clicarCarta(index)}
        >
          <div class="carta-inner">
            <div class="carta verso">🂠</div>
            <div class="carta frente">{carta.emoji}</div>
          </div>
        </div>
      {/each}
    </div>

    <p class="result">{resultadoMensagem}</p>
    <p>Prêmio acumulado: R$ {premioAcumulado.toLocaleString('pt-BR')}</p>

    {#if jogoAtivo}
      <button on:click={parar}>Parar e sacar</button>
    {/if}

    <button on:click={voltar}>Voltar</button>

    <div class="saldo">Saldo: R$ {saldoAtual.toLocaleString('pt-BR')}</div>
  </div>
</div>
