<script>
	let { data } = $props();
  
	if (!data.palavra || data.palavra.length === 0) {
	  data.palavra = [{ palavra: 'Palavra não encontrada', definicoes: [] }];
	}
  
	function processarDefinicoes() {
	  const palavrasSeparadas = [];
	  if (data.palavra[0] && data.palavra[0].definicoes) {
		for (const definicao of data.palavra[0].definicoes) {
		  const palavrasLimpa = definicao.split(' ');
		  palavrasSeparadas.push(...palavrasLimpa);
		}
	  }
	  console.log("Todas as palavras das definições:", palavrasSeparadas);
	}
  
	processarDefinicoes();
  </script>
  <a href="/dicionario" class="btn-voltar">← Voltar ao dicionário</a>
  <h1><b>{data.palavra[0].palavra.toUpperCase()}</b></h1>
  
  {#if data.palavra[0].definicoes.length > 0}
	<h4>Definições</h4>
	{#each data.palavra[0].definicoes as definicao}
	  <p>
		{#each definicao.split(' ') as palavra}
		  <a href={'/dicionario/' + palavra.replace(/[.,!?]/g, '')}>
			{palavra}
		  </a>
		  {' '}
		{/each}
	  </p>
	{/each}
  {/if}
  
  <style>
	h1 {
	  margin-bottom: 1rem;
	  color: #333;
	}
  
	h4 {
	  margin-top: 1.5rem;
	  margin-bottom: 0.5rem;
	  color: #555;
	}
  
	p {
	  margin-bottom: 0.5rem;
	  line-height: 1.5;
	}
  
	a {
	  color: #007bff;
	  text-decoration: none;
	}
  
	a:hover {
	  text-decoration: underline;
	}

	h1 {
		margin-bottom: 1rem;
		color: #333;
	}

	h4 {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		color: #555;
	}

	p {
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}

	a {
		color: #007bff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	.btn-voltar {
		display: inline-block;
		margin-bottom: 1rem;
		padding: 0.4rem 0.8rem;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 0.9rem;
		color: #333;
		text-decoration: none;
	}

	.btn-voltar:hover {
		background-color: #e0e0e0;
	}
  </style>