function criarQuizz() {
    document.querySelector(".conteudo").classList.add("escondido");
    document.querySelector(".informacoes-basicas").classList.remove("escondido");
}

// Criar quiz: Informações básicas:::::::::

let titulo;
let tituloOk;
let imagemUrl;
let imagemUrlOk;
let qtdPerguntas;
let qtdPerguntasOk;
let qtdNiveis;
let qtdNiveisOk;

let objeto = {
    title: '',
    image: '',
    questions: [],
    levels: []
};

function prosseguirParaCriarPerguntas() {
    titulo = document.querySelector(".titulo-quizz").value;
    tituloOk = (titulo.length >= 20 && titulo.length <= 65);

    imagemUrl = document.querySelector(".imagem-quizz").value;
    imagemUrlOk = (conferirUrl(imagemUrl) === true);

    qtdPerguntas = document.querySelector(".qtd-perguntas").value;
    qtdPerguntasOk = (qtdPerguntas >= 3);

    qtdNiveis = document.querySelector(".qtd-niveis").value;
    qtdNiveisOk = (qtdNiveis >= 2);

    /*titulo = document.querySelector(".titulo-quizz").value = "Título do quizz aqui";
    tituloOk = (titulo.length >= 20 && titulo.length <= 65);

    imagemUrl = document.querySelector(".imagem-quizz").value = "https://http.cat/411.jpg";
    imagemUrlOk = (conferirUrl(imagemUrl) === true);

    qtdPerguntas = document.querySelector(".qtd-perguntas").value = "3";
    qtdPerguntasOk = (qtdPerguntas >= 3);

    qtdNiveis = document.querySelector(".qtd-niveis").value = "3";
    qtdNiveisOk = (qtdNiveis >= 2);*/
    //////////////
    if (tituloOk && imagemUrlOk && qtdPerguntasOk && qtdNiveisOk) {
        document.querySelector(".informacoes-basicas").classList.add("escondido");
        document.querySelector(".criar-perguntas").classList.remove("escondido");
        objeto.title = titulo;
        objeto.image = imagemUrl;
        quantidadeDePerguntas();
        quantidadeDeNiveis();

    } else {
        alert("Insira os dados corretamente!");
    }
}

function conferirUrl(img) {
    try {
        let url = new URL(img)
        return true;
    } catch (err) {
        return false;
    }
}

function valorValido(valor) {
    if (valor !== undefined && valor !== null && valor !== '') {
        return true;
    } else {
        return false;
    }
}

// Criar quiz: Crie suas perguntas::::::::: 

let criePerguntas;

function quantidadeDePerguntas() {
    criePerguntas = document.querySelector(".perguntas");

    for (i = 1; i <= qtdPerguntas; i++) {
        criePerguntas.innerHTML = criePerguntas.innerHTML + `
        <li>
            <div class="adicionar-perguntas add-${i}" >
                <h3>Pergunta ${i}</h3>
                <ion-icon name="create-outline" onclick="abrirCaixaPergunta(${i})"></ion-icon>
            </div>
            <div class="pergunta prgt-${i} escondido">
                <h3 onclick="fecharCaixaPergunta(${i})">Pergunta ${i}</h3>
                <input class="textopergunta-${i}" type="text" placeholder="Texto da pergunta">
                <input class="corpergunta-${i}" type="text" placeholder="Cor de fundo da pergunta">
                <h3>Resposta correta</h3>
                <input class="respostac-${i}" type="text" placeholder="Resposta correta">
                <input class="urlc-${i}" type="text" placeholder="URL da imagem">
                <h3>Respostas incorretas</h3>
                <div class="outrasperguntas">
                    <input class="respostai1-${i}" type="text" placeholder="Resposta incorreta 1">
                    <input class="urli1-${i} space" type="text" placeholder="URL da imagem 1">

                    <input class="respostai2-${i}" type="text" placeholder="Resposta incorreta 2">
                    <input class="urli2-${i} space" type="text" placeholder="URL da imagem 2">

                    <input class="respostai3-${i}" type="text" placeholder="Resposta incorreta 3">
                    <input class="urli3-${i}" type="text" placeholder="URL da imagem 3">
                </div>
            </div>
        </li>
    `;
    }
}

function abrirCaixaPergunta(i) {
    document.querySelector(`.add-${i}`).classList.add("escondido");
    document.querySelector(`.prgt-${i}`).classList.remove("escondido");

}

function fecharCaixaPergunta(i) {
    document.querySelector(`.add-${i}`).classList.remove("escondido");
    document.querySelector(`.prgt-${i}`).classList.add("escondido");
}

