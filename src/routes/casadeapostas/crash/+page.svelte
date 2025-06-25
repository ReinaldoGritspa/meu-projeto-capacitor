<script>
	import { saldo } from '../../../stores/saldo.js';
	import { goto } from '$app/navigation';

	let saldoAtual;
	const aposta = 100;
	let multiplicador = 0.1;
	let jogando = false;
	let crashou = false;
	let retirado = false;
	let mensagem = '';
	let crashPonto = 0;
	let intervalo;

	let aviaoX = 0;
	let aviaoY = 0;
	let rastro = [];

	const maxX = 400;
	const maxY = 250;

	const unsubscribe = saldo.subscribe((value) => {
		saldoAtual = value;
	});

	function iniciarJogo() {
		if (saldoAtual < aposta || jogando) return;

		multiplicador = 0.1;
		aviaoX = 0;
		aviaoY = 0;
		rastro = [];
		crashou = false;
		retirado = false;
		mensagem = '';
		crashPonto = parseFloat((Math.random() * 2.5 + 1.5).toFixed(2));
		jogando = true;

		saldo.update(n => n - aposta);

		intervalo = setInterval(() => {
			multiplicador = parseFloat((multiplicador + 0.05).toFixed(2));
			aviaoX = Math.min(aviaoX + 8, maxX);
			aviaoY = Math.min(aviaoY + 6, maxY);
			rastro = [...rastro, { x: aviaoX, y: aviaoY }];

			if (!retirado && (multiplicador >= crashPonto || multiplicador >= 10.0)) {
				finalizar(false);
			}

			if (retirado && multiplicador >= crashPonto) {
				crashou = true;
				jogando = false;
				clearInterval(intervalo);
				mensagem = `💥 O avião caiu no multiplicador final x${crashPonto}`;
			}
		}, 700);
	}

	function sacar() {
		if (!jogando || crashou || retirado) return;
		const ganho = parseFloat((aposta * multiplicador).toFixed(2));
		saldo.update(n => n + ganho);
		mensagem = `✅ Você sacou com x${multiplicador}. Ganhou R$ ${ganho.toLocaleString('pt-BR')}`;
		retirado = true;
	}

	function finalizar(retiradoComSucesso) {
		if (!retiradoComSucesso) {
			mensagem = '💥 O avião caiu! Você perdeu R$ 100.';
			jogando = false;
			crashou = true;
			clearInterval(intervalo);
		}
	}

	function jogarNovamente() {
		multiplicador = 0.1;
		aviaoX = 0;
		aviaoY = 0;
		rastro = [];
		crashou = false;
		retirado = false;
		mensagem = '';
		crashPonto = 0;
	}

	function voltar() {
		goto('/casadeapostas');
	}
</script>

<div class="pagina-crash">
	<div class="container">
		<img
			src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
			alt="Fortune Panda Logo"
			class="logo"
		/>
		<h2>Aviãozinho</h2>
		<p class="descricao">
			Jogo simples onde o avião sobe e o multiplicador aumenta rápido.<br />
			Saque antes do avião cair! Aposta fixa: R$ 100.
		</p>

		<header>
			<div class="status">
				<div class="multiplicador">x{multiplicador.toFixed(2)}</div>
				<div class="saldo">Saldo: R$ {saldoAtual.toLocaleString('pt-BR')}</div>
			</div>
		</header>

		<div class="grafico">
			<svg class="rastro" viewBox="0 0 450 320" preserveAspectRatio="none">
				{#each rastro as ponto, i (i)}
					{#if i > 0}
						<line
							x1={rastro[i - 1].x}
							y1={300 - rastro[i - 1].y}
							x2={ponto.x}
							y2={300 - ponto.y}
							stroke="#cc0000"
							stroke-width="2"
						/>
					{/if}
				{/each}
				{#if retirado}
					<line
						x1={aviaoX}
						y1={300 - aviaoY}
						x2={maxX}
						y2={300 - maxY}
						stroke="#ff0000"
						stroke-width="2"
						stroke-dasharray="5,5"
					/>
				{/if}
			</svg>
			<div class="aviao" style="left: {aviaoX}px; bottom: {aviaoY}px">✈️</div>
		</div>

		<div class="painel">
			<p>Aposta fixa: R$ 100</p>
			{#if !jogando && !crashou}
				<button on:click={iniciarJogo}>Iniciar</button>
			{/if}
			{#if jogando && !retirado && !crashou}
				<button class="sacar" on:click={sacar}>
					Parar e Sacar (R$ {(aposta * multiplicador).toFixed(2)})
				</button>
			{/if}
			{#if crashou || retirado}
				<button class="jogar-novamente" on:click={jogarNovamente}>Jogar Novamente</button>
			{/if}
			{#if mensagem}
				<p class="mensagem">{mensagem}</p>
				{#if retirado}
					<p>O avião caiu no multiplicador x{crashPonto}</p>
				{/if}
			{/if}
			<button class="voltar" on:click={voltar}>Voltar</button>
		</div>
	</div>
</div>
<style>
	.pagina-crash {
		background-color: #000;
		color: white;
		min-height: 100vh;
		padding: 3rem 1rem;
		box-sizing: border-box;
		font-family: 'Segoe UI', sans-serif;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.container {
		max-width: 480px;
		width: 100%;
	}

	.logo {
		display: block;
		margin: 0 auto 1rem auto;
		width: 160px;
		height: 160px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
	}

	h2 {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: #cc0000;
	}

	.descricao {
		text-align: center;
		font-size: 1rem;
		font-weight: 300;
		margin-bottom: 2rem;
		color: #eee;
	}

	header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.status {
		display: flex;
		justify-content: center;
		gap: 2rem;
		font-size: 1.3rem;
		font-weight: bold;
		color: #cc0000;
	}

	.grafico {
		position: relative;
		width: 100%;
		height: 320px;
		background: linear-gradient(to top, #111, #000);
		border: 2px solid #cc0000;
		border-radius: 10px;
		margin-bottom: 2rem;
		overflow: hidden;
	}

	.rastro {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.aviao {
		position: absolute;
		font-size: 2rem;
		transition: left 0.7s linear, bottom 0.7s linear;
	}

	.painel {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	button {
		background-color: #cc0000;
		color: white;
		font-size: 1.2rem;
		font-weight: bold;
		padding: 0.75rem 2rem;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		box-shadow: 0 0 10px #cc0000;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #990000;
	}

	.sacar {
		background-color: #00cc00;
		box-shadow: 0 0 10px #00cc00;
	}

	.jogar-novamente {
		background-color: #0066ff;
		box-shadow: 0 0 10px #0066ff;
	}

	.voltar {
		background-color: #555;
		box-shadow: none;
		color: #ccc;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		margin-top: 1rem;
	}

	.mensagem {
		font-weight: bold;
		color: #ff4444;
	}
</style>
