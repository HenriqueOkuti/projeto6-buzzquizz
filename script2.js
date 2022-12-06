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
        errosInputComeco();
        //alert("Insira os dados corretamente!");
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
                <span class="texto-erro tp-${i}"></span>
                <input class="corpergunta-${i} cor" type="text" placeholder="Cor de fundo da pergunta">
                <span class="texto-erro cp-${i}"></span>
                <h3>Resposta correta</h3>
                <input class="respostac-${i}" type="text" placeholder="Resposta correta">
                <span class="texto-erro rc-${i}"></span>
                <input class="urlc-${i}" type="text" placeholder="URL da imagem">
                <span class="texto-erro uc-${i}"></span>
                <h3>Respostas incorretas</h3>
                <div class="outrasperguntas">
                    <input class="respostai1-${i}" type="text" placeholder="Resposta incorreta 1">
                    <span class="texto-erro ri-${i}"></span>
                    <input class="urli1-${i}" type="text" placeholder="URL da imagem 1">
                    <div class="texto-erro ui-${i}"></div>

                    <input class="respostai2-${i} space" type="text" placeholder="Resposta incorreta 2">
                    <span class="texto-erro rii-${i}"></span>
                    <input class="urli2-${i}" type="text" placeholder="URL da imagem 2">
                    <span class="texto-erro uii-${i}"></span>

                    <input class="respostai3-${i} space" type="text" placeholder="Resposta incorreta 3">
                    <span class="texto-erro riii-${i}"></span>
                    <input class="urli3-${i}" type="text" placeholder="URL da imagem 3">
                    <span class="texto-erro uiii-${i}"></span>
                </div>
            </div>
        </li>
    `;
    }
}
let textoPerguntaOk;
let corFundoOk;
let respostaCorretaOk;
let imagemCorretaOk;
let respostaIncorreta1;
let respostaEImgIncorretas1Ok;

let respostaIncorreta2;
let imagemIncorreta2;
let respostaEImgIncorretas2Ok;

let respostaIncorreta3;
let imagemIncorreta3;
let respostaEImgIncorretas3Ok;

let caso1;
let caso2;
let caso3;





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
    textoPerguntaOk = (textoPergunta.length >= 20);

    let corFundo = document.querySelector(`.corpergunta-${i}`).value;
    corFundoOk = ((corHexadecimal(corFundo) === true) && corFundo[0] === "#" && corFundo.length === 7);

    let respostaCorreta = document.querySelector(`.respostac-${i}`).value;
    respostaCorretaOk = (respostaCorreta !== '');

    let imagemCorreta = document.querySelector(`.urlc-${i}`).value;
    imagemCorretaOk = (conferirUrl(imagemCorreta) === true);


    respostaIncorreta1 = document.querySelector(`.respostai1-${i}`).value;
    imagemIncorreta1 = document.querySelector(`.urli1-${i}`).value;
    respostaEImgIncorretas1Ok = ((respostaIncorreta1 !== '') && conferirUrl(imagemIncorreta1) === true);

    respostaIncorreta2 = document.querySelector(`.respostai2-${i}`).value;
    imagemIncorreta2 = document.querySelector(`.urli2-${i}`).value;
    respostaEImgIncorretas2Ok = ((respostaIncorreta2 !== '') && conferirUrl(imagemIncorreta2) === true);

    respostaIncorreta3 = document.querySelector(`.respostai3-${i}`).value;
    imagemIncorreta3 = document.querySelector(`.urli3-${i}`).value;
    respostaEImgIncorretas3Ok = ((respostaIncorreta3 !== '') && conferirUrl(imagemIncorreta3) === true);

    /*let textoPergunta = document.querySelector(`.textopergunta-${i}`).value = "Texto da perguntinha";
    textoPerguntaOk = (textoPergunta.length >= 20);

    let corFundo = document.querySelector(`.corpergunta-${i}`).value = "#eeeeee";
    corFundoOk = corHexadecimal(corFundo);

    let respostaCorreta = document.querySelector(`.respostac-${i}`).value = "Resposta Número 1";
    respostaCorretaOk = (respostaCorreta !== '');

    let imagemCorreta = document.querySelector(`.urlc-${i}`).value = "https://http.cat/402.jpg";
    imagemCorretaOk = (conferirUrl(imagemCorreta) === true);


    respostaIncorreta1 = document.querySelector(`.respostai1-${i}`).value = "Resposta Número 2";
    imagemIncorreta1 = document.querySelector(`.urli1-${i}`).value = "https://http.cat/403.jpg";
    respostaEImgIncorretas1Ok = ((respostaIncorreta1 !== '') && conferirUrl(imagemIncorreta1) === true);

    respostaIncorreta2 = document.querySelector(`.respostai2-${i}`).value = "Resposta Número 3";
    imagemIncorreta2 = document.querySelector(`.urli2-${i}`).value = "https://http.cat/409.jpg";
    respostaEImgIncorretas2Ok = ((respostaIncorreta2 !== '') && conferirUrl(imagemIncorreta2) === true);

    respostaIncorreta3 = document.querySelector(`.respostai3-${i}`).value = "";
    imagemIncorreta3 = document.querySelector(`.urli3-${i}`).value = "";
    respostaEImgIncorretas3Ok = ((respostaIncorreta3 !== '') && conferirUrl(imagemIncorreta3) === true);*/
    ///////////
    caso1 = (respostaEImgIncorretas1Ok && respostaEImgIncorretas2Ok === false && respostaEImgIncorretas3Ok === false);
    caso2 = (respostaEImgIncorretas1Ok && respostaEImgIncorretas2Ok && (respostaEImgIncorretas3Ok === false));
    caso3 = (respostaEImgIncorretas1Ok && respostaEImgIncorretas2Ok && respostaEImgIncorretas3Ok);



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

        errosInputPerguntas(i);

        return true;
    } else {
        errosInputPerguntas(i);
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
        //alert("Insira os dados corretamente! Cada pergunta deve possuir no mínimo uma resposta incorreta, caso opte por mais de uma, estas devem ser preenchidas na ordem.")
        objeto.questions = [];
    }


}

// Criar quiz: Crie níveis::::::::: 

let tituloNivel;
let tituloNivelOk;

let acertoNivel;
let acertoNivelOk;

let imagemNivel;
let imagemNivelOk;

let descricaoNivel;
let descricaoNivelOk;

let crieNiveis;

function quantidadeDeNiveis() {
    crieNiveis = document.querySelector(".niveis");

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
                <span class="texto-erro tn-${i}"></span>
                <input class="acertonivel-${i}" type="number" placeholder="% de acerto mínima">
                <span class="texto-erro an-${i}"></span>
                <input class="imgnivel-${i}" type="text" placeholder="URL da imagem do nível">
                <span class="texto-erro in-${i}"></span>
                <input class="descricaonivel-${i}" type="text" placeholder="Descrição do nível">
                <span class="texto-erro dn-${i}"></span>
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

        tituloNivel = document.querySelector(`.titulonivel-${i}`).value;
        tituloNivelOk = (tituloNivel.length >= 10);

        acertoNivel = document.querySelector(`.acertonivel-${i}`).value;
        acertoNivelOk = (acertoNivel >= 0 && acertoNivel <= 100 && acertoNivel !== '');

        imagemNivel = document.querySelector(`.imgnivel-${i}`).value;
        imagemNivelOk = conferirUrl(imagemNivel);

        descricaoNivel = document.querySelector(`.descricaonivel-${i}`).value;
        descricaoNivelOk = (descricaoNivel.length >= 30);

        /*let tituloNivel = document.querySelector(`.titulonivel-${i}`).value = "Título do Nível";
        let tituloNivelOk = (tituloNivel.length >= 10);

        let acertoNivel = document.querySelector(`.acertonivel-${i}`).value;
        let acertoNivelOk = (acertoNivel >= 0 && acertoNivel <= 100);Agora, decida os níveis
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
            console.log("puxou 1");
            errosInputNiveis(i);

        } else {
            errosInputNiveis(i)
            //alert("Insira os dados corretamente!");
            //break
        }
    }

    quantidadesIguais();
}

function quantidadesIguais() {
    if (objeto.levels.length == qtdNiveis) {
        console.log("tamanhos iguais");
        verificarSeAlgumNivelehZero();
    }
}



function verificarSeAlgumNivelehRepetido() {

    let contadorRepetidos = 0;

    for (let i = 1; i < qtdNiveis; i++) {
        if (document.querySelector(`.acertonivel-${i}`).value === document.querySelector(`.acertonivel-${i + 1}`).value) {
            contadorRepetidos = contadorRepetidos + 1;
        }
    }

    if (contadorRepetidos > 0) {
        console.log("há niveis repetidos")
        return true;
    } else {
        console.log("Não há niveis repetidos")
        return false;
    }
}

function verificarSeAlgumNivelehZero() {
    console.log("verificando...")
    let numdenivel0 = 0;

    for (let i = 1; i <= qtdNiveis; i++) {
        if (document.querySelector(`.acertonivel-${i}`).value == 0) {
            numdenivel0 = numdenivel0 + 1;
        }
    }

    if (numdenivel0 > 0) {
        if (verificarSeAlgumNivelehRepetido() === false) {
            document.querySelector(".criar-niveis").classList.add("escondido");
            document.querySelector(".quizz-pronto").classList.remove("escondido");
            imagemQuizzPronto();
            enviarQuizzCriado();
        } else if (verificarSeAlgumNivelehRepetido() === true) {
            console.log("Para um melhor aproveitamento do quizz não repita nenhum nível.");
            for (let j = 1; j <= qtdNiveis; j++) {
                //document.querySelector(`.acertonivel-${j}`).value = "";
                document.querySelector(`.acertonivel-${j}`).classList.add("erro-input");
                document.querySelector(`.an-${j}`).innerHTML = '<span class="texto-erro">Insira um número entre 0 a 100, os níveis precisam ser diferentes entre si e pelo menos um deles 0. </span>';
                //errosInputNiveis(i);
            }
            objeto.levels = [];
        }
    } else {
        console.log("Pelo menos um dos níveis deve ser zero")
        for (let j = 1; j <= qtdNiveis; j++) {
            document.querySelector(`.acertonivel-${j}`).classList.add("erro-input");
            document.querySelector(`.an-${j}`).innerHTML = '<span class="texto-erro">Insira um número entre 0 a 50, pelo menos um dos níveis deve ser 0. </span>';
        }
        //alert("Insira os dados corretamente. Um dos níveis deve possuir o valor 0 (zero).");
        objeto.levels = [];
    }
}




// Criar quiz: Quizz Pronto::::::::: 
let inserirImg;

function imagemQuizzPronto() {
    inserirImg = document.querySelector(".quizz-img-legenda");

    inserirImg.innerHTML += `
    <div class = "img-legenda" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 65.62%, rgba(0, 0, 0, 0.8) 100%), url(${objeto.image}); background-size: 100%;" onclick="acessarQuizz()">
        <p class="legenda-imagem">${objeto.title}</p>
    </div>
    `
}

function acessarQuizz(elemento) {
    document.querySelector(".quizz-pronto").classList.add("escondido");
    document.querySelector(".conteudo").classList.remove("escondido");
    abrir_quizz(elemento, id_ultimo_quizz);
}

function voltarHome() { ////////////////VERIFICAR NULL OU ZERO
    document.querySelector(".conteudo").classList.remove("escondido");

    if (localStorage.length === null) {
        document.querySelector(".caixa_usuario").classList.add("escondido");
        document.querySelector(".caixa_usuario2").classList.remove("escondido");
        window.location.reload();
    } else if (localStorage.length !== null) {
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
    alert(status);

    objeto = {
        title: '',
        image: '',
        questions: [],
        levels: []
    };

    criePerguntas.innerHTML = "";
    crieNiveis.innerHTML = "";
    inserirImg.innerHTML = "";
    window.location.reload();

}

function salvarLocalStorage(resposta) {
    console.log("Deu certo :)");
    // console.log(resposta); // Usei para conferir o objeto que chega como resposta para pegar o id postado no servidor

    let quizzesCriados = JSON.parse(localStorage.getItem("quizzesCriados") || "[]");
    id_ultimo_quizz = resposta.data.id;

    quizzesCriados.push({
        id: `${resposta.data.id}`,
        title: resposta.data.title,
        background_image: resposta.data.image,
        key: resposta.data.key
    });

    console.log(quizzesCriados);
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




///////////// BÔNUS MENSAGEM DE VERIFICAÇÃO INPUTS:


function errosInputComeco() {
    let erroTitulo = '<span class="texto-erro">Insira um título com no mínimo 20 caracteres</span>'
    let erroMensagemT = document.querySelector(".tq");

    if (!tituloOk) {
        document.querySelector(".titulo-quizz").classList.add("erro-input");
        erroMensagemT.innerHTML = erroTitulo;
    } else {
        document.querySelector(".titulo-quizz").classList.remove("erro-input");
        erroMensagemT.innerHTML = '<span class="texto-erro tituloq"></span>'
    }


    let erroImagem = '<span class="texto-erro">O valor informado não é uma url válida</span>'
    let erroMensagemI = document.querySelector(".iq");

    if (!imagemUrlOk) {
        document.querySelector(".imagem-quizz").classList.add("erro-input");
        erroMensagemI.innerHTML = erroImagem;
    } else {
        document.querySelector(".imagem-quizz").classList.remove("erro-input");
        erroMensagemI.innerHTML = '<span class="texto-erro tituloq"></span>'
    }


    let erroQtdPerguntas = '<span class="texto-erro">O quizz deve ter no mínimo 3 perguntas</span>'
    let erroMensagemP = document.querySelector(".pq");

    if (!qtdPerguntasOk) {
        document.querySelector(".qtd-perguntas").classList.add("erro-input");
        erroMensagemP.innerHTML = erroQtdPerguntas;
    } else {
        document.querySelector(".qtd-perguntas").classList.remove("erro-input");
        erroMensagemP.innerHTML = '<span class="texto-erro tituloq"></span>'
    }


    let erroQtdNiveis = '<span class="texto-erro">O quizz deve ter no mínimo 2 níveis</span>'
    let erroMensagemN = document.querySelector(".nq");

    if (!qtdNiveisOk) {
        document.querySelector(".qtd-niveis").classList.add("erro-input");
        erroMensagemN.innerHTML = erroQtdNiveis;
    } else {
        document.querySelector(".qtd-niveis").classList.remove("erro-input");
        erroMensagemN.innerHTML = '<span class="texto-erro tituloq"></span>'
    }

}


function errosInputPerguntas(i) {

    if (!textoPerguntaOk) {
        document.querySelector(`.textopergunta-${i}`).classList.add("erro-input");
        document.querySelector(`.tp-${i}`).innerHTML = '<span class="texto-erro">Insira uma pergunta com no mínimo 20 caracteres</span>';
    } else {
        document.querySelector(`.textopergunta-${i}`).classList.remove("erro-input");
        document.querySelector(`.tp-${i}`).innerHTML = '<span class="texto-erro tp-${i}"></span>';
    }

    if (!corFundoOk) {
        document.querySelector(`.corpergunta-${i}`).classList.add("erro-input");
        document.querySelector(`.cp-${i}`).innerHTML = '<span class="texto-erro">Insira uma cor no formato hexadecimal</span>';
    } else {
        document.querySelector(`.corpergunta-${i}`).classList.remove("erro-input");
        document.querySelector(`.cp-${i}`).innerHTML = '<span class="texto-erro cp-${i}"></span>';
    }

    if (!respostaCorretaOk) {
        document.querySelector(`.respostac-${i}`).classList.add("erro-input");
        document.querySelector(`.rc-${i}`).innerHTML = '<span class="texto-erro">Insira uma resposta correta</span>';
    } else {
        document.querySelector(`.respostac-${i}`).classList.remove("erro-input");
        document.querySelector(`.rc-${i}`).innerHTML = '<span class="texto-erro rc-${i}"></span>';
    }

    if (!imagemCorretaOk) {
        document.querySelector(`.urlc-${i}`).classList.add("erro-input");
        document.querySelector(`.uc-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
    } else {
        document.querySelector(`.urlc-${i}`).classList.remove("erro-input");
        document.querySelector(`.uc-${i}`).innerHTML = '<span class="texto-erro uc-${i}"></span>';
    }

    if (respostaIncorreta1 === "") {
        document.querySelector(`.respostai1-${i}`).classList.add("erro-input");
        document.querySelector(`.ri-${i}`).innerHTML = '<span class="texto-erro">Insira uma resposta incorreta</span>';
    } else {
        document.querySelector(`.respostai1-${i}`).classList.remove("erro-input");
        document.querySelector(`.ri-${i}`).innerHTML = '<span class="texto-erro ri-${i}"></span>';
    }

    if (conferirUrl(imagemIncorreta1) === false || imagemIncorreta1 === "") {
        document.querySelector(`.urli1-${i}`).classList.add("erro-input");
        document.querySelector(`.ui-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
    } else {
        document.querySelector(`.urli1-${i}`).classList.remove("erro-input");
        document.querySelector(`.ui-${i}`).innerHTML = '<span class="texto-erro ui-${i}"></span>';
    }

    if (respostaIncorreta1 === '') {
        document.querySelector(`.respostai1-${i}`).classList.add("erro-input");
        document.querySelector(`.ri-${i}`).innerHTML = '<span class="texto-erro">Insira uma resposta incorreta</span>';
    } else {
        document.querySelector(`.respostai1-${i}`).classList.remove("erro-input");
        document.querySelector(`.ri-${i}`).innerHTML = '<span class="texto-erro ri-${i}"></span>';
    }

    if (imagemIncorreta2 !== "") {
        if (conferirUrl(imagemIncorreta2) === false) {
            document.querySelector(`.urli2-${i}`).classList.add("erro-input");
            document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
        } else {
            document.querySelector(`.urli2-${i}`).classList.remove("erro-input");
            document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro uii-${i}"></span>';
        }

        if (respostaIncorreta2 === '') {
            document.querySelector(`.respostai2-${i}`).classList.add("erro-input");
            document.querySelector(`.rii-${i}`).innerHTML = '<span class="texto-erro">Insira uma resposta incorreta</span>';
        } else {
            document.querySelector(`.respostai2-${i}`).classList.remove("erro-input");
            document.querySelector(`.rii-${i}`).innerHTML = '<span class="texto-erro rii-${i}"></span>';
        }
    }

    if ((respostaIncorreta2 !== "" && imagemIncorreta2 === "") || (conferirUrl(imagemIncorreta2) === false && imagemIncorreta2 !== "")) {
        document.querySelector(`.urli2-${i}`).classList.add("erro-input");
        document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
    } else {
        document.querySelector(`.urli2-${i}`).classList.remove("erro-input");
        document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro uii-${i}"></span>';
    }

    if (respostaIncorreta3 !== "" && imagemIncorreta3 === "") {
        document.querySelector(`.urli3-${i}`).classList.add("erro-input");
        document.querySelector(`.uiii-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
        if (respostaIncorreta2 === "") {
            document.querySelector(`.respostai2-${i}`).classList.add("erro-input");
            document.querySelector(`.rii-${i}`).innerHTML = '<span class="texto-erro">Insira uma resposta incorreta</span>';
        } else {
            document.querySelector(`.respostai2-${i}`).classList.remove("erro-input");
            document.querySelector(`.rii-${i}`).innerHTML = '<span class="texto-erro rii-${i}"></span>';
        }

        if (imagemIncorreta2 === "" || (conferirUrl(imagemIncorreta2) === false && imagemIncorreta2 !== "")) {
            document.querySelector(`.urli2-${i}`).classList.add("erro-input");
            document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
        } else {
            document.querySelector(`.urli2-${i}`).classList.remove("erro-input");
            document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro uii-${i}"></span>';
        }

    } else {
        document.querySelector(`.urli3-${i}`).classList.remove("erro-input");
        document.querySelector(`.uiii-${i}`).innerHTML = '<span class="texto-erro uiii-${i}"></span>';
    }



    if (imagemIncorreta3 !== "") {
        if (conferirUrl(imagemIncorreta3) === false) {
            document.querySelector(`.urli3-${i}`).classList.add("erro-input");
            document.querySelector(`.uiii-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
        } else {
            document.querySelector(`.urli3-${i}`).classList.remove("erro-input");
            document.querySelector(`.uiii-${i}`).innerHTML = '<span class="texto-erro uiii-${i}"></span>';
        }

        if (respostaIncorreta3 === '') {
            document.querySelector(`.respostai3-${i}`).classList.add("erro-input");
            document.querySelector(`.riii-${i}`).innerHTML = '<span class="texto-erro">Insira uma resposta incorreta</span>';
        } else {
            document.querySelector(`.respostai3-${i}`).classList.remove("erro-input");
            document.querySelector(`.riii-${i}`).innerHTML = '<span class="texto-erro riii-${i}"></span>';
        }

        if (respostaIncorreta2 === "") {
            document.querySelector(`.respostai2-${i}`).classList.add("erro-input");
            document.querySelector(`.rii-${i}`).innerHTML = '<span class="texto-erro">Insira uma resposta incorreta</span>';
        } else {
            document.querySelector(`.respostai2-${i}`).classList.remove("erro-input");
            document.querySelector(`.rii-${i}`).innerHTML = '<span class="texto-erro rii-${i}"></span>';
        }

        if (imagemIncorreta2 === "" || (conferirUrl(imagemIncorreta2) === false && imagemIncorreta2 !== "")) {
            document.querySelector(`.urli2-${i}`).classList.add("erro-input");
            document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
        } else {
            document.querySelector(`.urli2-${i}`).classList.remove("erro-input");
            document.querySelector(`.uii-${i}`).innerHTML = '<span class="texto-erro uii-${i}"></span>';
        }

    }
}


function errosInputNiveis(i) {
    if (!tituloNivelOk) {
        document.querySelector(`.titulonivel-${i}`).classList.add("erro-input");
        document.querySelector(`.tn-${i}`).innerHTML = '<span class="texto-erro">O título do nível deve conter no mínimo 10 caracteres</span>';
    } else {
        document.querySelector(`.titulonivel-${i}`).classList.remove("erro-input");
        document.querySelector(`.tn-${i}`).innerHTML = '<span class="texto-erro tn-${i}"></span>';
    }

    if (!acertoNivelOk) {
        document.querySelector(`.acertonivel-${i}`).classList.add("erro-input");
        document.querySelector(`.an-${i}`).innerHTML = '<span class="texto-erro">Insira um número entre 0 a 100, pelo menos um dos níveis deve ser 0. </span>';
    } else {
        document.querySelector(`.acertonivel-${i}`).classList.remove("erro-input");
        document.querySelector(`.an-${i}`).innerHTML = '<span class="texto-erro an-${i}"></span>';
    }


    if (!imagemNivelOk) {
        document.querySelector(`.imgnivel-${i}`).classList.add("erro-input");
        document.querySelector(`.in-${i}`).innerHTML = '<span class="texto-erro">O valor informado não é uma url válida</span>';
    } else {
        document.querySelector(`.imgnivel-${i}`).classList.remove("erro-input");
        document.querySelector(`.in-${i}`).innerHTML = '<span class="texto-erro in-${i}"></span>';
    }


    if (!descricaoNivelOk) {
        document.querySelector(`.descricaonivel-${i}`).classList.add("erro-input");
        document.querySelector(`.dn-${i}`).innerHTML = '<span class="texto-erro">Insira uma descrição com no mínimo 30 caracteres</span>';
    } else {
        document.querySelector(`.descricaonivel-${i}`).classList.remove("erro-input");
        document.querySelector(`.dn-${i}`).innerHTML = '<span class="texto-erro dn-${i}"></span>';
    }
}