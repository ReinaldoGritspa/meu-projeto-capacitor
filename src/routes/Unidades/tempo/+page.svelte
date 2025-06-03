<script>
    let tempo = $state(0);
    let unidade1 = $state(0);
    let unidade2 = $state(0);
    let resultado = $state(0);

    function converter(){
        if (unidade1 == 's') {
            if (unidade2 == 's') {
                resultado = tempo;
            } else if (unidade2 == 'm') {
                resultado = tempo / 60;
            } else if (unidade2 == 'h') {
                resultado = tempo / 3600;
            } else if (unidade2 == 'd') {
                resultado = tempo / 86400;
            }
        } else if (unidade1 == 'm') {
            if (unidade2 == 's') {
                resultado = tempo * 60;
            } else if (unidade2 == 'm') {
                resultado = tempo;
            } else if (unidade2 == 'h') {
                resultado = tempo / 60;
            } else if (unidade2 == 'd') {
                resultado = tempo / 1440;
            }
        } else if (unidade1 == 'h') {
            if (unidade2 == 's') {
                resultado = tempo * 3600;
            } else if (unidade2 == 'm') {
                resultado = tempo * 60;
            } else if (unidade2 == 'h') {
                resultado = tempo;
            } else if (unidade2 == 'd') {
                resultado = tempo / 24;
            }
        } else if (unidade1 == 'd') {
            if (unidade2 == 's') {
                resultado = tempo * 86400;
            } else if (unidade2 == 'm') {
                resultado = tempo * 1440;
            } else if (unidade2 == 'h') {
                resultado = tempo * 24;
            } else if (unidade2 == 'd') {
                resultado = tempo;
            }
        }
    }
</script>
<div class="container">
    <a href="/convuni" class="btn btn-primary">Voltar ↩️</a>
    <b>Digite o valor:</b>
    <input type="number" bind:value={tempo} oninput={converter} class="input-field">
    
    <b>Unidade de origem:</b>
    <select bind:value={unidade1} onchange={converter} class="select-field">
        <option value="s">Segundos</option>
        <option value="m">Minutos</option>
        <option value="h">Horas</option>
        <option value="d">Dias</option>
    </select>
    
    <b>Unidade de destino:</b>
    <select bind:value={unidade2} onchange={converter} class="select-field">
        <option value="s">Segundos</option>
        <option value="m">Minutos</option>
        <option value="h">Horas</option>
        <option value="d">Dias</option>
    </select>

    <p class="result">O resultado é {resultado}</p>
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
    
    .input-field, .select-field {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }
    
    .result {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-top: 10px;
    }
    
    @media (max-width: 480px) {
        .container {
            padding: 15px;
        }
        .input-field, .select-field {
            font-size: 14px;
        }
        .result {
            font-size: 16px;
        }
    }
</style>
