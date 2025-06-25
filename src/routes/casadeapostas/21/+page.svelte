<script>
  import { saldo } from '../../../stores/saldo.js';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';

  const apostaFixa = 100;

  let deck = [];
  let jogador = [];
  let banca = [];
  let jogoAtivo = false;
  let jogoFinalizado = false;
  let mensagem = '';

  let apostaEmAndamento = false;

  function criarDeck() {
    const naipes = ['♠', '♥', '♦', '♣'];
    const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const novoDeck = [];
    for (const naipe of naipes) {
      for (const valor of valores) {
        novoDeck.push({ valor, naipe });
      }
    }
    return embaralhar(novoDeck);
  }

  function embaralhar(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function calcularPontos(maos) {
    let total = 0;
    let ases = 0;
    for (const carta of maos) {
      if (carta.valor === 'A') {
        ases++;
        total += 11;
      } else if (['J', 'Q', 'K'].includes(carta.valor)) {
        total += 10;
      } else {
        total += parseInt(carta.valor);
      }
    }
    while (total > 21 && ases > 0) {
      total -= 10;
      ases--;
    }
    return total;
  }

  function iniciarJogo() {
    if (get(saldo) < apostaFixa) {
      mensagem = `Saldo insuficiente para apostar R$${apostaFixa}.`;
      return;
    }
    apostaEmAndamento = true;
    deck = criarDeck();
    jogador = [deck.pop()];
    banca = [deck.pop()];
    jogoAtivo = true;
    jogoFinalizado = false;
    mensagem = '';
  }

  function pedirCarta() {
    if (!jogoAtivo || jogoFinalizado) return;
    jogador = [...jogador, deck.pop()];
    const pontos = calcularPontos(jogador);
    if (pontos > 21) {
      finalizarJogo();
    }
  }

  function parar() {
    if (!jogoAtivo || jogoFinalizado) return;
    while (calcularPontos(banca) < 17) {
      banca = [...banca, deck.pop()];
    }
    finalizarJogo();
  }

  function finalizarJogo() {
    jogoFinalizado = true;
    jogoAtivo = false;

    const pontosJogador = calcularPontos(jogador);
    const pontosBanca = calcularPontos(banca);

    if (pontosJogador > 21) {
      mensagem = 'Você estourou! Perdeu a aposta.';
      saldo.update(n => n - apostaFixa);
    } else if (pontosBanca > 21) {
      mensagem = 'Banca estourou! Você ganhou!';
      saldo.update(n => n + apostaFixa);
    } else if (pontosJogador > pontosBanca) {
      mensagem = 'Você ganhou!';
      saldo.update(n => n + apostaFixa);
    } else if (pontosJogador === pontosBanca) {
      mensagem = 'Empate! Sua aposta foi devolvida.';
      // saldo não muda
    } else {
      mensagem = 'Você perdeu!';
      saldo.update(n => n - apostaFixa);
    }

    apostaEmAndamento = false;
  }

  function voltar() {
    goto('/casadeapostas');
  }

  function formatarCarta(carta) {
    const corVermelha = carta.naipe === '♥' || carta.naipe === '♦';
    return `<span style="color:${corVermelha ? '#cc0000' : 'white'}; user-select:none">${carta.valor}${carta.naipe}</span>`;
  }
</script>

<style>
  .pagina-blackjack {
    min-height: 100vh;
    background-color: #000;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }

  .container {
    max-width: 640px;
    width: 100%;
    background-color: #121212;
    border: 2px solid #cc0000;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 0 20px #cc0000;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
    margin: 0 auto 1rem;
    display: block;
  }

  h1 {
    font-size: 2.5rem;
    color: #cc0000;
    margin: 0;
    letter-spacing: 1px;
  }

  .saldo {
    position: fixed;
    top: 8rem;
    right: 1rem;
    background-color: #121212;
    border: 2px solid #cc0000;
    color: #cc0000;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    user-select: none;
    box-shadow: 0 0 8px #cc0000;
    z-index: 1000;
  }

  .botoes {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  button {
    background-color: #cc0000;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 0 12px #cc0000;
    transition: background-color 0.3s ease;
    user-select: none;
  }

  button:hover:not(:disabled) {
    background-color: #990000;
  }

  button:disabled {
    background-color: #660000;
    cursor: not-allowed;
    box-shadow: none;
  }

  .cartas {
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    font-size: 3rem;
    user-select: none;
    margin-bottom: 1rem;
  }

  .mensagem {
    text-align: center;
    font-size: 1.4rem;
    color: gold;
    min-height: 2rem;
    margin-bottom: 1rem;
  }

  .voltar {
    background-color: transparent;
    border: 2px solid #cc0000;
    color: #cc0000;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    margin: 0 auto;
    width: 120px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .voltar:hover {
    background-color: #cc0000;
    color: white;
  }

  .carta-oculta {
    font-size: 3rem;
    color: #cc0000;
    user-select: none;
  }
</style>

<div class="pagina-blackjack">
  <div class="container">
    <header>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
        alt="Fortune Panda Logo"
        class="logo"
      />
      <h1>Blackjack 21</h1>
      <p style="text-align:center; margin-top:0.5rem; font-weight: 300; color:#cc4444;">
        Aposta fixa de R$ {apostaFixa}. Tente tirar mais que 21 e vencer a banca!
      </p>
    </header>

    <div>
      <h2>Suas cartas ({calcularPontos(jogador)})</h2>
      <div class="cartas" aria-label="Cartas do jogador">
        {@html jogador.map(carta => formatarCarta(carta)).join(' ')}
      </div>

      <h2>Cartas da banca {#if jogoFinalizado}({calcularPontos(banca)}){/if}</h2>
<div class="cartas" aria-label="Cartas da banca">
  {#if jogoFinalizado}
    {@html banca.map(carta => formatarCarta(carta)).join(' ')}
  {:else}
    {#if banca.length > 0}
      {@html formatarCarta(banca[0])}
      <span class="carta-oculta">❓</span>
    {/if}
  {/if}
</div>

      <div class="mensagem">{mensagem}</div>

      <div class="botoes">
        <button onclick={iniciarJogo} disabled={jogoAtivo && !jogoFinalizado}>
          {jogoAtivo && !jogoFinalizado ? 'Jogo em andamento' : 'Iniciar Jogo'}
        </button>
        <button onclick={pedirCarta} disabled={!jogoAtivo || jogoFinalizado}>
          Pedir Carta
        </button>
        <button onclick={parar} disabled={!jogoAtivo || jogoFinalizado}>
          Parar
        </button>
      </div>

      <button class="voltar" onclick={voltar}>Voltar</button>
    </div>
  </div>

  <div class="saldo">Saldo: R$ { $saldo }</div>
</div>