function corHexadecimal(cor) {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    return regex.test(cor);
}

function verificarInputPerguntas(i) {

    let objPerguntas = {
        title: '',
        color: '',
        answers: []
    }

    let objRespostaCorreta = {
        text: '',
        image: '',
        isCorrectAnswer: true
    }

    let objRespostaIncorreta1 = {
        text: '',
        image: '',
        isCorrectAnswer: false
    }

    let objRespostaIncorreta2 = {
        text: '',
        image: '',
        isCorrectAnswer: false
    }

    let objRespostaIncorreta3 = {
        text: '',
        image: '',
        isCorrectAnswer: false
    }

    let textoPergunta = document.querySelector(`.textopergunta-${i}`).value;
    let textoPerguntaOk = (textoPergunta.length >= 20);

    let corFundo = document.querySelector(`.corpergunta-${i}`).value;
    let corFundoOk = ((corHexadecimal(corFundo) === true) && corFundo[0] === "#" && corFundo.length === 7);

    let respostaCorreta = document.querySelector(`.respostac-${i}`).value;
    let respostaCorretaOk = (respostaCorreta !== '');

    let imagemCorreta = document.querySelector(`.urlc-${i}`).value;
    let imagemCorretaOk = (conferirUrl(imagemCorreta) === true);


    let respostaIncorreta1 = document.querySelector(`.respostai1-${i}`).value;
    let imagemIncorreta1 = document.querySelector(`.urli1-${i}`).value;
    let respostaEImgIncorretas1Ok = ((respostaIncorreta1 !== '') && conferirUrl(imagemIncorreta1) === true);

    let respostaIncorreta2 = document.querySelector(`.respostai2-${i}`).value;
    let imagemIncorreta2 = document.querySelector(`.urli2-${i}`).value;
    let respostaEImgIncorretas2Ok = ((respostaIncorreta2 !== '') && conferirUrl(imagemIncorreta2) === true);

    let respostaIncorreta3 = document.querySelector(`.respostai3-${i}`).value;
    let imagemIncorreta3 = document.querySelector(`.urli3-${i}`).value;
    let respostaEImgIncorretas3Ok = ((respostaIncorreta3 !== '') && conferirUrl(imagemIncorreta3) === true);

    /*let textoPergunta = document.querySelector(`.textopergunta-${i}`).value = "Texto da perguntinha";
    let textoPerguntaOk = (textoPergunta.length >= 20);

    let corFundo = document.querySelector(`.corpergunta-${i}`).value = "#eeeeee";
    let corFundoOk = corHexadecimal(corFundo);

    let respostaCorreta = document.querySelector(`.respostac-${i}`).value = "Resposta Número 1";
    let respostaCorretaOk = (respostaCorreta !== '');

    let imagemCorreta = document.querySelector(`.urlc-${i}`).value = "https://http.cat/402.jpg";
    let imagemCorretaOk = (conferirUrl(imagemCorreta) === true);


    let respostaIncorreta1 = document.querySelector(`.respostai1-${i}`).value = "Resposta Número 2";
    let imagemIncorreta1 = document.querySelector(`.urli1-${i}`).value = "https://http.cat/403.jpg";
    let respostaEImgIncorretas1Ok = ((respostaIncorreta1 !== '') && conferirUrl(imagemIncorreta1) === true);

    let respostaIncorreta2 = document.querySelector(`.respostai2-${i}`).value = "Resposta Número 3";
    let imagemIncorreta2 = document.querySelector(`.urli2-${i}`).value = "https://http.cat/409.jpg";
    let respostaEImgIncorretas2Ok = ((respostaIncorreta2 !== '') && conferirUrl(imagemIncorreta2) === true);

    let respostaIncorreta3 = document.querySelector(`.respostai3-${i}`).value = "";
    let imagemIncorreta3 = document.querySelector(`.urli3-${i}`).value = "";
    let respostaEImgIncorretas3Ok = ((respostaIncorreta3 !== '') && conferirUrl(imagemIncorreta3) === true);*/
    ///////////
    let caso1 = (respostaEImgIncorretas1Ok && respostaEImgIncorretas2Ok === false && respostaEImgIncorretas3Ok === false);
    let caso2 = (respostaEImgIncorretas1Ok && respostaEImgIncorretas2Ok && (respostaEImgIncorretas3Ok === false));
    let caso3 = (respostaEImgIncorretas1Ok && respostaEImgIncorretas2Ok && respostaEImgIncorretas3Ok);



    if (textoPerguntaOk && corFundoOk && respostaCorretaOk && imagemCorretaOk && (caso1 || caso2 || caso3)) {
        objPerguntas.title = textoPergunta;
        objPerguntas.color = corFundo;

        objRespostaCorreta.text = respostaCorreta;
        objRespostaCorreta.image = imagemCorreta;
        objPerguntas.answers.push(objRespostaCorreta);

        objRespostaIncorreta1.text = respostaIncorreta1;
        objRespostaIncorreta1.image = imagemIncorreta1;

        objRespostaIncorreta2.text = respostaIncorreta2;
        objRespostaIncorreta2.image = imagemIncorreta2;

        objRespostaIncorreta3.text = respostaIncorreta3;
        objRespostaIncorreta3.image = imagemIncorreta3;

        objPerguntas.answers.push(objRespostaIncorreta1);
        objPerguntas.answers.push(objRespostaIncorreta2);
        objPerguntas.answers.push(objRespostaIncorreta3);

        objeto.questions.push(objPerguntas);

        return true;
    } else {
        return false;
    }

}

