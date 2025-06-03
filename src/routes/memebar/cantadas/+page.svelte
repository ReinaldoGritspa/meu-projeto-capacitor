<script>
    let cantadaGerada = '';
  
    const cantadas = [
      'Você tem um mapa? Porque acabei de me perder nos seus olhos.',
      'Você é um imã? Porque eu fico completamente atraído por você.',
      'Se você fosse uma fruta, seria uma maçã, porque é impossível resistir a você.',
      'Você é o café que me falta para começar o dia bem.',
      'Será que você tem um nome ou posso te chamar de minha?',
      'Eu sou ruim em matemática, mas consigo fazer uma conta perfeita com você.',
      'Acho que você é meu destino, porque eu não consigo tirar os olhos de você.',
      'Você é feita de estrelas? Porque seu brilho ilumina todo o meu mundo.',
      'Eu não sou fotógrafo, mas consigo imaginar a gente juntos em todas as fotos.',
      'Eu não sou meteorologista, mas posso prever que teremos um futuro brilhante juntos.',
      'Você é eletricista? Porque você ilumina meu mundo.',
      'Se você fosse um livro, eu ficaria o tempo todo te lendo.',
      'Você tem um mapa? Porque eu me perdi nos seus olhos.',
      'Eu sou como um celular, sempre que você chega perto, meu coração começa a bater mais rápido.',
      'Você é Wi-Fi? Porque sinto uma conexão instantânea com você.',
      'Você é tipo um quebra-cabeça, porque é impossível não querer juntar todas as peças.',
      'Você é um foguete? Porque meu coração dispara toda vez que você se aproxima.',
      'Você é o arco-íris depois da tempestade.',
      'Você é uma câmera? Porque toda vez que eu te vejo, sorrio.',
      'Você gosta de matemática? Porque você é a solução dos meus problemas.',
      'Eu não sou uma sobremesa, mas sou a melhor escolha depois de um jantar.',
      'Se a beleza fosse tempo, você seria a eternidade.',
      'Você é a razão de eu acordar todos os dias com um sorriso.',
      'Eu não acredito em mágica, mas você fez meu coração desaparecer.',
      'Você é o pôr do sol do meu dia.',
      'Eu não sou poeta, mas você me inspira a escrever versos.',
      'Você é tipo uma estrela cadente, meu desejo mais sincero.',
      'Seu sorriso é como uma senha, porque sempre que você sorri, eu fico sem palavras.',
      'Você é um sonho que eu nunca quero acordar.',
      'Você é um sol em um dia nublado.',
      'Eu sou como um livro aberto, e você acaba de ler a página que faltava.',
      'Se a beleza fosse um crime, você estaria presa.',
      'Você é o vento que refresca meu coração.',
      'Você é a luz que ilumina a escuridão da minha vida.',
      'Se você fosse um jogo, eu jogaria até o fim.',
      'Você é uma obra de arte que eu adoraria admirar por horas.',
      'Eu não sou astrônomo, mas você é a estrela do meu universo.',
      'Você tem um segredo? Porque você está deixando meu coração disparado.',
      'Eu sou péssimo em poesia, mas você me faz querer escrever versos só para você.'
    ];
  
    function gerarCantada() {
      const indexAleatorio = Math.floor(Math.random() * cantadas.length);
      cantadaGerada = cantadas[indexAleatorio];
    }
  </script>
  
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #F7C1D7;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      position: relative;
      overflow: hidden;
    }
  
    .container {
      position: relative;
      width: 100%;
      max-width: 700px;
      text-align: center;
      padding: 50px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10;
      backdrop-filter: blur(10px);
    }
  
    h1 {
      font-size: 3em;
      margin-bottom: 30px;
      color: #E91E63;
      font-family: 'Courier New', Courier, monospace;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }
  
    .botao {
      background-color: #E91E63;
      color: white;
      font-size: 1.5em;
      padding: 15px 30px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }
  
    .botao:hover {
      background-color: #C2185B;
    }
  
    .resultado {
      margin-top: 30px;
      font-size: 1.4em;
      color: #333;
      font-style: italic;
      background-color: #FDE2E4;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 20;
    }
  
    .resultado p {
      margin: 0;
      color: #E91E63;
      font-weight: bold;
    }
  
    @keyframes flutuarCoracoes {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-30px);
      }
      100% {
        transform: translateY(0);
      }
    }
  
    .coracao {
      position: absolute;
      animation: flutuarCoracoes 5s ease-in-out infinite;
      opacity: 0.5;
    }
  
    .coracao:nth-child(1) {
      top: 10%;
      left: 20%;
      animation-duration: 5s;
    }
  
    .coracao:nth-child(2) {
      top: 30%;
      left: 60%;
      animation-duration: 6s;
    }
  
    .coracao:nth-child(3) {
      top: 50%;
      left: 80%;
      animation-duration: 4.5s;
    }
  
    .coracao:nth-child(4) {
      top: 70%;
      left: 30%;
      animation-duration: 7s;
    }
  
    .coracao:nth-child(5) {
      top: 10%;
      left: 70%;
      animation-duration: 5s;
    }
  
    .coracao:nth-child(6) {
      top: 60%;
      left: 40%;
      animation-duration: 6s;
    }
  
    .coracao::before {
      content: '❤️';
      font-size: 3em;
    }
  </style>
  
  <div class="container">
    <h1>Cantadas Criativas e Elogios 💘</h1>
  
    <button class="botao" on:click={gerarCantada}>Gerar Cantada</button>
  
    {#if cantadaGerada}
      <div class="resultado">
        <p>{cantadaGerada}</p>
      </div>
    {/if}
  
    <div class="coracao"></div>
    <div class="coracao"></div>
    <div class="coracao"></div>
    <div class="coracao"></div>
    <div class="coracao"></div>
    <div class="coracao"></div>
  </div>
  