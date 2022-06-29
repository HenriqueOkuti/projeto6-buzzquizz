/*========================
    GLOBAL VARIABLES
========================*/



/*========================
    AUXILIAR FUNCTIONS
========================*/

function quizzes_carrega() {

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(quizzes_renderiza);
    promise.catch(quizzes_erro);

}

function abrir_quizz(elemento, id, interval_clear){
    console.log(elemento + " " + id);

    limpar_pagina();

    const quizz_carregado = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    quizz_carregado.then(comeca_quizz);
    quizz_carregado.catch(quizzes_erro);


    if (quizz_terminou == true){
        pagina_inicio();
    }

}

function limpar_pagina(){
    console.log("Limpar página");
}


function quizzes_erro(erro) {
    console.log();
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


function comeca_quizz(quizz){

    console.log(`Abriu o quizz: ${quizz.data.title}`);

}