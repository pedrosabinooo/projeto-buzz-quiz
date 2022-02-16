let quizzes;
let acertos=0;
const todosOsQuizzes=document.querySelector(".todos-os-quizzes .conteudo")
const quizPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
quizPromise.then(renderizarTodosOsQuizzes);

function renderizarTodosOsQuizzes(response){
    quizzes = response.data
    for(let i=0;i<quizzes.length;i++){
        todosOsQuizzes.innerHTML += 
        `<div class="quizz" id="quizz${i}" onclick="tela2(this)">
            <h2>${quizzes[i].title}</h2>
        </div>`;

        document.getElementById("quizz"+i).style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.85)25%, transparent 75%), url("${quizzes[i].image}")`;
    }
};

function tela2(quizzSelecionado){
    document.querySelector(".criar-quizz").classList.add("escondido");
    document.querySelector(".seus-quizzes").classList.add("escondido");
    document.querySelector(".todos-os-quizzes").classList.add("escondido");
    let tela2 = document.querySelector('.tela2')
    let selecionado = quizzSelecionado.id
    numeroDoQuizz = selecionado.replace('quizz','')
    tela2.classList.toggle('escondido');
    tela2.innerHTML=
    `<div class="quizz-banner">
        <img src="${quizzes[numeroDoQuizz].image}"/>
        <h2>${quizzes[numeroDoQuizz].title}</h2>
    <div>`;
    for (let i=0;i<quizzes[numeroDoQuizz].questions.length;i++){
        tela2.innerHTML+=
        `<div class="pergunta" id="pergunta${i}">
            <span><h3>${quizzes[numeroDoQuizz].questions[i].title}</h3></span>
        </div>
        <div class="conteudo" id="conteudo${i}"> 
        </div>`;

        for (let j=0;j<quizzes[numeroDoQuizz].questions[i].answers.length;j++){
            document.querySelector(`#conteudo${i}`).innerHTML+=
            `<div class="perguntas" style="order: ${Math.floor(Math.random() * 11)}" onclick="selecionarResposta(this)" data-id="${quizzes[numeroDoQuizz].questions[i].answers[j].isCorrectAnswer}">
                <img src="${quizzes[numeroDoQuizz].questions[i].answers[j].image}"/>
                <p>
                ${quizzes[numeroDoQuizz].questions[i].answers[j].text}
                </p>
            </div>`;
        }
    }
}

function selecionarResposta(selecao){
    let htmlArray=selecao.parentNode.children;
    let acerto=selecao.getAttribute('data-id');
    console.log(htmlArray);
    if(acerto==="true" || acerto==="false"){
        if(acerto==="true"){
        acertos += 1;
        selecao.style.filter="opacity(100%)";
    }
    for (let i=0;i<htmlArray.length;i++){
        marcarResposta(htmlArray[i]);
    }
    selecao.style.filter="opacity(100%)";
    }
    setTimeout(()=>{window.scrollBy(0, 300)},2000)
}
function marcarResposta(selecao){
    let acerto=selecao.getAttribute('data-id')
    if(acerto==='true'){
        selecao.style.filter="opacity(50%)"
        selecao.style.color= "green";
        selecao.setAttribute('data-id','clicked');
    }else{
        selecao.style.filter="opacity(50%)"
        selecao.style.color="red"
        selecao.setAttribute('data-id','clicked'); 
    }
}

function criarInfoBasicaQuizz() {
    document.querySelector("main").classList.add("escondido");
    document.querySelector(".criacao-de-quiz").classList.remove("escondido");
}

function criarPerguntasQuizz() {
    document.querySelector(".info-basica").classList.add("escondido");
    document.querySelector(".criacao-perguntas").classList.remove("escondido");
    renderizarCriacaoPerguntas(document.querySelector(".info-basica"));
    // Adicionar validação dos inputs
}

function renderizarCriacaoPerguntas() {

}

function criarNiveisQuizz() {
    document.querySelector(".criacao-perguntas").classList.add("escondido");
    document.querySelector(".criacao-niveis").classList.remove("escondido");
    // Adicionar validação dos inputs
}

function finalizarQuizz() {
    document.querySelector(".criacao-niveis").classList.add("escondido");
    document.querySelector(".finalizar-criacao-quiz").classList.remove("escondido");
}

function editarPergunta(novaPerguntaSelecionada) {
    novaPerguntaSelecionada.parentNode.parentNode.querySelector("div:last-child").classList.add("pergunta-selecionada pergunta-atual")
    document.querySelectorAll(".criacao-perguntas article>div:last-child").forEach((elemento) => {
        if (elemento.classList.contains("pergunta-selecionada") && !elemento.classList.contains("pergunta-atual")) {
            elemento.classList.toggle("escondido");
            elemento.parentNode.querySelector("img").classList.toggle("escondido");
        }
    })
}

function editarNivel(novoNivelSelecionado) {
    novoNivelSelecionado.parentNode.parentNode.querySelector("div:last-child").classList.add("nivel-selecionado nivel-atual")
    document.querySelectorAll(".criacao-niveis article>div:last-child").forEach((elemento) => {
        if (elemento.classList.contains("nivel-selecionado") && !elemento.classList.contains("nivel-atual")) {
            elemento.classList.toggle("escondido");
            elemento.parentNode.querySelector("img").classList.toggle("escondido");
        }
    })
}

function voltarParaAHome() {
    document.querySelector(".criacao-de-quiz").classList.add("escondido");
    document.querySelector("main").classList.remove("escondido");
    document.querySelector(".finalizar-criacao-quiz").classList.add("escondido");
    document.querySelector(".info-basica").classList.remove("escondido");
}