<script>
    let nome = '';  
    let idade = '';  
    let genero = '';  
    let respostaIdadeCasamento = '';
    let respostaSexualidade = '';
    let nomeConjuge = '';
    let sexoConjuge = '';
    let numeroFilhos = '';
    let tipoFilhos = '';
    let numeroPets = '';
    let classeSocial = '';
    let profissao = '';
    let salario = '';
    let idadeMorte = '';
    let localMorte = '';
    let comQuemMorte = '';
    let previsaoGerada = false;

    const nomesMasculinos = ['Carlos', 'João', 'Lucas', 'Fernando', 'Rafael', 'Miguel'];
    const nomesFemininos = ['Maria', 'Ana', 'Beatriz', 'Isabela', 'Juliana', 'Carla'];

    const profissaoMilionario = ['Empreendedor', 'Investidor', 'CEO de grandes empresas', 'Bilionário de tecnologia'];
    const profissaoBilionario = ['Proprietário de corporações globais', 'Proprietário de criptomoedas', 'Herói de mercados financeiros'];
    const profissaoCorrupto = ['Político', 'Empresário corrupto', 'Líder de cartel', 'Chefe de organização criminosa'];
    const profissaoLadrao = ['Ladrão', 'Assaltante', 'Golpista', 'Fraudador', 'Contrabandista'];
    const profissaoRico = ['Empresário', 'Proprietário de grandes imóveis', 'Investidor em startups', 'Herdeiro de fortuna'];
    const profissaoClasseAlta = ['Médico', 'Advogado', 'Engenheiro', 'CEO', 'Arquiteto', 'Banqueiro'];
    const profissaoClasseMedia = ['Professor', 'Engenheiro', 'Designer', 'Programador', 'Gestor', 'Consultor'];
    const profissaoClasseBaixa = ['Operário', 'Garçom', 'Segurança', 'Motorista', 'Faxineiro', 'Padeiro'];

    const salarioMilionario = [500000, 1000000, 2000000, 5000000, 10000000];
    const salarioBilionario = [10000000, 50000000, 100000000];
    const salarioCorrupto = [50000, 150000, 300000, 500000];
    const salarioLadrao = [5000, 10000, 20000, 30000];
    const salarioRico = [200000, 400000, 600000, 800000];
    const salarioClasseAlta = [15000, 25000, 35000, 50000];
    const salarioClasseMedia = [5000, 10000, 15000, 20000];
    const salarioClasseBaixa = [1000, 1500, 2000, 2500];

    const locaisMorte = ['em casa', 'no trabalho', 'em um acidente de trânsito', 'em uma praia', 'em uma montanha'];
    const pessoasMorte = ['sozinho', 'com a família', 'com amigos', 'com o cônjuge', 'em um acidente com estranhos'];

    let idadeCasamento = null;  // Variável global para armazenar idade do casamento

    function roletaCasamento() {
        if (idade) {
            const idadeCasamentoMin = parseInt(idade);
            const idadeCasamentoMax = idadeCasamentoMin + 50;  
            idadeCasamento = Math.floor(Math.random() * (idadeCasamentoMax - idadeCasamentoMin + 1)) + idadeCasamentoMin;  
            respostaIdadeCasamento = `Você vai casar aos ${idadeCasamento} anos.`;
        } else {
            respostaIdadeCasamento = "Por favor, insira sua idade.";
        }
    }

    function definirSexualidade() {
        if (genero === 'homem') {
            respostaSexualidade = Math.random() < 0.5 ? 'Heterossexual' : 'Gay';
        } else {
            respostaSexualidade = Math.random() < 0.5 ? 'Heterossexual' : 'Lésbica';
        }
    }

    function roletaConjuge() {
        if (respostaSexualidade === 'Heterossexual') {
            if (genero === 'homem') {
                nomeConjuge = nomesFemininos[Math.floor(Math.random() * nomesFemininos.length)];
                sexoConjuge = 'mulher';
            } else {
                nomeConjuge = nomesMasculinos[Math.floor(Math.random() * nomesMasculinos.length)];
                sexoConjuge = 'homem';
            }
        } else {
            if (genero === 'homem') {
                nomeConjuge = nomesMasculinos[Math.floor(Math.random() * nomesMasculinos.length)];
                sexoConjuge = 'homem';
            } else {
                nomeConjuge = nomesFemininos[Math.floor(Math.random() * nomesFemininos.length)];
                sexoConjuge = 'mulher';
            }
        }
    }

    function roletaFilhos() {
        numeroFilhos = Math.floor(Math.random() * 10) + 1;
        if (respostaSexualidade === 'Gay' || respostaSexualidade === 'Lésbica') {
            tipoFilhos = `Você adotará ${numeroFilhos} filhos.`;
        } else {
            tipoFilhos = `Você terá ${numeroFilhos} filhos biológicos.`;
        }
    }

    function roletaPets() {
        numeroPets = Math.floor(Math.random() * 6);
    }

    function roletaClasseSocial() {
        const classe = ['Rico', 'Milionário', 'Bilionário', 'Corrupto', 'Ladrão', 'Classe Alta', 'Classe Média', 'Classe Baixa'];
        classeSocial = classe[Math.floor(Math.random() * classe.length)];

        if (classeSocial === 'Milionário') {
            profissao = profissaoMilionario[Math.floor(Math.random() * profissaoMilionario.length)];
            salario = salarioMilionario[Math.floor(Math.random() * salarioMilionario.length)];
        } else if (classeSocial === 'Bilionário') {
            profissao = profissaoBilionario[Math.floor(Math.random() * profissaoBilionario.length)];
            salario = salarioBilionario[Math.floor(Math.random() * salarioBilionario.length)];
        } else if (classeSocial === 'Corrupto') {
            profissao = profissaoCorrupto[Math.floor(Math.random() * profissaoCorrupto.length)];
            salario = salarioCorrupto[Math.floor(Math.random() * salarioCorrupto.length)];
        } else if (classeSocial === 'Ladrão') {
            profissao = profissaoLadrao[Math.floor(Math.random() * profissaoLadrao.length)];
            salario = salarioLadrao[Math.floor(Math.random() * salarioLadrao.length)];
        } else if (classeSocial === 'Rico') {
            profissao = profissaoRico[Math.floor(Math.random() * profissaoRico.length)];
            salario = salarioRico[Math.floor(Math.random() * salarioRico.length)];
        } else if (classeSocial === 'Classe Alta') {
            profissao = profissaoClasseAlta[Math.floor(Math.random() * profissaoClasseAlta.length)];
            salario = salarioClasseAlta[Math.floor(Math.random() * salarioClasseAlta.length)];
        } else if (classeSocial === 'Classe Média') {
            profissao = profissaoClasseMedia[Math.floor(Math.random() * profissaoClasseMedia.length)];
            salario = salarioClasseMedia[Math.floor(Math.random() * salarioClasseMedia.length)];
        } else if (classeSocial === 'Classe Baixa') {
            profissao = profissaoClasseBaixa[Math.floor(Math.random() * profissaoClasseBaixa.length)];
            salario = salarioClasseBaixa[Math.floor(Math.random() * salarioClasseBaixa.length)];
        }
    }

    function roletaMorte() {
        if (idade && idadeCasamento) {
            idadeMorte = Math.floor(Math.random() * (100 - idadeCasamento + 1)) + idadeCasamento;
            localMorte = locaisMorte[Math.floor(Math.random() * locaisMorte.length)];
            comQuemMorte = pessoasMorte[Math.floor(Math.random() * pessoasMorte.length)];
        }
    }

    function iniciarPrevisao() {
        previsaoGerada = true;
        roletaCasamento();
        definirSexualidade();
        roletaConjuge();
        roletaFilhos();
        roletaPets();
        roletaClasseSocial();
        roletaMorte();
    }
