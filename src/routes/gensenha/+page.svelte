<script>
	let senha = $state(['']);
	let maximo = $state(12);
	let caracteres = $state('');
	let caractamanho = $state(0);
	let minusculas = $state(true);
	let maiuscula = $state(true);
	let numericos = $state(true);
	let caracteresespeciais = $state(true);
	let lista = $state(['']);
	let listatrue = $state(false);

	function atualizarCaracteres() {
		let novaLista = '';
		if (minusculas) novaLista += 'abcdefghijklmnopqrstuvwxyz';
		if (maiuscula) novaLista += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (numericos) novaLista += '0123456789';
		if (caracteresespeciais) novaLista += '!@#$%&*()_+';
		caracteres = novaLista;
		caractamanho = caracteres.length;
		gerarsenha();
	}

	function gerarsenha() {
		let novaSenha = [];
		for (let i = 0; i < maximo; i++) {
			let aleatorio = caracteres.charAt(Math.floor(Math.random() * caractamanho));
			novaSenha.push(aleatorio);
		}
		senha = novaSenha;
	}

	function gerarlista() {
		listatrue = true;
		lista = [];
		for (let i = 0; i <= 5; i++) {
			let novaSenha = [];
			for (let j = 0; j < maximo; j++) {
				let aleatorio = caracteres.charAt(Math.floor(Math.random() * caractamanho));
				novaSenha.push(aleatorio);
			}
			lista.push(novaSenha.join(''));
		}
		console.log(lista);
	}

	function copiarsenha(e) {
		navigator.clipboard.writeText(senha.join(''));
		setTimeout(() => {
			e.target.innerText = 'Copiado!';
			setTimeout(() => {
				e.target.innerText = 'Copiar senha 🔗';
			}, 1000);
		}, 100);
	}

	atualizarCaracteres();
</script>

<div class="container">
	<h3>Gerador de Senha</h3>

	<div class="senha-box">
		<span>{senha.join('')}</span>
	</div>

	<label for="range"
		>Tamanho da senha: <output id="num"
			><input type="number" bind:value={maximo} style="width: 50px;" /></output
		></label
	>
	<input type="range" bind:value={maximo} min="4" max="20" />

	<button onclick={gerarsenha} class="btn btn-primary">Gerar senha 🔄</button>
	<button onclick={copiarsenha} class="btn btn-success">Copiar senha 🔗</button>

	<br /> Letras maiúsculas:
	<input type="checkbox" id="maiusculas" bind:checked={maiuscula} onchange={atualizarCaracteres} />

	<br /> Letras minúsculas:
	<input type="checkbox" id="minusculas" bind:checked={minusculas} onchange={atualizarCaracteres} />

	<br /> Caracteres numéricos:
	<input type="checkbox" id="numericos" bind:checked={numericos} onchange={atualizarCaracteres} />

	<br /> Caracteres especiais:
	<input
		type="checkbox"
		id="caracteresespeciais"
		bind:checked={caracteresespeciais}
		onchange={atualizarCaracteres}
	/>
	<br />
	<button onclick={gerarlista} class="btn btn-light" style="background-color: #dbdbdb;"
		>Gerar lista de senhas 🗂️</button
	>
	{#if listatrue}
		<button onclick={() => (listatrue = false)} class="btn btn-danger">Fechar lista ❌</button>
	{/if}
	{#if lista.length > 1 && listatrue}
		{#each lista as item, i}
			<div class="senha-box">
				<span>{item}</span>
				<button onclick={copiarsenha} class="btn btn-success">Copiar senha 🔗</button>
			</div>
		{/each}
	{/if}
</div>

<style>
	* {
		font-family: sans-serif;
	}
	.container {
		margin-top: 20px;
		width: 90%;
		max-width: 400px;
		background: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.senha-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #ccc;
		padding: 5px;
		border-radius: 10px;
		font-size: 1em;
		background: #fff;
		overflow-x: auto;
	}

	input[type='range'] {
		width: 100%;
		margin: 10px 0;
	}

	output {
		font-weight: bold;
		font-size: 1.2em;
	}
</style>