function prosseguirParaCriarNiveis() {

    let checkar = true;

    for (let i = 1; i <= qtdPerguntas; i++) {
        let checkVerificacao = verificarInputPerguntas(i);
        checkar = (checkar && checkVerificacao);
    }

    if (checkar && objeto.questions.length == qtdPerguntas) {
        document.querySelector(".criar-perguntas").classList.add("escondido");
        document.querySelector(".criar-niveis").classList.remove("escondido");

    } else {
        alert("Insira os dados corretamente! Cada pergunta deve possuir no mínimo uma resposta incorreta, caso opte por mais de uma, estas devem ser preenchidas na ordem.")
        objeto.questions = [];
    }


}

// Criar quiz: Crie níveis::::::::: 

function quantidadeDeNiveis() {
    let crieNiveis = document.querySelector(".niveis");

    for (i = 1; i <= qtdNiveis; i++) {
        crieNiveis.innerHTML = crieNiveis.innerHTML + `
        <li>
            <div class="adicionar-niveis addnv-${i}" >
                <h3>Nivel ${i}</h3>
                <ion-icon name="create-outline" onclick="abrirCaixaNivel(${i})"></ion-icon>
            </div>
            <div class="nivel nv-${i} escondido">
                <h3 onclick="fecharCaixaNivel(${i})">Nível ${i}</h3>
                <input class="titulonivel-${i}" type="text" placeholder="Título do nível">
                <input class="acertonivel-${i}" type="text" placeholder="% de acerto mínima">
                <input class="imgnivel-${i}" type="text" placeholder="URL da imagem do nível">
                <input class="descricaonivel-${i}" type="text" placeholder="Descrição do nível">
            </div>
        </li>
    `;
    }
}

function abrirCaixaNivel(i) {
    document.querySelector(`.addnv-${i}`).classList.add("escondido");
    document.querySelector(`.nv-${i}`).classList.remove("escondido");
}

function fecharCaixaNivel(i) {
    document.querySelector(`.addnv-${i}`).classList.remove("escondido");
    document.querySelector(`.nv-${i}`).classList.add("escondido");
}

function finalizarQuizz() {
    objeto.levels = [];

    for (let i = 1; i <= qtdNiveis; i++) {

        let objNivel = {
            title: "",
            image: "",
            text: "",
            minValue: ''
        }

        let tituloNivel = document.querySelector(`.titulonivel-${i}`).value;
        let tituloNivelOk = (tituloNivel.length >= 10);

        let acertoNivel = document.querySelector(`.acertonivel-${i}`).value;
        let acertoNivelOk = (acertoNivel >= 0 && acertoNivel <= 100);

        let imagemNivel = document.querySelector(`.imgnivel-${i}`).value;
        let imagemNivelOk = conferirUrl(imagemNivel);

        let descricaoNivel = document.querySelector(`.descricaonivel-${i}`).value;
        let descricaoNivelOk = (descricaoNivel.length >= 30);

        /*let tituloNivel = document.querySelector(`.titulonivel-${i}`).value = "Título do Nível";
        let tituloNivelOk = (tituloNivel.length >= 10);

        let acertoNivel = document.querySelector(`.acertonivel-${i}`).value;
        let acertoNivelOk = (acertoNivel >= 0 && acertoNivel <= 100);

        let imagemNivel = document.querySelector(`.imgnivel-${i}`).value = "https://http.cat/401.jpg";
        let imagemNivelOk = conferirUrl(imagemNivel);

        let descricaoNivel = document.querySelector(`.descricaonivel-${i}`).value = "Descrição do nível-----------------------------------";
        let descricaoNivelOk = (descricaoNivel.length >= 30);*/

        if (tituloNivelOk && acertoNivelOk && imagemNivelOk && descricaoNivelOk) {
            objNivel.title = tituloNivel;
            objNivel.image = imagemNivel;
            objNivel.text = descricaoNivel;
            objNivel.minValue = acertoNivel;

            objeto.levels.push(objNivel);
        } else {
            alert("Insira os dados corretamente!");
            break
        }
    }

    verificarSeAlgumNivelehRepetido();

}

