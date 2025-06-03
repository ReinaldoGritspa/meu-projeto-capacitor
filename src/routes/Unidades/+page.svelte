<script>
</script>

<div class="container">
    <h1 class="text-center">Conversor de Unidades</h1>
    <br />
    <h2>Deseja converter qual unidade?</h2>
    <div class="cards-container">
        <a href="/Unidades/massa" class="card text-decoration-none" aria-label="Converter Massa">
            <img src="peso.png" class="card-img-top" alt="Ícone da massa">
            <p>MASSA</p>
        </a>
        <a href="/Unidades/distancia" class="card text-decoration-none" aria-label="Converter Distância">
            <img src="distancia.png" class="card-img-top" alt="Ícone de distância">
            <p>DISTÂNCIA</p>
        </a>
        <a href="/Unidades/temperatura" class="card text-decoration-none" aria-label="Converter Temperatura">
            <img src="temp.png" class="card-img-top" alt="Ícone de temperatura">
            <p>TEMPERATURA</p>
        </a>
        <a href="/Unidades/tempo" class="card text-decoration-none" aria-label="Converter Tempo">
            <img src="tempo.png" class="card-img-top" alt="Ícone de tempo">
            <p>TEMPO</p>
        </a>
        <a href="/Unidades/vel" class="card text-decoration-none" aria-label="Converter Velocidade">
            <img src="vel.png" class="card-img-top" alt="Ícone de velocidade">
            <p>VELOCIDADE</p>
        </a>
        <a href="/Unidades/moeda" class="card text-decoration-none" aria-label="Converter Moeda">
            <img src="coin.png" class="card-img-top" alt="Ícone de Moeda">
            <p>MOEDA</p>
        </a>
        <a href="/Unidades/area" class="card text-decoration-none" aria-label="Converter Área">
            <img src="area.png" class="card-img-top" alt="Ícone de Área">
            <p>ÁREA</p>
        </a>
    </div>
</div>


<style>
    * {
        font-family: sans-serif;
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
    
    .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 10px;
        justify-content: center;
    }
    
    .card {
        width: 100%;
        max-width: 160px;
        height: 140px;
        background: #f8f9fa;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        border: none;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .card:hover {
        transform: scale(1.05);
    }
    
    .card-img-top {
        height: 80px;
        width: 80px;
        padding: 6px;
    }
</style>