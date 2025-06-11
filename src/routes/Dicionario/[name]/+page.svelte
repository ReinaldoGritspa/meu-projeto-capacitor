<script>
  export let palavra;  // Recebe os dados da palavra passados pelo servidor

  // Log para verificar a palavra recebida
  console.log('Palavra recebida no frontend:', palavra);
</script>

<main>
  {#if palavra}  <!-- Verifica se a palavra existe antes de tentar acessar suas propriedades -->
    <h1>Detalhes de "{palavra.palavra}"</h1>

    <h2>Definições:</h2>
    <ul>
      {#each palavra.definições as definicao}
        <li>{definicao}</li>
      {/each}
    </ul>
  {:else}
    <p>Carregando...</p> <!-- Mensagem de carregamento caso a palavra não tenha sido carregada ainda -->
  {/if}
</main>

<style>
  main {
    padding: 1rem;
    max-width: 600px;
    margin: auto;
  }

  h1 {
    font-size: 2rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
</style>
