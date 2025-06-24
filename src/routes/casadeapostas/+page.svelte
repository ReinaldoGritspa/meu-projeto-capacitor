<script>
	import { goto } from '$app/navigation';

	const jogos = [
		{ rota: '/casadeapostas/sorteadordenomes', nome: 'Sorteador de Nomes', cor: '#4CAF50' },
		{ rota: '/casadeapostas/roleta', nome: 'Roulette', cor: '#E53935' },
		{ rota: '/casadeapostas/21', nome: 'Blackjack 21', cor: '#3F51B5' },
		{ rota: '/casadeapostas/dice', nome: 'Dice', cor: '#FF9800' },
	];

	function acessar(rota) {
		goto(rota);
	}
</script>

<div class="container">
	<header>
		<img
			src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
			alt="Fortune Panda Logo"
			class="logo"
		/>
		<h1>Fortune Panda</h1>
		<p>Entre no mundo da sorte com estilo!</p>
	</header>

	<div class="cards">
		{#each jogos as jogo}
			<div class="card" style="border-color: {jogo.cor}" on:click={() => acessar(jogo.rota)}>
				<div class="nome">{jogo.nome}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.container {
		max-width: 1200px;
		margin: 2rem auto;
		text-align: center;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
	}

	.logo {
		width: 120px;
		height: 120px;
		object-fit: contain;
		margin-bottom: 1rem;
		border-radius: 50%;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #222;
		margin-bottom: 0.5rem;
	}

	p {
		color: #666;
		font-size: 1.2rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.card {
		background: white;
		border: 3px solid;
		border-radius: 12px;
		padding: 2rem 1.5rem;
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
	}
</style>
