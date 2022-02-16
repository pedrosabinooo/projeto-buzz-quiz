let quizzes;
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
    let tela2 = document.querySelector('.tela2')
    let selecionado = quizzSelecionado.id
    numeroDoQuizz = selecionado.replace('quizz','')
    tela2.classList.toggle('escondido');
    for (let i=0;i<quizzes[numeroDoQuizz].questions.length;i++){
        tela2.innerHTML+=
        `<div class="pergunta" id="pergunta${i}">
            <span><h3>${quizzes[numeroDoQuizz].questions[i].title}</h3></span>
        </div>
        <div class="conteudo" id="conteudo${i}"> 
        </div>`;

        for (let j=0;j<quizzes[numeroDoQuizz].questions[i].answers.length;j++){
            document.querySelector(`#conteudo${i}`).innerHTML+=
            `<div class="perguntas">
                <img src="${quizzes[numeroDoQuizz].questions[i].answers[j].image}" id="${quizzes[numeroDoQuizz].questions[i].answers[j].isCorrectAnswer}"/>
                <p>
                ${quizzes[numeroDoQuizz].questions[i].answers[j].text}
                </p>
            </div>`;
        }
    }
}
