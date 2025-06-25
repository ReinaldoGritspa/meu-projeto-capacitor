<script>
	import { saldo } from '../../../stores/saldo.js';
	import { goto } from '$app/navigation';

	const emojis = ['🍒', '🍋', '🍉'];
	let slots = ['❓', '❓', '❓'];
	let isSpinning = false;
	let resultMessage = '';
	let apostaMessage = '';

	let saldoAtual;
	const unsubscribe = saldo.subscribe(v => saldoAtual = v);

	function randomEmoji() {
		return emojis[Math.floor(Math.random() * emojis.length)];
	}

	async function spin() {
		if (isSpinning) return;
		if (saldoAtual <= 0) {
			resultMessage = 'Saldo insuficiente para jogar. Reinicie a banca.';
			return;
		}
		isSpinning = true;
		apostaMessage = 'Você está apostando R$100.';
		resultMessage = '';
		const aposta = 100;

		saldo.update(s => s - aposta);

		const spinTimes = 15;
		for (let i = 0; i < spinTimes; i++) {
			slots = [
				randomEmoji(),
				randomEmoji(),
				randomEmoji()
			];
			await new Promise(r => setTimeout(r, 100 + i * 20));
		}

		apostaMessage = '';

		if (slots[0] === slots[1] && slots[1] === slots[2]) {
			const premio = aposta * 5;
			resultMessage = `🎉 Você ganhou R$${premio.toLocaleString('pt-BR')}! Três ${slots[0]}! 🎉`;
			saldo.update(s => s + premio);
		} else {
			resultMessage = '😞 Você perdeu! Tente novamente.';
		}

		isSpinning = false;
	}

	function voltar() {
		goto('/casadeapostas');
	}
</script>

<style>
	.pagina-roleta {
		background: #000;
		color: white;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		min-height: 100vh;
		padding: 2rem 1rem 3rem;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.container {
		max-width: 400px;
		width: 100%;
		padding: 1.5rem;
		background: #111;
		border-radius: 12px;
		box-shadow: 0 0 35px rgba(204, 0, 0, 0.7);
		text-align: center;
		position: relative;
	}

	header {
		margin-bottom: 1rem;
	}

	.logo {
		width: 140px;
		height: 140px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 25px #cc0000;
		margin: 0 auto 0.75rem;
		display: block;
	}

	h1 {
		color: #cc0000;
		font-weight: 700;
		margin: 0;
		font-size: 2rem;
		letter-spacing: 1.2px;
		text-transform: uppercase;
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

	.slots {
		display: flex;
		justify-content: center;
		font-size: 5rem;
		margin-bottom: 1.5rem;
		user-select: none;
	}

	.slot {
		width: 80px;
		height: 80px;
		background: #222;
		border-radius: 10px;
		margin: 0 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: inset 0 0 15px #cc0000;
		color: white;
	}

	button {
		padding: 1rem 2rem;
		font-size: 1.2rem;
		border: none;
		border-radius: 10px;
		background: #cc0000;
		color: white;
		cursor: pointer;
		box-shadow: 0 0 15px #cc0000;
		transition: background-color 0.3s ease;
		user-select: none;
		margin: 0.5rem 0.75rem;
	}

	button:disabled {
		background-color: #660000;
		cursor: not-allowed;
		box-shadow: none;
	}

	button:hover:not(:disabled) {
		background-color: #ff0000;
	}

	.result {
		margin-top: 1.5rem;
		font-size: 1.25rem;
		min-height: 2.2rem;
		color: gold;
	}

	.aposta-msg {
		font-size: 1rem;
		color: #ffcc00;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.voltar-btn {
		background-color: #222;
		border: 2px solid #cc0000;
		color: #cc0000;
		box-shadow: 0 0 12px #cc0000;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		border-radius: 10px;
		margin-top: 1rem;
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	.voltar-btn:hover {
		background-color: #cc0000;
		color: white;
		box-shadow: 0 0 20px #ff0000;
	}
</style>

<div class="pagina-roleta">
	<div class="container">
		<header>
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
				alt="Fortune Panda Logo"
				class="logo"
			/>
			<h1>Roleta Fortuna</h1>
		</header>

		<div class="aposta-msg">{apostaMessage}</div>

		<div class="slots">
			<div class="slot">{slots[0]}</div>
			<div class="slot">{slots[1]}</div>
			<div class="slot">{slots[2]}</div>
		</div>

		<button onclick={spin} disabled={isSpinning}>
			{isSpinning ? 'Girando...' : 'Girar'}
		</button>

		<button class="voltar-btn" onclick={voltar}>Voltar</button>

		<div class="result">{resultMessage}</div>
	</div>

	<div class="saldo">Saldo: R$ {saldoAtual.toLocaleString('pt-BR')}</div>
</div>
