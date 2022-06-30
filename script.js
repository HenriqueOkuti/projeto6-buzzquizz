/*========================
    GLOBAL VARIABLES
========================*/

let gabarito_quizz = [];
let scores = [];
let user_score = [];
let questions_answered = 0;
let total_answers = -50;
let user_options = [];

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

function comparador() {
    return Math.random() - 0.5;
}

function pagina_reset() {
    window.location.reload();
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

    total_answers = quizz.data.questions.length;

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
                <div class="answer_option question${i} answer${j}">
                    <img class="answer_image question_img${i} answer_img${j}" src="${respostas[j].image}" onclick="quizz_option_select(this, ${i}, ${j}, ${respostas.length})"/>
                    <div class="answer_text question_answer${i} answer_answer${j}">
                        <span>${respostas[j].text}</span>
                    </div>
                </div>
            `;
            //console.log(respostas[j].isCorrectAnswer);
            if (respostas[j].isCorrectAnswer == true) {
                gabarito_quizz.push(j);
            }

        }

    }

    for (let i = 0; i < quizz.data.levels.length; i++) {
        scores.push(quizz.data.levels[i]);
    }

    // Calculo de questões respondidas é global

    if (questions_answered == total_answers) {
        calculate_score();
    }

    // Função que calcula o score

    calculate_score();

    // Função que finaliza o questionario (quizz_terminou = true)


    // Finaliza questionário
    if (quizz_terminou === true) {
        gabarito_quizz = [];
        scores = [];
        questions_answered = 0;
        total_answers = -50;
        pagina_reset();
    }

}

function quizz_option_select(element, question, option, total_respostas_pergunta) {
    //console.log(scores)
    console.log(gabarito_quizz);

    let answer_status = false;
    user_options.push(option);
    if (gabarito_quizz[question] == option) {
        console.log(`Acertou ${question} ${option}`);
        answer_status = true;
    }
    else {
        console.log(`Errou ${question} ${option}`);
    }
    remove_click(question, answer_status, total_respostas_pergunta);
    return;
}

function calculate_score() {
    return null;
}


function remove_click(question, answer_status, total_respostas_pergunta) {
    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element = document.querySelectorAll(`.question${question} > .answer_img${i}`);
        element[0].removeAttribute("onclick");
    }
    apply_answer_overlay(question, answer_status, total_respostas_pergunta);
    questions_answered++;
    console.log(questions_answered);
    return;
}

function apply_answer_overlay(question, answer_status, total_respostas_pergunta) {
    
    console.log(`Question ${question} is right? ${answer_status}`);

    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element = document.querySelector(`.question${question} .answer_img${i}`);
        
        if (user_options[question] == i){
            element.classList.add("selecionado");
            console.log("Entrou no if");
        }
        else if (user_options[question] != i) {
            element.classList.add("nao_selecionado");
            console.log("Não entrou no if");
        }
    }

    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element2 = document.querySelector(`.question${question} .answer_answer${i}`);
        
        if (gabarito_quizz[question] == i){
            element2.classList.add("correto");
            console.log("Entrou no if span");
        }
        else if (gabarito_quizz[question] != i) {
            element2.classList.add("incorreto");
            console.log("Não entrou no if span");
        }
    }

};

function calculate_score() { };

