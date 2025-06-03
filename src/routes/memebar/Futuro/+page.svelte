<script>
</script>

<style>
    body {
        font-family: 'Arial', sans-serif;
        background: #2C3E50;
        color: #ECF0F1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        overflow: hidden;
        position: relative;
    }

    .container {
        background: rgba(44, 62, 80, 0.8);
        padding: 50px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        max-width: 600px;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
    }

    h1 {
        font-size: 40px;
        margin-bottom: 20px;
        color: #ECF0F1;
        font-weight: bold;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
    }

    .botao {
        background-color: #34495E;
        color: white;
        padding: 15px 30px;
        font-size: 20px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        margin: 15px 0;
        width: 300px;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
        text-decoration: none;
    }

    .botao:hover {
        background-color: #1ABC9C;
        transform: scale(1.05);
    }

    .botao:active {
        background-color: #16A085;
        transform: scale(0.95);
    }

    /* Nevoeiro animado */
    .nevoeiro {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(44, 62, 80, 0.5);
        opacity: 0.5;
        z-index: -1;
        animation: nevoeiroAnim 30s linear infinite;
    }

    @keyframes nevoeiroAnim {
        0% { opacity: 0.3; }
        50% { opacity: 0.6; }
        100% { opacity: 0.3; }
    }

    /* Fragmentos flutuantes */
    .fragmento {
        position: absolute;
        background: #ECF0F1;
        border-radius: 50%;
        opacity: 0.8;
        animation: fragmentosAnim 8s infinite;
    }

    @keyframes fragmentosAnim {
        0% {
            opacity: 1;
            transform: translateY(-10px) scale(0.7);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) scale(1);
        }
    }

    /* Gotas caindo */
    .gota {
        position: absolute;
        background: #1ABC9C;
        border-radius: 50%;
        opacity: 0.8;
        animation: gotasAnim 3s infinite;
    }

    @keyframes gotasAnim {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0.5);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) scale(0.5);
        }
    }

    .magia {
        position: absolute;
        top: 10%;
        left: 20%;
        z-index: -2;
        opacity: 0.7;
        animation: magiaAnim 5s ease-in-out infinite;
    }

    .magia::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background-color: #1ABC9C;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(26, 188, 156, 0.7), 0 0 20px rgba(26, 188, 156, 0.5);
        animation: flutuar 4s ease-in-out infinite;
    }

    .magia:nth-child(2)::before {
        animation-delay: 1s;
    }

    .magia:nth-child(3)::before {
        animation-delay: 2s;
    }

    .magia:nth-child(4)::before {
        animation-delay: 3s;
    }

    @keyframes magiaAnim {
        0% { opacity: 0; transform: translateX(0) translateY(0); }
        50% { opacity: 1; transform: translateX(50px) translateY(-30px); }
        100% { opacity: 0; transform: translateX(0) translateY(0); }
    }

    @keyframes flutuar {
        0% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0); }
    }

    /* Animação de nevoeiro extra */
    .nevoeiro-extra {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: -1;
        animation: nevoeiroExtraAnim 40s linear infinite;
    }

    @keyframes nevoeiroExtraAnim {
        0% { opacity: 0.4; }
        50% { opacity: 0.6; }
        100% { opacity: 0.4; }
    }
</style>

<div class="container">
    <h1>Descubra o Seu Destino... Se Ousares...</h1>

    <a class="botao" href="/memebar/Futuro/Solo">Previsão para Solteiros</a>
    <a class="botao" href="/memebar/Futuro/Casal">Previsão para Casais</a>
</div>

<!-- Efeitos mágicos -->
<div class="nevoeiro"></div>
<div class="nevoeiro-extra"></div>

<!-- Gotas caindo -->
<div class="gota" style="top: 10%; left: 15%; animation-delay: 0s;"></div>
<div class="gota" style="top: 20%; left: 50%; animation-delay: 1s;"></div>
<div class="gota" style="top: 30%; left: 30%; animation-delay: 2s;"></div>
<div class="gota" style="top: 40%; left: 60%; animation-delay: 3s;"></div>

<!-- Fragmentos flutuando -->
<div class="fragmento" style="top: 10%; left: 10%; width: 15px; height: 15px; animation-delay: 0s;"></div>
<div class="fragmento" style="top: 20%; left: 80%; width: 10px; height: 10px; animation-delay: 1s;"></div>
<div class="fragmento" style="top: 30%; left: 40%; width: 25px; height: 25px; animation-delay: 2s;"></div>
<div class="fragmento" style="top: 50%; left: 60%; width: 12px; height: 12px; animation-delay: 3s;"></div>

<!-- Partículas de Magia -->
<div class="magia" style="top: 10%; left: 20%;"></div>
<div class="magia" style="top: 30%; left: 70%;"></div>
<div class="magia" style="top: 50%; left: 40%;"></div>
<div class="magia" style="top: 70%; left: 80%;"></div>
