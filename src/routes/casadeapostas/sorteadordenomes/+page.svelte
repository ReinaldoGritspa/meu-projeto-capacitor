<script>
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
</script>

<div class="container">
	<h2> Sorteador de Nomes</h2>
	<textarea bind:value={nomesTexto} rows="8" placeholder="Digite um nome por linha..."></textarea>

	<div class="controls">
		<label>
			Sortear quantos?
			<input type="number" bind:value={quantidade} min="1" />
		</label>
		<button on:click={sortear}>Sortear</button>
	</div>

	{#if resultado.length > 0}
		<h3> Resultado:</h3>
		<ul>
			{#each resultado as nome}
				<li>{nome}</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.container {
		max-width: 500px;
		margin: 2rem auto;
		background: #fff;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	textarea {
		width: 100%;
		padding: 10px;
		font-size: 1em;
		margin-bottom: 1rem;
	}
	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	button {
		padding: 8px 15px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
	}
	button:hover {
		background-color: #0056b3;
	}
	ul {
		text-align: left;
		margin-top: 1rem;
	}
</style>
