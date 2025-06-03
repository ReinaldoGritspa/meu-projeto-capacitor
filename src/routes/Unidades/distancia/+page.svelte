<script>
    let distancia = $state(0);
    let unidade1 = $state(0);
    let unidade2 = $state(0);
    let resultado = $state(0);

    function converter() {
        if (unidade1 == 'km') {
            if (unidade2 == 'km') {
                resultado = distancia;
            } else if (unidade2 == 'm') {
                resultado = distancia * 1000;
            } else if (unidade2 == 'cm') {
                resultado = distancia * 100000;
            } else if (unidade2 == 'mm') {
                resultado = distancia * 1000000;
            }
        } else if (unidade1 == 'm') {
            if (unidade2 == 'km') {
                resultado = distancia / 1000;
            } else if (unidade2 == 'm') {
                resultado = distancia;
            } else if (unidade2 == 'cm') {
                resultado = distancia * 100;
            } else if (unidade2 == 'mm') {
                resultado = distancia * 1000;
            }
        } else if (unidade1 == 'cm') {
            if (unidade2 == 'km') {
                resultado = distancia / 100000;
            } else if (unidade2 == 'm') {
                resultado = distancia / 100;
            } else if (unidade2 == 'cm') {
                resultado = distancia;
            } else if (unidade2 == 'mm') {
                resultado = distancia * 10;
            }
        } else if (unidade1 == 'mm') {
            if (unidade2 == 'km') {
                resultado = distancia / 1000000;
            } else if (unidade2 == 'm') {
                resultado = distancia / 1000;
            } else if (unidade2 == 'cm') {
                resultado = distancia / 10;
            } else if (unidade2 == 'mm') {
                resultado = distancia;
            }
        }
    }
</script>
<div class="container">
    <a href="/convuni" class="btn btn-primary">Voltar ↩️</a>
    <b>Digite o valor:</b>
    <input type="number" bind:value={distancia} oninput={converter} class="input-field">
    
    <b>Unidade de origem:</b>
    <select bind:value={unidade1} onchange={converter} class="select-field">
        <option value="km">Quilômetros</option>
        <option value="m">Metros</option>
        <option value="cm">Centímetros</option>
        <option value="mm">Milímetros</option>
    </select>
    
    <b>Unidade de destino:</b>
    <select bind:value={unidade2} onchange={converter} class="select-field">
        <option value="km">Quilômetros</option>
        <option value="m">Metros</option>
        <option value="cm">Centímetros</option>
        <option value="mm">Milímetros</option>
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
