<script>
    let valor = $state(0);
    let unidade1 = $state(0);
    let unidade2 = $state(0);
    let resultado = $state(0);

    function converter(){
        if (unidade1 == 'c') {
            if (unidade2 == 'c') {
                resultado = valor;
            } else if (unidade2 == 'f') {
                resultado = (valor * 9/5) + 32;
            } else if (unidade2 == 'k') {
                resultado = valor + 273.15;
            }
        } else if (unidade1 == 'f') {
            if (unidade2 == 'c') {
                resultado = (valor - 32) * 5/9;
            } else if (unidade2 == 'f') {
                resultado = valor;
            } else if (unidade2 == 'k') {
                resultado = (valor - 32) * 5/9 + 273.15;
            }
        } else if (unidade1 == 'k') {
            if (unidade2 == 'c') {
                resultado = valor - 273.15;
            } else if (unidade2 == 'f') {
                resultado = (valor - 273.15) * 9/5 + 32;
            } else if (unidade2 == 'k') {
                resultado = valor;
            }
        }
    }
</script>
<div class="container">
    <a href="/convuni" class="btn btn-primary">Voltar ↩️</a>
    <b>Digite o valor:</b>
    <input type="number" bind:value={valor} oninput={converter} class="input-field">
    
    <b>Unidade de origem:</b>
    <select bind:value={unidade1} onchange={converter} class="select-field">
        <option value="c">Celsius</option>
        <option value="f">Fahrenheit</option>
        <option value="k">Kelvin</option>
    </select>
    
    <b>Unidade de destino:</b>
    <select bind:value={unidade2} onchange={converter} class="select-field">
        <option value="c">Celsius</option>
        <option value="f">Fahrenheit</option>
        <option value="k">Kelvin</option>
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
