let titulo;
let tituloOk;
let imagem;
let imagemOk;
let qtdPerguntas;
let qtdPerguntasOk;
let qtdNiveis;
let qtdNiveisOk;

function prosseguirParaCriarPerguntas() {
    titulo = document.querySelector(".titulo-quizz").value; 
    tituloOk = (titulo.length >= 20  && titulo.length <= 65);

    imagem = document.querySelector(".imagem-quizz").value;
    imagemOk = (conferirUrl(imagem) === true); 

    qtdPerguntas = document.querySelector(".qtd-perguntas").value;
    qtdPerguntasOk = (qtdPerguntas >= 3); //quantidade de perguntas daqui irá adicionar perguntas da próxima página

    qtdNiveis = document.querySelector(".qtd-niveis").value;
    qtdNiveisOk = (qtdNiveis >= 2);

    if (tituloOk && imagemOk && qtdPerguntasOk && qtdNiveisOk){
        document.querySelector(".informacoes-basicas").classList.add("escondido");
        document.querySelector(".criar-perguntas").classList.remove("escondido");
    } else {
        alert ("Insira os dados corretamente!");
    }
}

function conferirUrl(img){
    try {
        let url = new URL(img)
        return true;
    } catch(err) {
        return false;
    }
}

function quantidadePerguntas(){
    
    for (let i = 0; i < qtdPerguntas; i++){

    }
}

function prosseguirParaCriarNiveis(){
    // texto da pergunta deve ter no mínimo 20 caracteres
    // cor de fundo hexadecimal
    // texto das respostas não pode estar vazio
    // url das imagens de resposta: formato de url
    // obrigatória inserção de resposta correta e pelo menos 1 resposta errada
    // caso alguma validação falhar exibir um alerta pedindo para o usuário preencher os dados corretamente
}









