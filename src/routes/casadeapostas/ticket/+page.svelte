<script>
    import { saldo } from '../../../stores/saldo.js';
    import { goto } from '$app/navigation';
  
    let linhas = 3;
    let colunas = 4;
    let simbolos = [];
    let jogoAtivo = false;
    let finalizado = false;
    let premioAcumulado = 0;
    let resultadoMensagem = '';
    let saldoAtual;
    const unsubscribe = saldo.subscribe(v => saldoAtual = v);
  
    function gerarSimbolos() {
      let tabuleiro = Array.from({ length: linhas * colunas }, () => 'outro');
      let bombasPosicoes = [];
      let diamantesPosicoes = [];
  
      while (bombasPosicoes.length < 3) {
        let pos = Math.floor(Math.random() * (linhas * colunas));
        if (!bombasPosicoes.includes(pos)) bombasPosicoes.push(pos);
      }
  
      let diamantesContador = 0;
      while (diamantesContador < 3) {
        let pos = Math.floor(Math.random() * (linhas * colunas));
        if (!bombasPosicoes.includes(pos) && !diamantesPosicoes.includes(pos)) {
          diamantesPosicoes.push(pos);
          diamantesContador++;
        }
      }
  
      bombasPosicoes.forEach(pos => tabuleiro[pos] = 'bomba');
      diamantesPosicoes.forEach(pos => tabuleiro[pos] = 'diamante');
  
      simbolos = tabuleiro;
    }
  
    function comprarRaspadinha() {
      if (jogoAtivo) return;
      if (saldoAtual < 100) {
        resultadoMensagem = 'Saldo insuficiente para comprar uma raspadinha.';
        return;
      }
  
      saldo.update(s => s - 100);
      jogoAtivo = true;
      finalizado = false;
      premioAcumulado = 0;
      resultadoMensagem = '';
  
      gerarSimbolos();
    }
  
    function rasparPosicao(index) {
      if (!jogoAtivo || finalizado || simbolos[index] === 'revelado') return;
  
      simbolos[index] = simbolos[index] === 'bomba' ? '💥' : simbolos[index] === 'diamante' ? '💎' : '🔲';
      verificarPremio();
    }
  
    function verificarPremio() {
      if (simbolos.some(s => s === '💥')) {
        resultadoMensagem = '💥 Você encontrou uma bomba e perdeu!';
        finalizarJogo();
        return;
      }
  
      let ganhou = false;
      for (let i = 0; i < linhas; i++) {
        let linha = simbolos.slice(i * colunas, (i + 1) * colunas);
        if (linha.every(s => s === '💎')) {
          ganhou = true;
          premioAcumulado = saldoAtual * 2;
          saldo.update(s => s + premioAcumulado);
          resultadoMensagem = `🎉 Você encontrou 3 diamantes seguidos na linha ${i + 1}! Dobrou sua banca!`;
          break;
        }
      }
  
      if (!ganhou && simbolos.every(s => s !== '🔲')) {
        resultadoMensagem = 'Você raspou todas as posições e não encontrou 3 diamantes consecutivos!';
        finalizarJogo();
      }
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
  </style>
  
  <div class="pagina-sorteador">
    <div class="container">
      <h2>Raspadinha</h2>
      <p class="descricao">
        Compre uma raspadinha por R$100 e descubra o seu prêmio. Encontre 3 diamantes seguidos na mesma linha para dobrar sua banca. Se encontrar uma bomba, você perde tudo!
      </p>
  
      {#if !jogoAtivo}
        <button on:click={comprarRaspadinha}>Comprar Raspadinha</button>
      {/if}
  
      <div class="grid">
        {#each simbolos as simbolo, index}
          <div class="carta" on:click={() => rasparPosicao(index)}>
            <div>{simbolo === '🔲' ? '🔲' : simbolo}</div>
          </div>
        {/each}
      </div>
  
      <p class="result">{resultadoMensagem}</p>
      <p>Prêmio Acumulado: R$ {premioAcumulado.toLocaleString('pt-BR')}</p>
  
      <button on:click={voltar}>Voltar</button>
      <div class="saldo">Saldo: R$ {saldoAtual.toLocaleString('pt-BR')}</div>
    </div>
  </div>
  