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
let user_quizzes_id = [];

/*========================
    AUXILIAR FUNCTIONS
========================*/

function quizzes_carrega() {

    const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
    promise.then(quizzes_renderiza);
    promise.catch(quizzes_erro);

}

function abrir_quizz(elemento, id) {

    const scroll_to_top = document.querySelector(`html`);
    setTimeout(function () { scroll_to_top.scrollIntoView({ behavior: "smooth" }) }, 200);

    quizz_id = id;
    const quizz_carregado = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`);
    quizz_carregado.then(comeca_quizz);
    quizz_carregado.catch(quizzes_erro);



}

//Clears page innerHTML
function limpar_pagina() {
    document.querySelector(".conteudo").innerHTML = "";

}

//Have not been able to detect an error on console besides one 404, which i have not been able to test it
//So this does basically nothing
function quizzes_erro(erro) {
    console.log(erro);
    return;
}

//Random sort
function comparador() {
    return Math.random() - 0.5;
}

function pagina_reset() {
    window.location.reload();
}

//Starts quizz again, remembering to reset variables
//Also scrolls to top of the page quickly
function reset_quizz() {
    reset_variables();
    const scroll_to_top = document.querySelector(`html`);
    setTimeout(function () { scroll_to_top.scrollIntoView({ behavior: "smooth" }) }, 200);
    abrir_quizz(0, quizz_id);
};

//Quits quizz by reseting variables, scrolling to top and reseting the page
function quit_quizz() {
    reset_variables();
    const scroll_to_top = document.querySelector(`html`);
    setTimeout(function () { scroll_to_top.scrollIntoView({ behavior: "smooth" }) }, 200);
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

function verify_localkeys() {
    if (localStorage.getItem("quizzesCriados") !== null) {
        insert_user_questions();
    };
    return;
}

/*========================
    MAIN FUNCTIONS
========================*/


function pagina_inicio() {

    quizzes_carrega();
    verify_localkeys();

}

//Loads quizzes on page excluding user quizzes
//If you're looking for the function which includes user quizzes, refer to insert_user_questions function
function quizzes_renderiza(quizzes) {

    //Detects user quizzes from the main poll of quizzes
    let keys_object = JSON.parse(window.localStorage.getItem('quizzesCriados'));

    user_quizzes_id = [];
    for (let i = 0; i < keys_object.length; i++) {
        user_quizzes_id.push(Number(keys_object[i].id));
    }

    //Clears the innerHTML from selected class
    const quizzes_box = document.querySelector(".caixa_geral_lista");
    quizzes_box.innerHTML = "";

    //Adds quizzes to the main poll, excluding user quizzes (which should be included in its own box)
    for (let i = 0; i < quizzes.data.length; i++) {
        const quizz = quizzes.data[i];

        if (user_quizzes_id.includes(quizz.id)) {
            continue;
        }

        quizzes_box.innerHTML += `
        <div class="caixa_geral_quizz quizz" onclick="abrir_quizz(this, ${quizz.id});">
        <img class="caixa_geral_quizz quizz_background" src="${quizz.image}" />
        <div class="caixa_geral_quizz quizz_titulo"><span>${quizz.title}</span></div>
        </div>
        `;
    }
}

//Starts the quizz when successfull loading
function comeca_quizz(quizz) {

    //Clears page on quizz load
    limpar_pagina();

    const page = document.querySelector(".conteudo");

    //Adds quizz header elements to the page
    page.innerHTML += `
    <div class=quizz_header>
    <img class="quizz_header_img" src="${quizz.data.image}" />
    <div class="quizz_header_titulo"><span>${quizz.data.title}</span></div>
    </div>

    <div class="quizz_question_box"><div class="quizz_questions"></div></div>
    `;

    //Adds quizz questions from recieved object
    const quizz_questions = document.querySelector(".quizz_questions");

    total_answers = quizz.data.questions.length;

    for (let i = 0; i < quizz.data.questions.length; i++) {

        //For each question, user option recieves an empty array
        //Each empty array will store the user selected question when clicking
        user_options.push([]);

        //Adds for each question a box with the question, with its own color and title
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

        //For added question we now add the possible answers inside .answer_box
        const question = document.querySelectorAll(".answer_box");

        let respostas = quizz.data.questions[i].answers;

        //Scrambles the order of the answers so that it'll be random each time it loads on page
        respostas.sort(comparador);

        //Following variable added for the sake of clear reading
        let question_insert = question[i];

        //From answer 0 to answer respostas.length we add the possible options
        for (let j = 0; j < respostas.length; j++) {
            question_insert.innerHTML += `
                <div class="answer_option question${i} answer${j}">
                    <img class="answer_image question_img${i} answer_img${j}" src="${respostas[j].image}" onclick="quizz_option_select(this, ${i}, ${j}, ${respostas.length}); scroll_to_next(${i})"/>
                    <div class="answer_text question_answer${i} answer_answer${j}">
                        <span>${respostas[j].text}</span>
                    </div>
                </div>
            `;

            //We store the quizz correct answers inside gabarito_quizz for future comparisons
            if (respostas[j].isCorrectAnswer == true) {
                gabarito_quizz.push(j);
            }

        }

    }

    //scores stores the possible scores for this specific quizz
    for (let i = 0; i < quizz.data.levels.length; i++) {
        scores.push(quizz.data.levels[i]);
    }

}

//This should be an auxiliary function actually, its used as an intermediary state to remove onclick attribute when clicking the answer
//If the total answered questions equals the total of questions then it goes to calculate_score
//Note that element variable does nothing and im too afraid to remove it from the entire code since ive used the same name on other instances
function quizz_option_select(element, question, option, total_respostas_pergunta) {

    let answer_status = false;
    user_options[question] = [question, option];

    //This is used to verify if answered question is the right one
    //deprecated code actually, its not being used, but im not sure if removing it would affect other instances
    if (gabarito_quizz[question] == option) {
        answer_status = true;
    }

    //Goes to remove_click function for the answered question
    remove_click(question, answer_status, total_respostas_pergunta);

    if (questions_answered == total_answers) {
        calculate_score();
    }

    return;
}


//Removes onclick attribute
function remove_click(question, answer_status, total_respostas_pergunta) {
    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element = document.querySelectorAll(`.question${question} > .answer_img${i}`);
        element[0].removeAttribute("onclick");
    }

    //Applies overlay to the answered question
    apply_answer_overlay(question, answer_status, total_respostas_pergunta);
    questions_answered = questions_answered + 1;

    return;
}

//Applies answered overlay to answered question
function apply_answer_overlay(question, answer_status, total_respostas_pergunta) {

    //Deprecated, wrong interpretation of requirements
    //Was used to apply white overlay on non-selected answers
    //and not apply on selected answers
    for (let i = 0; i < total_respostas_pergunta; i++) {
        let element = document.querySelector(`.question${question} .answer_img${i}`);

        if (user_options[question][1] == i) {
            element.classList.add("selecionado");
        }
        else if (user_options[question][1] != i) {
            element.classList.add("nao_selecionado");
        }
    }

    //Applies overlay on wrong answer alternatives by adding .incorreto class
    //Does not apply overlay on .correto class
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

//Calculates the user score to display after answering the last question
function calculate_score() {

    //If user option equals the value on gabarito then user score is incremented
    for (let i = 0; i < gabarito_quizz.length; i++) {
        if (user_options[i][1] == gabarito_quizz[i]) {
            user_score_value++;
        }
    }

    //Converts user score to percentage and rounds to closest integer
    user_score_percentage = Math.round(100 * Number(user_score_value) / Number(gabarito_quizz.length));

    let index_largest_closest = 0;
    let largest_closest = scores[index_largest_closest].minValue;

    //Searches for the quizz closest lowest level to the user score
    for (let i = 0; i < scores.length; i++) {

        //Case: level above user score, should be ignored always
        if (scores[i].minValue > user_score_percentage) {
            continue;
        }

        //if the score is lower than user score AND the user score percentage is larger or equal to the last closest larger
        //Then it stores the index of the closest larger
        else if (scores[i].minValue <= user_score_percentage && user_score_percentage >= largest_closest) {
            largest_closest = scores[i].minValue;
            index_largest_closest = i;
        }

    }
    //The level that should be displayed is the one that corresponds to the closest lower
    //So we add the result that corresponds to that
    add_result_screen(scores[index_largest_closest]);
    return;
};

//Adds result of quizz
function add_result_screen(object) {

    //Appends result to the end of quizz
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

    //Adds reset quizz and quit quizz button
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

//After answering question it goes to the first unanswered question
//If the user answers the first question it goes to the second
//If the user starts with the last question then it goes to the first
//So on and so on
function scroll_to_next(answered_question) {

    //array_perguntas stores answered questions, this was going to be used for a length verification
    //Its deprecated and useless as far as i can see
    const array_perguntas = [];
    for (let i = 0; i < gabarito_quizz.length; i++) {
        array_perguntas.push(i);
    }

    //Searches for first unanswered question by using an earlier object and verifies if its value is undefined
    //That means it was not answered yet
    let first_unanswered = 0;
    for (let i = 0; i < user_options.length; i++) {
        if (user_options[i][0] == undefined) {
            first_unanswered = i;
            break;
        }
    }

    //Verifies if all questions have been answered
    let skipped_questions = false;
    for (let i = 0; i < user_options.length; i++) {
        if (user_options[i][0] == undefined) {
            skipped_questions = false;
            break;
        }
        else if (user_options[i][0] != undefined) {
            skipped_questions = true;
        }
    }

    //Scrolls to the first unanswered question
    if (!skipped_questions) {
        const question_to_scroll = document.querySelector(`.question_box_${first_unanswered}`);
        const scroll_question = setTimeout(function () { question_to_scroll.scrollIntoView({ behavior: "smooth" }) }, 2000);
    };

    //If no questions have been skipped and all have been ansewered it scrolls to results
    //The verification for this is based on the length of user_options and if there is any undefined values
    if (skipped_questions) {
        const result_to_scroll = document.querySelector(`.results`);
        const scroll_result = setTimeout(function () { result_to_scroll.scrollIntoView({ behavior: "smooth" }) }, 2000);
    }

    return;
}

//Adds user quizzes to the user quizzes box at the start of the page
function insert_user_questions() {
    let keys_object = JSON.parse(window.localStorage.getItem('quizzesCriados'));

    let num_user_quizzes = keys_object.length;

    //Its easier to hide the box without quizzes and show the box with quizzes since their layouts differ
    document.querySelector(".caixa_usuario").classList.add("escondido");
    document.querySelector(".caixa_seusquizzes").classList.remove("escondido");

    //Cleans the inner html of the user quizzes every time a new quizz is included
    //This is just a safety measure, i have not tested if it would duplicate the information but i feel like it would
    document.querySelector(".caixa_seusquizzes").innerHTML = "";

    let user_box = document.querySelector(".caixa_seusquizzes");

    user_box.innerHTML = `
    <div class="insert_new_user_quizz">
    <span>Seus quizzes</span>
    <button onclick="criarQuizz();">
    <img src="./files/plus_icon.svg" />
    </buttom>
    </div>
    <div class="list_user_quizz">
    </div>
    `;

    //For each user created quizz we add it to the user quizz box, starting from the last inserted quizz and going all the way to the first inserted
    user_box = document.querySelector(".list_user_quizz");
    for (let i = num_user_quizzes - 1; i >= 0; i--) {
        user_box.innerHTML += `
            <div class="user_quizz user_quizz2" onclick="abrir_quizz(this, ${keys_object[i].id});">
                <img class="user_quizz user_quizz_background" src="${keys_object[i].background_image}" />
                <div class="user_quizz user_quizz_titulo"><span>${keys_object[i].title}</span></div>
            </div>
        `;


    }
}

//document.getElementById('scroll-here-plz').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});