<script>
    let valor = $state(0);
    let unidade1 = $state(0);
    let unidade2 = $state(0);
    let resultado = $state(0);

    function converter(){
        if (unidade1 == 'km/s') {
            if (unidade2 == 'km/s') {
                resultado = valor;
            } else if (unidade2 == 'm/s') {
                resultado = valor * 1000;
            } else if (unidade2 == 'cm/s') {
                resultado = valor * 100000;
            } else if (unidade2 == 'mm/s') {
                resultado = valor * 1000000;
            } else if (unidade2 == 'mph') {
                resultado = valor * 0.621371;
            }
        } else if (unidade1 == 'm/s') {
            if (unidade2 == 'km/s') {
                resultado = valor / 1000;
            } else if (unidade2 == 'm/s') {
                resultado = valor;
            } else if (unidade2 == 'cm/s') {
                resultado = valor * 100;
            } else if (unidade2 == 'mm/s') {
                resultado = valor * 1000;
            } else if (unidade2 == 'mph') {
                resultado = valor * 2.23694;
            }
        } else if (unidade1 == 'cm/s') {
            if (unidade2 == 'km/s') {
                resultado = valor / 100000;
            } else if (unidade2 == 'm/s') {
                resultado = valor / 100;
            } else if (unidade2 == 'cm/s') {
                resultado = valor;
            } else if (unidade2 == 'mm/s') {
                resultado = valor * 10;
            } else if (unidade2 == 'mph') {
                resultado = valor * 0.0223694;
            }
        } else if (unidade1 == 'mm/s') {
            if (unidade2 == 'km/s') {
                resultado = valor / 1000000;
            } else if (unidade2 == 'm/s') {
                resultado = valor / 1000;
            } else if (unidade2 == 'cm/s') {
                resultado = valor / 10;
            } else if (unidade2 == 'mm/s') {
                resultado = valor;
            } else if (unidade2 == 'mph') {
                resultado = valor * 0.000621371;
            }
        } else if (unidade1 == 'mph') {
            if (unidade2 == 'km/s') {
                resultado = valor * 1.60934;
            } else if (unidade2 == 'm/s') {
                resultado = valor * 0.44704;
            } else if (unidade2 == 'cm/s') {
                resultado = valor * 44.704;
            } else if (unidade2 == 'mm/s') {
                resultado = valor * 1609.34;
            } else if (unidade2 == 'mph') {
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
        <option value="km/s">Quilômetros por segundo</option>
        <option value="m/s">Metros por segundo</option>
        <option value="cm/s">Centímetros por segundo</option>
        <option value="mm/s">Milímetros por segundo</option>
        <option value="mph">Milhas por hora</option>
    </select>
    
    <b>Unidade de destino:</b>
    <select bind:value={unidade2} onchange={converter} class="select-field">
        <option value="km/s">Quilômetros por segundo</option>]
        <option value="m/s">Metros por segundo</option>
        <option value="cm/s">Centímetros por segundo</option>
        <option value="mm/s">Milímetros por segundo</option>
        <option value="mph">Milhas por hora</option>
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
