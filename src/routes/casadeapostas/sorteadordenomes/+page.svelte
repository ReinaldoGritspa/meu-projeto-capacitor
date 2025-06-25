<script>
	import { goto } from '$app/navigation';

	let nomesTexto = '';
	let quantidade = 1;
	let resultado = [];

	function sortear() {
		const nomes = nomesTexto
			.split('\n')
			.map(n => n.trim())
			.filter(n => n !== '');

		if (quantidade < 1 || quantidade > nomes.length) {
			alert('Quantidade inválida.');
			return;
		}

		const pool = [...nomes];
		const sorteados = [];

		for (let i = 0; i < quantidade; i++) {
			const index = Math.floor(Math.random() * pool.length);
			sorteados.push(pool.splice(index, 1)[0]);
		}

		resultado = sorteados;
	}

	function voltar() {
		goto('/casadeapostas');
	}
</script>

<div class="pagina-sorteador">
	<div class="container">
		<img
			src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYL1l0eZI3UV6OG9wEeFeaAPjLObxv047x21ZB74Mh-Ppc4eE8cizZ6gBbo-bAwG1DhM&usqp=CAU"
			alt="Fortune Panda Logo"
			class="logo"
		/>
		<h2>Sorteador de Nomes</h2>
		<p class="descricao">
			Este é um sorteador simples de nomes. Digite um nome por linha e escolha quantos deseja sortear.<br/>
			Não envolve apostas ou dinheiro, é só para diversão.
		</p>

		<textarea bind:value={nomesTexto} rows="8" placeholder="Digite um nome por linha..."></textarea>

		<div class="controls">
			<label>
				Sortear quantos?
				<input type="number" bind:value={quantidade} min="1" max={nomesTexto.split('\n').filter(n => n.trim() !== '').length} />
			</label>
			<button onclick={sortear}>Sortear</button>
		</div>

		{#if resultado.length > 0}
			<h3>Resultado:</h3>
			<ul>
				{#each resultado as nome}
					<li>{nome}</li>
				{/each}
			</ul>
		{/if}

		<button class="btn-voltar" onclick={voltar}>Voltar</button>
	</div>
</div>

<style>
	.pagina-sorteador {
		min-height: 100vh;
		background-color: #000;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 3rem 1rem 5rem 1rem;
		box-sizing: border-box;
		color: #8b0000;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.container {
		background: #fff;
		color: #8b0000;
		max-width: 600px;
		width: 100%;
		padding: 2rem 2.5rem;
		border-radius: 15px;
		box-shadow: 0 0 25px rgba(139, 0, 0, 0.7);
		position: relative;
	}

	.logo {
		display: block;
		margin: 0 auto 1.5rem auto;
		width: 140px;
		height: 140px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 25px rgba(139, 0, 0, 0.7);
	}

	h2 {
		margin-top: 0;
		font-weight: 700;
		font-size: 2.2rem;
		text-align: center;
		letter-spacing: 1.2px;
		text-transform: uppercase;
	}

	.descricao {
		font-size: 1.1rem;
		color: #8b0000;
		margin: 0 0 1.8rem 0;
		text-align: center;
		line-height: 1.5;
	}

	textarea {
		width: 100%;
		height: 170px;
		background: #fff;
		color: #8b0000;
		border: 2px solid #8b0000;
		border-radius: 10px;
		padding: 12px 15px;
		font-size: 1rem;
		resize: vertical;
		box-shadow: inset 0 0 10px #8b0000;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1.5rem 0;
		gap: 1rem;
		flex-wrap: wrap;
	}

	label {
		flex-grow: 1;
		color: #8b0000;
		font-weight: 600;
		font-size: 1rem;
		user-select: none;
	}

	input[type="number"] {
		margin-left: 10px;
		width: 4.5rem;
		padding: 6px 8px;
		font-size: 1rem;
		border-radius: 8px;
		border: 2px solid #8b0000;
		background: #fff;
		color: #8b0000;
		box-shadow: inset 0 0 10px #8b0000;
	}

	button {
		padding: 0.85rem 1.9rem;
		background-color: #8b0000;
		color: white;
		font-weight: 700;
		font-size: 1.1rem;
		border: none;
		border-radius: 10px;
		box-shadow: 0 0 12px rgba(139, 0, 0, 0.7);
		cursor: pointer;
		transition: background-color 0.3s ease;
		user-select: none;
		flex-shrink: 0;
	}

	button:hover {
		background-color: #a00000;
		box-shadow: 0 0 20px #b22222;
	}

	h3 {
		color: #8b0000;
		font-size: 1.8rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	ul {
		list-style-type: none;
		padding-left: 0;
		color: #8b0000;
		font-size: 1.3rem;
		text-align: center;
	}

	li {
		padding: 0.25rem 0;
		border-bottom: 1px solid #8b0000;
		max-width: 300px;
		margin: 0.2rem auto;
	}

	.btn-voltar {
		display: block;
		margin: 2rem auto 0 auto;
		width: 120px;
		background-color: #222;
		color: #eee;
		font-weight: 700;
		font-size: 1rem;
		border-radius: 8px;
		box-shadow: 0 0 12px #444;
		transition: background-color 0.3s ease;
	}

	.btn-voltar:hover {
		background-color: #444;
		box-shadow: 0 0 20px #666;
	}
</style>
