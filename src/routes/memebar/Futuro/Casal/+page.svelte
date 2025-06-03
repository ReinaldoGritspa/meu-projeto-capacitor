<script>
    let nome1 = '';  
    let nome2 = '';  
    let idade1 = '';  
    let idade2 = '';  
    let idadeCasamento = '';
    let idadeMorte1 = '';
    let idadeMorte2 = '';
    let localMorte1 = '';
    let localMorte2 = '';
    let comQuemMorte1 = '';
    let comQuemMorte2 = '';
    let vidaCasa = '';
    let estiloVida = '';
    let vezesTraiu1 = 0;
    let vezesTraiu2 = 0;
    let amante1 = '';
    let amante2 = '';
    let descricaoAmante1 = '';
    let descricaoAmante2 = '';
    let previsaoGerada = false;

    const nomesMasculinos = ['Carlos', 'João', 'Lucas', 'Fernando', 'Rafael', 'Miguel'];
    const nomesFemininos = ['Maria', 'Ana', 'Beatriz', 'Isabela', 'Juliana', 'Carla'];

    const locaisMorte = ['em casa', 'no trabalho', 'em um acidente de trânsito', 'em uma praia', 'em uma montanha'];
    const pessoasMorte = ['sozinho', 'com a família', 'com amigos', 'com o cônjuge', 'em um acidente com estranhos'];

    const tiposCasa = ['em uma mansão', 'em uma casa confortável', 'em um apartamento luxuoso', 'em uma casa simples no campo'];
    const regioes = ['em uma grande cidade', 'em um bairro tranquilo', 'no interior', 'em uma região rural'];
    const estilosVida = ['luxuoso', 'simples', 'confortável', 'pobre'];

    function roletaCasamento() {
        if (idade1 && idade2) {
            const idadeMaisVelho = Math.max(parseInt(idade1), parseInt(idade2));
            const idadeMaximaCasamento = idadeMaisVelho + 20;
            idadeCasamento = Math.floor(Math.random() * (idadeMaximaCasamento - idadeMaisVelho + 1)) + idadeMaisVelho;
        }
    }

    function roletaMorte() {
    if (idadeCasamento && idade1 && idade2) {
        idadeMorte1 = Math.floor(Math.random() * (100 - idadeCasamento + 1)) + idadeCasamento + 1;
        idadeMorte2 = Math.floor(Math.random() * (100 - idadeCasamento + 1)) + idadeCasamento + 1;

        const parceiro1MorrePrimeiro = idadeMorte1 < idadeMorte2;

        const opcoesComConjuge = [...pessoasMorte];
        const opcoesSemConjuge = pessoasMorte.filter(p => p !== 'com o cônjuge');

        if (parceiro1MorrePrimeiro) {
            comQuemMorte1 = opcoesComConjuge[Math.floor(Math.random() * opcoesComConjuge.length)];
            comQuemMorte2 = opcoesSemConjuge[Math.floor(Math.random() * opcoesSemConjuge.length)];
        } else if (idadeMorte2 < idadeMorte1) {
            comQuemMorte2 = opcoesComConjuge[Math.floor(Math.random() * opcoesComConjuge.length)];
            comQuemMorte1 = opcoesSemConjuge[Math.floor(Math.random() * opcoesSemConjuge.length)];
        } else {
            // morreram na mesma idade (raro, mas possível), ambos podem ter qualquer opção
            comQuemMorte1 = opcoesComConjuge[Math.floor(Math.random() * opcoesComConjuge.length)];
            comQuemMorte2 = opcoesComConjuge[Math.floor(Math.random() * opcoesComConjuge.length)];
        }

        localMorte1 = locaisMorte[Math.floor(Math.random() * locaisMorte.length)];
        localMorte2 = locaisMorte[Math.floor(Math.random() * locaisMorte.length)];
    }
}

