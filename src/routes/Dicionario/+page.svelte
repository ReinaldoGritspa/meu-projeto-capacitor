<script>
    import { dicionario } from '$lib/dicionario.js';
  
    let palavra = '';
    let filtradas = dicionario;
  
    function buscar() {
      if (palavra === '') {
        filtradas = dicionario;
        return;
      }
  
      filtradas = [];
      for (const termo of dicionario) {
        if (termo.palavra.toLowerCase().startsWith(palavra.toLowerCase())) {
          filtradas.push(termo);
        }
      }
    }
  </script>
  
  <div>
    <input
      class="form-control"
      placeholder="Digite uma palavra"
      oninput={buscar}
      bind:value={palavra}
    />
  </div>
  
  <div>
    <ul>
      {#each filtradas as termo}
        <li>
          <!-- Link para a página de detalhes de cada palavra -->
          <a href={`/Dicionario/${termo.palavra.toLowerCase()}`}>{termo.palavra}</a>
        </li>
      {/each}
    </ul>
  </div>
  