</script>

<style>
    body {
        font-family: 'Arial', sans-serif;
        background: #F5F5F5;
        color: #333;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 20px;
    }

    .container {
        background: #FFFFFF;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        width: 100%;
    }

    h1 {
        font-size: 28px;
        margin-bottom: 20px;
        color: #34495E;
        text-align: center;
    }

    label {
        font-size: 16px;
        margin-bottom: 8px;
        color: #34495E;
    }

    input, select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 15px;
        border-radius: 8px;
        border: 1px solid #D5DBDB;
        box-sizing: border-box;
    }

    .botao {
        background-color: #3498DB;
        color: white;
        padding: 12px 24px;
        font-size: 18px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        width: 100%;
    }

    .botao:hover {
        background-color: #2980B9;
    }

    .resultado {
        margin-top: 30px;
    }

    .resultado h3 {
        font-size: 22px;
        margin-bottom: 20px;
        text-align: center;
    }

    .resultado p {
        font-size: 16px;
        margin-bottom: 8px;
        color: #34495E;
    }

    .resultado p strong {
        font-weight: bold;
    }
</style>

<div class="container">
    <h1>Previsão do Futuro 🔮</h1>

    <!-- Campos de entrada -->
    <label for="nome">Nome:</label>
    <input id="nome" type="text" bind:value={nome} placeholder="Seu nome" />

    <label for="idade">Idade:</label>
    <input id="idade" type="number" bind:value={idade} placeholder="Sua idade" />

    <label for="genero">Gênero:</label>
    <select id="genero" bind:value={genero}>
        <option value="homem">Homem</option>
        <option value="mulher">Mulher</option>
    </select>

    <button class="botao" on:click={iniciarPrevisao}>Ver Previsões</button>

    {#if previsaoGerada}
        <div class="resultado">
            <h3>Resultados da Previsão</h3>
            <p>{respostaIdadeCasamento}</p>
            <p>{respostaSexualidade === 'Heterossexual' ? `Você é Heterossexual` : `Você é ${respostaSexualidade}`}</p>
            <p>Seu cônjuge será {nomeConjuge} ({sexoConjuge}).</p>
            <p>{tipoFilhos}</p>
            <p>Você terá {numeroPets} pets.</p>
            <p>Você faz parte da classe social: {classeSocial}.</p>
            <p>Sua profissão será: {profissao}.</p>
            <p>Seu salário será: R${salario},00 por mês.</p>
            <p>Você morrerá aos {idadeMorte} anos, {localMorte}, {comQuemMorte}.</p>
        </div>
    {/if}
</div>
