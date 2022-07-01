/*========================
    GLOBAL VARIABLES
========================*/

let gabarito_quizz = [];
let scores = [];
let user_score = [];
let user_score_value = 0;
let questions_answered = 0;
let total_answers = -50;
let user_options = [];
let user_score_percentage = 0;
let quizz_id = 0;

/*========================
    AUXILIAR FUNCTIONS
========================*/

function quizzes_carrega() {

    const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
    promise.then(quizzes_renderiza);
    promise.catch(quizzes_erro);

}

function abrir_quizz(elemento, id) {

    quizz_id = id;
    const quizz_carregado = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`);
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

function reset_quizz() {
    reset_variables();
    window.scrollTo(0, 0);
    abrir_quizz(0, quizz_id);
};

function quit_quizz() {
    reset_variables();
    window.scrollTo(0, 0);
    pagina_reset()
};

function reset_variables() {
    gabarito_quizz = [];
    user_selected = [];
    user_options = [];
    scores = [];
    questions_answered = 0;
    user_score_value = 0;
    total_answers = -50;
    user_score = [];
    user_score_percentage = 0;

    return;
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

    //scroll to top of page after loading a quizz:
    page.scrollIntoView();

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

        user_options.push([]);


        quizz_questions.innerHTML += `
        <div class="question_box question_box_${i}">
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
                    <img class="answer_image question_img${i} answer_img${j}" src="${respostas[j].image}" onclick="quizz_option_select(this, ${i}, ${j}, ${respostas.length}); scroll_to_next(${i})"/>
                    <div class="answer_text question_answer${i} answer_answer${j}">
                        <span>${respostas[j].text}</span>
                    </div>
                </div>
            `;
            if (respostas[j].isCorrectAnswer == true) {
                gabarito_quizz.push(j);
            }

        }

    }

    for (let i = 0; i < quizz.data.levels.length; i++) {
        scores.push(quizz.data.levels[i]);
    }

}

function quizz_option_select(element, question, option, total_respostas_pergunta) {

    let answer_status = false;
    user_options[question] = [question, option];
    if (gabarito_quizz[question] == option) {
        answer_status = true;
    }
    remove_click(question, answer_status, total_respostas_pergunta);

    if (questions_answered == total_answers) {
        calculate_score();
    }

    return;
}


function remove_click(question, answer_status, total_respostas_pergunta) {
    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element = document.querySelectorAll(`.question${question} > .answer_img${i}`);
        element[0].removeAttribute("onclick");
    }
    apply_answer_overlay(question, answer_status, total_respostas_pergunta);
    questions_answered = questions_answered + 1;

    return;
}

function apply_answer_overlay(question, answer_status, total_respostas_pergunta) {

    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element = document.querySelector(`.question${question} .answer_img${i}`);

        if (user_options[question][1] == i) {
            element.classList.add("selecionado");
        }
        else if (user_options[question][1] != i) {
            element.classList.add("nao_selecionado");
        }
    }

    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element2 = document.querySelector(`.question${question} .answer_answer${i}`);

        if (gabarito_quizz[question] == i) {
            element2.classList.add("correto");
        }
        else if (gabarito_quizz[question] != i) {
            element2.classList.add("incorreto");
        }
    }

    return;

};

function calculate_score() {

    for (let i = 0; i < gabarito_quizz.length; i++) {
        if (user_options[i][1] == gabarito_quizz[i]) {
            user_score_value++;
        }
    }

    user_score_percentage = Math.round(100 * Number(user_score_value) / Number(gabarito_quizz.length));

    let arr = [];
    for (let i = 0; i < scores.length; i++) {
        arr.push(scores[i].minValue);
    }

    let number = arr.sort().reverse().find(e => e <= user_score_percentage);
    for (let i = 0; i < scores.length; i++) {
        if (scores[i].minValue == number) {
            add_result_screen(scores[i]);
        }
    }

    return;
};

function add_result_screen(object) {

    const page = document.querySelector(".conteudo");

    page.innerHTML += `
    <div class="question_box">
        <div class="results">
            <div class="results_title_box" style="#EC362D;">
                <div class="results_title_box_text">
                    <span>${user_score_percentage}% de acerto: ${object.title}</span>
                </div>
            </div>
            <div class="results_content">
                <div class="results_img_div"><img class="results_img" src="${object.image}" /></div>
                <div class="results_text">
                    <span>${object.text}</span>
                </div>
            </div>
        </div>
    </div>
    `;

    page.innerHTML += `
        <div class="quizz_reset" onclick="reset_quizz()">
            <span class="reset_text">Reiniciar Quizz</span>
        </div>
        <div class="quizz_quit" onclick="quit_quizz()">
            <span class="quit_text">Voltar para home</span>
        </div>
    `;

    return;
}

function scroll_to_next(answered_question) {
    const array_perguntas = [];
    for (let i = 0; i < gabarito_quizz.length; i++) {
        array_perguntas.push(i);
    }

    //Searches for first unanswered question:
    let first_unanswered = 0;
    for (let i = 0; i<user_options.length; i++){
        if (user_options[i][0] == undefined){
            first_unanswered = i;
            break;
        }
    }

    //Verifies if all questions have been answered:
    let skipped_questions = false;
    for (let i = 0; i<user_options.length; i++){
        if (user_options[i][0] == undefined){
            skipped_questions = false;
            break;
        }
        else if (user_options[i][0] != undefined){
            skipped_questions = true;
        }
    }

    if (!skipped_questions) {
        const question_to_scroll = document.querySelector(`.question_box_${first_unanswered}`);
        const scroll_question = setTimeout(function () { question_to_scroll.scrollIntoView({ behavior: "smooth" }) }, 2000);
    };

    if (skipped_questions) {
        const result_to_scroll = document.querySelector(`.results`);
        const scroll_result = setTimeout(function () { result_to_scroll.scrollIntoView({ behavior: "smooth" }) }, 2000);
    }

    return;
}

//document.getElementById('scroll-here-plz').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});