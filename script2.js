// Criar quiz: Informações básicas:::::::::

let titulo;
let tituloOk;
let imagemUrl;
let imagemUrlOk;
let qtdPerguntas;
let qtdPerguntasOk;
let qtdNiveis;
let qtdNiveisOk;

function prosseguirParaCriarPerguntas() {
    titulo = document.querySelector(".titulo-quizz").value;
    tituloOk = (titulo.length >= 20 && titulo.length <= 65);

    imagemUrl = document.querySelector(".imagem-quizz").value;
    imagemUrlOk = (conferirUrl(imagemUrl) === true);

    qtdPerguntas = document.querySelector(".qtd-perguntas").value;
    qtdPerguntasOk = (qtdPerguntas >= 3);
    quantidadeDePerguntas();

    qtdNiveis = document.querySelector(".qtd-niveis").value;
    qtdNiveisOk = (qtdNiveis >= 2);
    quantidadeDeNiveis();

    if (tituloOk && imagemUrlOk && qtdPerguntasOk && qtdNiveisOk) {
        document.querySelector(".informacoes-basicas").classList.add("escondido");
        document.querySelector(".criar-perguntas").classList.remove("escondido");
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

let textoPergunta;
let textoPerguntaOk;

let corFundo;
let corFundoHexa;
let corFundoOk;

let respostaCorreta;
let respostaCorretaOk;

let imagemCorreta;
let imagemCorretaOk;
let respostaEImagemCorretasOk;

let respostaIncorreta1;
let respostaIncorreta1Ok;

let respostaIncorreta2;
let respostaIncorreta2Ok;

let respostaIncorreta3;
let respostaIncorreta3Ok;

let imagemIncorreta1;
let imagemIncorreta1Ok;

let imagemIncorreta2;
let imagemIncorreta2Ok;

let imagemIncorreta3;
let imagemIncorreta3Ok;


let criePerguntas;
let numPergunta;

function quantidadeDePerguntas() {
    criePerguntas = document.querySelector(".perguntas-fechadas");

    for (numPergunta = 2; numPergunta <= qtdPerguntas; numPergunta++) {
        criePerguntas.innerHTML = criePerguntas.innerHTML + `
        <li>
            <div class="adicionar-perguntas">
                <h3>Pergunta ${numPergunta}</h3>
                <ion-icon name="create-outline" onclick="abrirCaixaPergunta(this)"></ion-icon>
            </div>
        </li>
    `;
    }
}

setInterval(verificaInput, 500);

function verificaInput() {
    textoPergunta = document.querySelector(".texto-pergunta").value;
    textoPerguntaOk = (textoPergunta.length <= 20);

    respostaCorreta = document.querySelector(".resposta-correta").value;
    respostaCorretaOk = (valorValido(respostaCorreta) === true);

    imagemCorreta = document.querySelector(".url-correta").value;
    imagemCorretaOk = (conferirUrl(imagemCorreta) === true);
    respostaEImagemCorretasOk = (respostaCorretaOk && imagemCorretaOk);

    respostaIncorreta1 = document.querySelector(".resposta-incorreta1").value;
    respostaIncorreta1Ok = (valorValido(respostaIncorreta1) === true);

    respostaIncorreta2 = document.querySelector(".resposta-incorreta2").value;
    respostaIncorreta2Ok = (valorValido(respostaIncorreta2) === true);

    respostaIncorreta3 = document.querySelector(".resposta-incorreta3").value;
    respostaIncorreta3Ok = (valorValido(respostaIncorreta3) === true);

    imagemIncorreta1 = document.querySelector(".url-incorreta1").value;
    imagemIncorreta1Ok = (conferirUrl(imagemIncorreta1) === true);

    imagemIncorreta2 = document.querySelector(".url-incorreta2").value;
    imagemIncorreta2Ok = (conferirUrl(imagemIncorreta2) === true);

    imagemIncorreta3 = document.querySelector(".url-incorreta3").value;
    imagemIncorreta3Ok = (conferirUrl(imagemIncorreta3) === true);

    if (imagemIncorreta1Ok && respostaIncorreta1Ok) {
        document.querySelector(".resposta-incorreta2").classList.remove("escondido");
        document.querySelector(".url-incorreta2").classList.remove("escondido");
    }

    if (imagemIncorreta2Ok && respostaIncorreta2Ok) {
        document.querySelector(".resposta-incorreta3").classList.remove("escondido");
        document.querySelector(".url-incorreta3").classList.remove("escondido");
    }

}

function verificaRespostasIncorretas() {
    if ((respostaIncorreta3Ok && imagemIncorreta3Ok) && (respostaIncorreta2Ok && imagemIncorreta2Ok) && (respostaIncorreta1Ok && imagemIncorreta1Ok)) {
        return true;
    } else if ((respostaIncorreta2Ok && imagemIncorreta2Ok) && (respostaIncorreta1Ok && imagemIncorreta1Ok) && !(respostaIncorreta3Ok && imagemIncorreta3Ok)) {
        return true;
    } else if ((respostaIncorreta1Ok && imagemIncorreta1Ok) && !(respostaIncorreta2Ok && imagemIncorreta2Ok) && !(respostaIncorreta3Ok && imagemIncorreta3Ok)) {
        return true;
    } else {
        return false;
    }
}

function prosseguirParaCriarNiveis() {
    if ((textoPerguntaOk && corFundoOk && respostaEImagemCorretasOk) && (verificaRespostasIncorretas() === true)) {
        document.querySelector(".criar-perguntas").classList.add("escondido");
        document.querySelector(".criar-niveis").classList.remove("escondido");
    } else {
        alert("Preencha os dados corretamente");
    }
}

function corHexadecimal(cor) {
    for (let i = 1; i < cor.length; i++) {
        if (cor[i] === "A" || cor[i] === "B" || cor[i] === "C" || cor[i] === "D" || cor[i] === "E" || cor[i] === "F" || cor[i] === "a" || cor[i] === "b" || cor[i] === "c" || cor[i] === "d" || cor[i] === "e" || cor[i] === "f") {
            return true;
        } else if (cor[i].type === Number) {
            return true;
        } else {
            return false;
        }
    }
}

// Criar quiz: Crie níveis::::::::: 

function finalizarQuizz() {
    let tituloNivel = document.querySelector(".titulo-nivel").value;
    let tituloNivelOk = (tituloNivel.length >= 10);

    let acertoNivel = document.querySelector(".acerto-nivel").value;
    let acertoNivelOk = (acertoNivel >= 0 && acertoNivel <= 100);

    let imagemNivel = document.querySelector(".imagem-nivel").value;
    let imagemNivelOk = ((conferirUrl(imagemNivel)) === true);

    let descricaoNivel = document.querySelector(".descricao-nivel").value;
    let descricaoNivelOk = (descricaoNivel.length >= 30);

    // É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%:

   
    if (tituloNivelOk && acertoNivelOk && imagemNivelOk && descricaoNivelOk) {
        document.querySelector(".criar-niveis").classList.add(".escondido");
        document.querySelector(".quizz-pronto").classList.remove("escondido");
    } else {
        alert("Insira os dados corretamente!")
    }
}

function quantidadeDeNiveis() {
    crieNiveis = document.querySelector(".niveis-fechados");

    for (numNivel = 2; numNivel <= qtdNivels; numNivel++) {
        crieNiveis.innerHTML = crieNiveis.innerHTML + `
        <li>
            <div class="adicionar-perguntas">
                <h3>Nível ${numNivel}</h3>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        </li>
    `;
    }
}



// Criar quiz: Enviar para API::::::::: 


