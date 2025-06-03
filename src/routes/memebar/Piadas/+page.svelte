<script>
	let piada = "Clique no botão e prepare-se!";
	let riso = "";

	async function novaPiada() {
		riso = "";
		try {
			const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
			const data = await res.json();

			if (data.joke) {
				piada = data.joke;

				const fala = new SpeechSynthesisUtterance(piada);
				fala.lang = 'en-US';
				speechSynthesis.speak(fala);

				riso = Math.random() > 0.5 ? "😂" : "🤣";
			} else {
				piada = "Sem piada por agora... 😢";
			}
		} catch (err) {
			piada = "Erro ao buscar piada. Verifique sua conexão!";
		}
	}
</script>

<style>
	main {
		padding: 40px;
		text-align: center;
		font-family: 'Comic Sans MS', cursive;
		background: radial-gradient(circle, #f0f, #0ff);
		animation: spinBg 10s linear infinite;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@keyframes spinBg {
		0% { filter: hue-rotate(0deg); }
		100% { filter: hue-rotate(360deg); }
	}

	h1 {
		color: darkred;
		transform: rotate(-2deg);
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.piada {
		max-width: 600px;
		font-size: 1.3rem;
		background: #fff;
		padding: 20px;
		border-radius: 10px;
		color: #111;
		box-shadow: 0 0 10px rgba(0,0,0,0.2);
		margin-bottom: 20px;
		font-style: italic;
	}

	button {
		background: #ff69b4;
		color: white;
		border: none;
		padding: 15px 30px;
		font-size: 1.2rem;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	button:hover {
		transform: scale(1.1) rotate(2deg);
	}

	.riso {
		font-size: 2.5rem;
		margin-top: 20px;
	}
</style>

<main>
	<h1>🌈 PIADA MALUCA API</h1>
	<div class="piada">{piada}</div>
	<button on:click={novaPiada}>Quero rir! 🤡</button>
	<div class="riso">{riso}</div>
</main>
