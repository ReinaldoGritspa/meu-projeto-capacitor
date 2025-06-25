<script>
	import { saldo } from '../../../stores/saldo.js';
	import { goto } from '$app/navigation';

	const limiteNegativo = -500;
	const limitePositivo = 5000;

	let mensagem = '';
	let dado1 = 1;
	let dado2 = 1;
	const valorAposta = 100;

	let animando = false;

	let saldoAtual;
	const unsubscribe = saldo.subscribe(value => {
		saldoAtual = value;
	});

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function rolarDados() {
		if (animando) return;

		animando = true;
		mensagem = '';

		for (let i = 0; i < 10; i++) {
			dado1 = Math.floor(Math.random() * 6) + 1;
			dado2 = Math.floor(Math.random() * 6) + 1;
			await sleep(70);
		}

		dado1 = Math.floor(Math.random() * 6) + 1;
		dado2 = Math.floor(Math.random() * 6) + 1;
		const soma = dado1 + dado2;

		let novoSaldo = saldoAtual;
		if (soma > 7) {
			novoSaldo += valorAposta;
			mensagem = `Você tirou ${soma} e ganhou R$ ${valorAposta}!`;
		} else {
			novoSaldo -= valorAposta;
			mensagem = `Você tirou ${soma} e perdeu R$ ${valorAposta}! Tente novamente.`;
		}

		if (novoSaldo <= -600) {
			mensagem = 'Você faliu! Reinicie a página para tentar de novo.';
		} else if (novoSaldo >= limitePositivo) {
			mensagem = 'Parabéns! Você ficou rico! Reinicie a página para continuar.';
		}

		saldo.set(novoSaldo);
		animando = false;
	}
	
	function voltar() {
		goto('/casadeapostas');
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
			<h1>Dice</h1>
			<p class="subtexto">Role dois dados. Você precisa tirar uma soma maior que 7 para ganhar R$ 100. Caso contrário, perde R$ 100.</p>
		</header>

		<div class="dados">
			<div class="dado {animando ? 'animar' : ''}">{dado1}</div>
			<div class="dado {animando ? 'animar' : ''}">{dado2}</div>
		</div>

		<div class="botoes">
			<button onclick={rolarDados} disabled={animando || saldoAtual <= limiteNegativo || saldoAtual >= limitePositivo}>
				Rolar Dados
			</button>
			<button onclick={voltar}>Voltar</button>
		</div>

		{#if mensagem}
			<div class="mensagem-box">
				<p>{mensagem}</p>
			</div>
		{/if}
	</div>

	<div class="saldo">
		<span>Saldo: </span> R$ {saldoAtual.toLocaleString('pt-BR')}
	</div>
</div>

<style>
	@keyframes vibrate {
		0% { transform: translate(0); }
		20% { transform: translate(-2px, 2px) rotate(-3deg); }
		40% { transform: translate(-2px, -2px) rotate(3deg); }
		60% { transform: translate(2px, 2px) rotate(-3deg); }
		80% { transform: translate(2px, -2px) rotate(3deg); }
		100% { transform: translate(0); }
	}

	.animar {
		animation: vibrate 0.35s linear infinite;
		transform-origin: center;
	}

	.animar {
		animation-timing-function: ease-in-out;
	}

	.animar {
		animation-iteration-count: infinite;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	.pagina-casadeapostas {
		background-color: #000;
		min-height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 1.5rem 1rem;
		box-sizing: border-box;
		position: relative;
		color: white;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.container {
		width: 100%;
		max-width: 640px;
		text-align: center;
	}

	header {
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
		margin-bottom: 2rem;
	}

	.dados {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.dado {
		width: 100px;
		height: 100px;
		background-color: #121212;
		border: 3px solid #cc0000;
		border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 4rem;
		color: #cc0000;
		user-select: none;
		box-shadow: 0 0 15px #cc0000;
		transition: transform 0.3s ease;
	}

	.botoes {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	button {
		background-color: #cc0000;
		color: #fff;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 10px;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:disabled {
		background-color: #660000;
		cursor: not-allowed;
	}

	button:hover:not(:disabled) {
		background-color: #990000;
	}

	.mensagem-box {
		background-color: #121212;
		border: 3px solid #cc0000;
		color: #cc0000;
		padding: 1rem 2rem;
		border-radius: 15px;
		max-width: 320px;
		margin: 0 auto;
		box-shadow: 0 0 15px #cc0000;
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
</style>
