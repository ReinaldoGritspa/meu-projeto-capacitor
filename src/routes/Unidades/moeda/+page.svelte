<script>
    let moedas = [
        { nome: 'Dólar americano', código: 'USD'},
        { nome: 'Real brasileiro', código: 'BRL'},
        { nome: 'Euro', código: 'EUR'},
        { nome: 'Libra esterlina', código: 'GBP'},
        { nome: 'Iene japonês', código: 'JPY'},
        { nome: 'Peso argentino', código: 'ARS'}
    ];

    let código1 = $state(moedas[0].código);
    let código2 = $state(moedas[1].código);
    let valor1 = $state(0);
    let valor2 = $state(0);
    let moedaPadrao = $state();

    function redirecionar(tipo) {
        window.location.href = `/convuni/${tipo}`;
    }

    async function mudarMoeda() {
        const resposta = await fetch(`https://open.er-api.com/v6/latest/${código1}`);
        moedaPadrao = await resposta.json();
        converterDe();
    }

    function converterDe() {
        valor2 = (valor1 * moedaPadrao.rates[código2]).toFixed(2);
    }

    function converterPara() {
        valor1 = (valor2 / moedaPadrao.rates[código2]).toFixed(2);
    }

    function swap() {
        [código1, código2] = [código2, código1];
        [valor1, valor2] = [valor2, valor1];
        mudarMoeda();
    }
    mudarMoeda();
    function converterParaHorarioLocal(dataUTC) {
        if (!dataUTC) return "Data inválida";
        let data = new Date(dataUTC + " UTC");
        return data.toLocaleString();
    }
</script>

<div class="container">
    <a href="/convuni" class="btn btn-primary">Voltar ↩️</a>
    <h1 class="text-center">Cotação de Moedas</h1>
    <div class="input-group">
        <select class="form-select" bind:value={código1} onchange={mudarMoeda}>
            {#each moedas as moeda}
                <option value={moeda.código} title={moeda.nome}>{moeda.código}</option>
            {/each}
        </select>
        <input placeholder="0,00" type="number" class="form-control" oninput={converterDe} bind:value={valor1} />
        <button class="btn swap-btn" type="button" onclick={swap}>⇄</button>
        <select class="form-select" bind:value={código2} onchange={converterPara}>
            {#each moedas as moeda}
                <option value={moeda.código} title={moeda.nome}>{moeda.código}</option>
            {/each}
        </select>
        <input placeholder="0,00" type="number" class="form-control" oninput={converterPara} bind:value={valor2} />
    </div>
    <br />
    <div class="cotacao">
        <p>Cotação atual: 1 USD = <span class="cotacao-valor">
            {moedaPadrao && moedaPadrao.rates[código2].toFixed(2)}
        </span> {código2}</p>
        <p>Última atualização: {moedaPadrao ? converterParaHorarioLocal(moedaPadrao.time_last_update_utc) : "Carregando..."}</p>
    </div>
    <div class="footer">
        <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
    </div>
</div>

<style>
    * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .container {
        margin: 20px auto;
        width: 90%;
        max-width: 500px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .input-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
    
    .form-select, .form-control {
        width: 100%;
        max-width: 180px;
        text-align: center;
    }
    
    .swap-btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .swap-btn:hover {
        background-color: #0056b3;
    }
    
    .cotacao {
        margin-top: 10px;
        font-size: 1rem;
    }
    
    .cotacao-valor {
        color: green;
        font-weight: bold;
    }
    
    .footer {
        margin-top: 20px;
        font-size: 0.8rem;
    }
</style>