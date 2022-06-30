/*========================
    GLOBAL VARIABLES
========================*/

let gabarito_quizz = [];

/*========================
    AUXILIAR FUNCTIONS
========================*/

function quizzes_carrega() {

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(quizzes_renderiza);
    promise.catch(quizzes_erro);

}

function abrir_quizz(elemento, id) {

    const quizz_carregado = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    quizz_carregado.then(comeca_quizz);
    quizz_carregado.catch(quizzes_erro);

}

function limpar_pagina() {
    document.querySelector(".conteudo").innerHTML = "";

}


function quizzes_erro(erro) {
    console.log(erro);
}

function comparador(){
    return Math.random() - 0.5;
}


/*========================
    MAIN FUNCTIONS
========================*/


function pagina_inicio() {

    quizzes_carrega();

}

function quizzes_renderiza(quizzes) {

    const quizzes_box = document.querySelector(".caixa_geral_lista");
    quizzes_box.innerHTML = "";

    for (let i = 0; i < quizzes.data.length; i++) {
        const quizz = quizzes.data[i];

        quizzes_box.innerHTML += `
        <div class="caixa_geral_quizz quizz" onclick="abrir_quizz(this, ${quizz.id});">
        <img class="caixa_geral_quizz quizz_background" src="${quizz.image}" />
        <div class="caixa_geral_quizz quizz_titulo"><span>${quizz.title}</span></div>
        </div>
        `;
    }
}


function comeca_quizz(quizz) {

    let quizz_terminou = false;

    limpar_pagina();

    const page = document.querySelector(".conteudo");



    page.innerHTML += `
    <div class=quizz_header>
    <img class="quizz_header_img" src="${quizz.data.image}" />
    <div class="quizz_header_titulo"><span>${quizz.data.title}</span></div>
    </div>

    <div class="quizz_question_box"><div class="quizz_questions"></div></div>
    `;

    const quizz_questions = document.querySelector(".quizz_questions");

    for (let i = 0; i < quizz.data.questions.length; i++) {
        quizz_questions.innerHTML += `
        <div class="question_box">
            <div class="question_title" style="background-color: ${quizz.data.questions[i].color};">
                <div class="question_title_text">${quizz.data.questions[i].title}</div>
            </div>
            <div class="question_box_content">
                <div class="answer_box">
                </div>
            </div>
        </div>
        `;
        const question = document.querySelectorAll(".answer_box");

        let respostas = quizz.data.questions[i].answers;

        respostas.sort(comparador);

        let question_insert = question[i];

        for (let j = 0; j < respostas.length; j++) {
            question_insert.innerHTML += `
                <div class="answer_option">
                    <img class="answer_image" src="${respostas[j].image}" onclick="quizz_option_select(this, ${j})"/>
                    <div class="answer_text">
                        <span>${respostas[j].text}</span>
                    </div>
                </div>
            `;
            console.log(respostas[j].isCorrectAnswer);
            if (respostas.isCorrectAnswer == true){
                gabarito_quizz.push(j);
            }

        }

    }


    if (quizz_terminou === true) {
        gabarito_quizz = [];
        pagina_inicio();
    }

}

function quizz_option_select(element, option){
    console.log("Clicou");
    console.log(gabarito_quizz);
}