function verificarSeAlgumNivelehZero() {
    let numdenivel0 = 0;

    for (let i = 1; i <= qtdNiveis; i++) {
        if (Number(document.querySelector(`.acertonivel-${i}`).value) === 0) {
            numdenivel0 = numdenivel0 + 1;
        }
    }

    if (numdenivel0 >= 1) {
        document.querySelector(".criar-niveis").classList.add("escondido");
        document.querySelector(".quizz-pronto").classList.remove("escondido");
        imagemQuizzPronto();
        enviarQuizzCriado();
    } else {
        alert("Insira os dados corretamente. Um dos níveis deve possuir o valor 0 (zero).");
        objeto.levels = [];
    }
}

function verificarSeAlgumNivelehRepetido() {

    let contadorRepetidos = 0;

    for (let i = 1; i < qtdNiveis; i++) {
        if (Number(document.querySelector(`.acertonivel-${i}`).value) === Number(document.querySelector(`.acertonivel-${i + 1}`).value)) {
            contadorRepetidos = contadorRepetidos + 1;
        }
    }

    if (contadorRepetidos > 0) {
        alert("Insira os dados corretamente. Verifique se algum nível está repetido.");
        objeto.levels = [];
    } else {
        verificarSeAlgumNivelehZero();
    }
}


// Criar quiz: Quizz Pronto::::::::: 

function imagemQuizzPronto() {
    let inserirImg = document.querySelector(".quizz-img-legenda");

    inserirImg.innerHTML += `
    <div class = "img-legenda" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 65.62%, rgba(0, 0, 0, 0.8) 100%), url(${objeto.image}); background-size: 100%;" onclick="acessarQuizz()">
        <p class="legenda-imagem">${objeto.title}</p>
    </div>
    `
}

function acessarQuizz(elemento) {
    //visualizar o quizz criado (Tela 2) ?????????????;
    document.querySelector(".quizz-pronto").classList.add("escondido");
    document.querySelector(".conteudo").classList.remove("escondido");
    abrir_quizz(elemento, id_ultimo_quizz);
}

function voltarHome() {
    document.querySelector(".conteudo").classList.remove("escondido");

    if (localStorage.length === 0) {
        document.querySelector(".caixa_usuario").classList.add("escondido");
        document.querySelector(".caixa_usuario2").classList.remove("escondido");
        window.location.reload();
    } else if (localStorage.length !== 0) {
        window.location.reload();
    }
}


// Enviar Quizz criado para API e salvar no Local Storage::::::::: 

function enviarQuizzCriado() {
    filtrarPerguntasValidas();

    const promise = axios.post("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes", objeto);

    promise.catch(erroAoEnviar);
    promise.then(salvarLocalStorage);
}

function erroAoEnviar(erro) {
    let status = erro.response.data;
    alert(status)
}

function salvarLocalStorage(resposta) {
    console.log("Deu certo :)");
    // console.log(resposta); // Usei para conferir o objeto que chega como resposta para pegar o id postado no servidor

    let quizzesCriados = JSON.parse(localStorage.getItem("quizzesCriados") || "[]");
    id_ultimo_quizz = resposta.data.id;

    quizzesCriados.push({
        id: `${resposta.data.id}`,
        title: resposta.data.title,
        background_image: resposta.data.image
    });

    localStorage.setItem("quizzesCriados", JSON.stringify(quizzesCriados));

}

function filtrarPerguntasValidas() {
    for (let i = 0; i < qtdPerguntas; i++) {
        objeto.questions[i].answers = objeto.questions[i].answers.filter(function (pergunta) {
            return pergunta.title !== "" && pergunta.image !== ""
        })
    }
}

// Variaveis adicionais (Henrique):
let id_ultimo_quizz; //Essa variavel guarda o id do quizz postado
let elemento = null; //Essa variavel serve para absolutamente nada mas eu esqueci de tirar ela