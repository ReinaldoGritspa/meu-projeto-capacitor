<script>
	import { saldo } from '../../stores/saldo.js';
	import { goto } from '$app/navigation';

	const limiteNegativo = -500;
	const limitePositivo = 5000;

	let mensagem = '';
	let mostrarConfirm = false;

	let saldoAtual;
	const unsubscribe = saldo.subscribe(value => {
		saldoAtual = value;
	});

	const jogos = [
		{
			rota: '/casadeapostas/sorteadordenomes',
			nome: 'Sorteador de Nomes',
			img: 'https://st.depositphotos.com/1001976/2015/v/450/depositphotos_20157375-stock-illustration-shiny-four-leaf-clover-with.jpg'
		},
		{
			rota: '/casadeapostas/roleta',
			nome: 'Roulette',
			img: 'https://bloximages.chicago2.vip.townnews.com/atlanticcityweekly.com/content/tncms/assets/v3/editorial/6/d2/6d205506-7342-50de-8faf-c3ec2f73d78a/5f8dee9f79743.image.jpg?resize=667%2C500'
		},
		{
			rota: '/casadeapostas/21',
			nome: 'Blackjack 21',
			img: 'https://images.prismic.io/desplaines-rushstreetgaming/1c8e0aa3-6b2d-4f01-a49e-15b556dc0882_03253_March-Blackjack-Blowout-Email_Image_1200x650_v1_210223.jpg?auto=compress,format'
		},
		{
			rota: '/casadeapostas/dice',
			nome: 'Dice',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT60MhdTN3P20RH_alvm1oAQcjHrMqA3inFNWWNSaEq4qpl-xALe0XxXKcAerH1Oml3V_o&usqp=CAU'
		},
	];

	function acessar(jogo) {
		if (mensagem) return;

		if (saldoAtual <= limiteNegativo) {
			mensagem = 'Você faliu! Tenha mais juízo. Reinicie a banca para tentar novamente.';
			return;
		}

		if (saldoAtual >= limitePositivo) {
			mensagem = 'Parabéns! Você ficou rico! Tenha mais juízo. Reinicie a banca para continuar.';
			return;
		}

		goto(jogo.rota);
	}

	function abrirConfirm() {
		mostrarConfirm = true;
	}

	function cancelarConfirm() {
		mostrarConfirm = false;
	}

	function confirmarReinicio() {
		saldo.set(1000);
		mensagem = '';
		mostrarConfirm = false;
	}
</script>

<div class="pagina-casadeapostas">
	<div class="container">
		<header>
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
				alt="Fortune Panda Logo"
				class="logo"
			/>
			<h1>Fortune Panda</h1>
			<p class="subtexto">Entre no mundo da sorte com estilo e ousadia.</p>
		</header>

		<div class="cards">
			{#each jogos as jogo}
				<div class="card" onclick={() => acessar(jogo)}>
					<img src={jogo.img} alt={jogo.nome} class="jogo-img" />
					<div class="nome">{jogo.nome}</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="saldo">
		<span>Saldo: </span> R$ {saldoAtual.toLocaleString('pt-BR')}
	</div>

	<button class="btn-reiniciar" onclick={abrirConfirm}>Reiniciar Banca</button>

	{#if mensagem}
		<div class="overlay">
			<div class="mensagem-box">
				<p>{mensagem}</p>
				<button onclick={() => (mensagem = '')}>Fechar</button>
			</div>
		</div>
	{/if}

	{#if mostrarConfirm}
		<div class="overlay">
			<div class="mensagem-box">
				<p>Tem certeza que deseja reiniciar a banca?</p>
				<button onclick={confirmarReinicio}>Sim</button>
				<button onclick={cancelarConfirm}>Não</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.pagina-casadeapostas {
		min-height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 10rem 1rem 1.5rem 1rem;
		box-sizing: border-box;
		position: relative;
		background-color: #000;
		color: white;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.container {
		width: 100%;
		max-width: 640px;
	}

	header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.logo {
		width: 180px;
		height: 180px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
		margin-bottom: 1.2rem;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	h1 {
		font-size: 2.5rem;
		color: #fff;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: 0.3rem;
	}

	.subtexto {
		color: #cc0000;
		font-size: 1rem;
		font-weight: 300;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.card {
		background-color: #121212;
		border: 2px solid #cc0000;
		border-radius: 12px;
		padding: 1rem;
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		text-align: center;
		color: white;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 200px;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 0 12px #cc0000;
	}

	.jogo-img {
		width: 120px;
		height: 120px;
		object-fit: cover;
		border-radius: 10px;
		margin-bottom: 0.75rem;
	}

	.nome {
		color: white;
		font-size: 1rem;
	}

	.saldo {
		position: fixed;
		top: 5rem;
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

	.btn-reiniciar {
		position: fixed;
		top: 9rem;
		right: 1rem;
		background-color: #cc0000;
		color: white;
		font-weight: bold;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 12px;
		cursor: pointer;
		box-shadow: 0 0 8px #cc0000;
		z-index: 1000;
		transition: background-color 0.3s ease;
	}

	.btn-reiniciar:hover {
		background-color: #990000;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.85);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1100;
	}

	.mensagem-box {
		background-color: #121212;
		border: 3px solid #cc0000;
		color: #cc0000;
		padding: 2rem 3rem;
		border-radius: 15px;
		text-align: center;
		max-width: 320px;
		box-shadow: 0 0 15px #cc0000;
	}

	.mensagem-box p {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.mensagem-box button {
		background-color: #cc0000;
		color: #fff;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 10px;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin: 0 0.5rem;
	}

	.mensagem-box button:hover {
		background-color: #990000;
	}
</style>