function roletaTraicao() {
    vezesTraiu1 = Math.random() < 0.2 ? Math.floor(Math.random() * 3) : 0;
    vezesTraiu2 = Math.random() < 0.2 ? Math.floor(Math.random() * 3) : 0;

    const amantes1 = [
        { descricao: "um amigo de infância, sempre presente nas suas brincadeiras e aventuras. Mas, com o tempo, ele foi se tornando mais próximo e, durante uma noite de nostalgia, ele te deu um beijo inesperado. O que era apenas amizade se transformou em algo muito mais." },
        { descricao: "uma colega de trabalho, com quem você dividia todas as suas tarefas e risadas. Uma noite, após o expediente, ela te convidou para uma 'reunião' para discutir sobre um projeto. Mas, no calor da conversa, ela te beijou e a atração se tornou algo impossível de resistir." },
        { descricao: "uma amiga de faculdade, com quem você sempre compartilhava livros e experiências. Mas, após uma noite de estudo intenso, as conversas mudaram e a proximidade cresceu. Quando você menos percebeu, ela estava ao seu lado, e o beijo aconteceu de forma natural." },
        { descricao: "um conhecido, um homem que você conheceu em uma festa, que parecia ser apenas mais um entre os muitos convidados. Porém, com o tempo, ele foi se aproximando cada vez mais, até que um toque em sua mão levou a algo mais. De repente, o beijo surgiu, e você se viu no meio de uma atração impossível de controlar." },
        { descricao: "uma amiga, que sempre te ajudava em momentos difíceis. No entanto, aquela amizade começou a se transformar quando, numa noite de conversa e cumplicidade, ela te beijou. O que parecia ser uma troca de apoio se tornou algo muito mais íntimo e complicado." },
        { descricao: "um colega de trabalho, sempre educado e prestativo, que começou a te chamar para almoços. A cada conversa, a tensão entre vocês aumentava, até que, após um dia de trabalho, ele te levou para um lugar tranquilo e a atração se concretizou com um beijo." },
        { descricao: "um homem mais velho, um amigo da família, que te fazia sentir segura e confortável. Mas, durante uma viagem, ele começou a te olhar de forma diferente, e em um momento de vulnerabilidade, ele se aproximou e o beijo aconteceu, surpreendendo os dois." },
        { descricao: "um desconhecido, alguém que você conheceu em uma viagem. No começo, ele parecia ser apenas mais um turista, mas as conversas se tornaram mais intensas. Uma noite, após uma caminhada à beira-mar, ele te beijou e, sem querer, você se entregou à paixão." }
    ];

    const amantes2 = [
        { descricao: "um amigo de longa data, que sempre esteve ao seu lado, mas que nunca pensou em ser mais do que um amigo. Porém, em uma noite, a amizade tomou um rumo inesperado, e ele se aproximou de você, beijando-lhe os lábios com intensidade. A amizade foi transformada em algo mais." },
        { descricao: "uma colega de faculdade, com quem você tinha uma conexão forte, mas sempre tratou como uma simples colega. Contudo, uma noite de festa mudou tudo. O beijo surgiu de forma espontânea, e logo vocês estavam em um quarto reservado, sem saber o que o futuro reservaria." },
        { descricao: "um amigo próximo, que sempre foi seu parceiro de todas as aventuras. Mas, numa noite de sábado, ele se mostrou mais do que apenas amigo. Uma troca de olhares e, em um impulso, ele te beijou. O que era apenas amizade se transformou em algo muito mais íntimo." },
        { descricao: "uma amiga, que sempre foi a pessoa com quem você mais confiava. Mas, com o tempo, ela começou a te olhar de forma diferente. Uma noite, durante um evento, a tensão no ar foi evidente, e você acabou se entregando a ela, trocando carícias e beijos secretos." },
        { descricao: "um colega de trabalho, que sempre te fez sorrir e era uma presença constante ao seu lado. Mas, em um dia qualquer, ele te convidou para uma bebida e, depois de um longo papo, você se viu beijando ele, sem conseguir resistir à atração." },
        { descricao: "um homem casado, um amigo de seu parceiro, que sempre te tratou com respeito. Mas, com o tempo, ele começou a olhar para você de maneira diferente. Após uma conversa em uma festa, ele te beijou com intensidade, e o que era apenas uma amizade se transformou em algo inesperado." },
        { descricao: "uma amiga muito querida, com quem você sempre teve uma ligação profunda. Mas, após um jantar, algo mudou no ar. A proximidade aumentou, os olhares se intensificaram, e, quando menos esperou, ela te beijou. A amizade virou algo novo e misterioso." },
        { descricao: "um colega de faculdade, com quem você sempre teve um bom relacionamento, mas nunca imaginou que seria algo além disso. Contudo, durante uma viagem, as conversas aumentaram de tom e logo estavam sozinhos, em um quarto de hotel, se entregando à paixão que surgiu entre os dois." }
    ];

    if (vezesTraiu1 > 0) {
        const amanteEscolhido = amantes1[Math.floor(Math.random() * amantes1.length)];
        descricaoAmante1 = amanteEscolhido.descricao;
    }

    if (vezesTraiu2 > 0) {
        const amanteEscolhido = amantes2[Math.floor(Math.random() * amantes2.length)];
        descricaoAmante2 = amanteEscolhido.descricao;
    }
}

    function roletaVida() {
        vidaCasa = tiposCasa[Math.floor(Math.random() * tiposCasa.length)];
        estiloVida = estilosVida[Math.floor(Math.random() * estilosVida.length)];
    }

    function iniciarPrevisao() {
        previsaoGerada = true;
        roletaCasamento();
        roletaMorte();
        roletaTraicao();
        roletaVida();
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
    <h1>Previsão do Futuro para o Casal 🔮</h1>

    <label for="nome1">Nome do Primeiro:</label>
    <input id="nome1" type="text" bind:value={nome1} placeholder="Nome do primeiro parceiro" />

    <label for="idade1">Idade do Primeiro:</label>
    <input id="idade1" type="number" bind:value={idade1} placeholder="Idade do primeiro parceiro" />

    <label for="nome2">Nome do Segundo:</label>
    <input id="nome2" type="text" bind:value={nome2} placeholder="Nome do segundo parceiro" />

    <label for="idade2">Idade do Segundo:</label>
    <input id="idade2" type="number" bind:value={idade2} placeholder="Idade do segundo parceiro" />

    <button class="botao" on:click={iniciarPrevisao}>Ver Previsões</button>

    {#if previsaoGerada}
        <div class="resultado">
            <h3>Resultados da Previsão</h3>
            <p>Vocês irão se casar daqui a {idadeCasamento - Math.max(parseInt(idade1), parseInt(idade2))} anos.</p>
            <p>O primeiro parceiro morrerá aos {idadeMorte1} anos, {localMorte1}, {comQuemMorte1}.</p>
            <p>O segundo parceiro morrerá aos {idadeMorte2} anos, {localMorte2}, {comQuemMorte2}.</p>
            <p>Vocês viverão em uma casa {vidaCasa} e terão um estilo de vida {estiloVida}.</p>
            {#if vezesTraiu1 > 0}
                <p>O primeiro parceiro traiu {vezesTraiu1} vez(es). O amante foi {descricaoAmante1}.</p>
            {/if}
            {#if vezesTraiu2 > 0}
                <p>O segundo parceiro traiu {vezesTraiu2} vez(es). O amante foi {descricaoAmante2}.</p>
            {/if}
        </div>
    {/if}
</div>
