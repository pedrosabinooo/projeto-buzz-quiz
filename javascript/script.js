let meusQuizzes = [];
let quizzes;
let quizzAtual;
let acertos = 0;
let tentativas=0;
const tela2 = document.querySelector('.tela2');
const todosOsQuizzes = document.querySelector(".todos-os-quizzes .conteudo")
const quizPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
quizPromise.then(renderizarTodosOsQuizzes);

function renderizarTodosOsQuizzes(response) {
    quizzes = response.data
    for (let i = 0; i < quizzes.length; i++) {
        todosOsQuizzes.innerHTML +=
            `<div class="quizz" id="quizz${i}" onclick="mostrarTela2(this)">
            <h2>${quizzes[i].title}</h2>
        </div>`;

        document.getElementById("quizz" + i).style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.85)25%, transparent 75%), url("${quizzes[i].image}")`;
    }
};

function mostrarTela2(quizzSelecionado) {
    quizzAtual=quizzSelecionado
    let selecionado = quizzSelecionado.id;
    numeroDoQuizz = selecionado.replace('quizz', '');
    document.querySelector('.responder-quizz').classList.remove('escondido');
    document.querySelector('main').classList.add('escondido');
    tela2.innerHTML =
        `<div class="quizz-banner">
        <img src="${quizzes[numeroDoQuizz].image}"/>
        <h2>${quizzes[numeroDoQuizz].title}</h2>
    <div>`;
    for (let i = 0; i < quizzes[numeroDoQuizz].questions.length; i++) {
        tela2.innerHTML +=
            `<div class="pergunta" id="pergunta${i}" style="background-color: ${quizzes[numeroDoQuizz].questions[i].color}">
            <span><h3>${quizzes[numeroDoQuizz].questions[i].title}</h3></span>
        </div>
        <div class="conteudo" id="conteudo${i}"> 
        </div>`;

        for (let j = 0; j < quizzes[numeroDoQuizz].questions[i].answers.length; j++) {
            document.querySelector(`#conteudo${i}`).innerHTML +=
                `<div class="perguntas" style="order: ${Math.floor(Math.random() * 11)}" onclick="selecionarResposta(this)" data-id="${quizzes[numeroDoQuizz].questions[i].answers[j].isCorrectAnswer}">
                <img src="${quizzes[numeroDoQuizz].questions[i].answers[j].image}"/>
                <p>
                ${quizzes[numeroDoQuizz].questions[i].answers[j].text}
                </p>
            </div>`;
        }
    }
    tela2.innerHTML +="<div class='resultado'></div>";
}

function selecionarResposta(selecao){
    let htmlArray=selecao.parentNode.children;
    let acerto=selecao.getAttribute('data-id');
    if(acerto==="true" || acerto==="false"){
        if(acerto==="true"){
        acertos += 1;
        selecao.style.filter="opacity(100%)";
    }
    for (let i=0;i<htmlArray.length;i++){
        marcarResposta(htmlArray[i]);
    }
    selecao.style.filter="opacity(100%)";
    tentativas += 1;
    setTimeout(()=>{window.scrollBy({
        top: 300,
        behavior : "smooth"
    })},2000)
    setTimeout(resultadoDoQuizz,2000);
    } 
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

function resultadoDoQuizz(){
    let tela2Resultado=document.querySelector('.tela2 .resultado')
    if(tentativas===quizzes[numeroDoQuizz].questions.length){

        let percentagem = Math.round((acertos/tentativas)*100);
        let indiceN;
        for (let i=0; i < quizzes[numeroDoQuizz].levels.length; i++){
            if(quizzes[numeroDoQuizz].levels[i].minValue <= percentagem){
                indiceN=i
            }
        }

        tela2Resultado.innerHTML +=
        `<div class="pergunta" id="resultadoQuizz" style="background-color: red">
            <span><h3>${percentagem}% de acerto: ${quizzes[numeroDoQuizz].levels[indiceN].title}</h3></span>
        </div>
        <div class="conteudo" id="conteudoResultado">
            <img src="${quizzes[numeroDoQuizz].levels[indiceN].image}"/>
            <p>${quizzes[numeroDoQuizz].levels[indiceN].text}</p> 
        </div>
        <div class="quizzFinalizado">
            <button id="reiniciarQuizz" onclick="reiniciarQuizz()"><p>Reiniciar quizz</p></button>
            <h4 onclick="voltarParaAHome()">Voltar pra home</h4>
        </div>`
        ;

        setTimeout(()=>{window.scrollBy({
            top: 10000,
            behavior : "smooth"
        })},500)
    }
}

function reiniciarQuizz() {
    acertos=0;
    tentativas=0;
    window.scrollTo(0, 0);
    mostrarTela2(quizzAtual);
}

let meuQuizz = {
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [],
	levels: []
}
let minhaPergunta = {
    title: "Título da pergunta 1",
    color: "#123456",
    answers: []
}
let meuNivel = {
    title: "Título do nível 1",
    image: "https://http.cat/411.jpg",
    text: "Descrição do nível 1",
    minValue: 0
}
function criarInfoBasicaQuizz() {
    document.querySelector("main").classList.add("escondido");
    document.querySelector(".criacao-de-quiz").classList.remove("escondido");
}

function criarPerguntasQuizz() {
    if (validarInfoBasica()) {
        document.querySelector(".info-basica").classList.add("escondido");
        document.querySelector(".criacao-perguntas").classList.remove("escondido");
        renderizarCriacaoPerguntas();
    } else {
        alert("Preencha os campos corretamente para continuar criando o seu Quizz.\n\nTítulo do quizz: deve ter no mínimo 20 e no máximo 65 caracteres\nURL da Imagem: deve ter formato de URL\nQuantidade de perguntas: no mínimo 3 perguntas\nQuantidade de níveis: no mínimo 2 níveis")
    }
}

let qtdPerguntas;
function renderizarCriacaoPerguntas() {
    qtdPerguntas = parseInt(document.querySelector(".criacao-de-quiz .info-basica .qtd-de-perguntas").value);
    document.querySelector(".criacao-de-quiz .criacao-perguntas .inputs").innerHTML = '';
    let perguntasHTML = document.querySelector(".criacao-de-quiz .criacao-perguntas .inputs");
    for (let i = 0; i < qtdPerguntas; i++) {
        perguntasHTML.innerHTML += `
        <article>
            <div>
                <span><h2>Pergunta ${i + 1}</h2></span>
                <img onclick="editarPergunta(this)" src="./media/edit.svg" alt="Editar pergunta">
            </div>
            <div class="escondido">
                <input id="textoPergunta${i + 1}" type="text" placeholder="Texto da pergunta">
                <input id="corPergunta${i + 1}" type="text" placeholder="Cor de fundo da pergunta">
                <span><h2>Resposta correta</h2></span>
                <input id="respostaCorreta${i + 1}" type="text" placeholder="Resposta correta">
                <input id="urlRespostaCorreta${i + 1}" type="text" placeholder="URL da imagem">
                <span><h2>Respostas incorretas</h2></span>
                <input id="respostaIncorreta1${i + 1}" type="text" placeholder="Resposta incorreta 1">
                <input id="urlRespostaIncorreta1${i + 1}" type="text" placeholder="URL da imagem 1">
                <input id="respostaIncorreta2${i + 1}" type="text" placeholder="Resposta incorreta 2">
                <input id="urlRespostaIncorreta2${i + 1}" type="text" placeholder="URL da imagem 2">
                <input id="respostaIncorreta2${i + 1}" type="text" placeholder="Resposta incorreta 3">
                <input id="urlRespostaIncorreta3${i + 1}" type="text" placeholder="URL da imagem 3">
            </div>
        </article>
        `;
        if (i === 0) {
            perguntasHTML.querySelector("article:last-child img").classList.add("escondido");
            perguntasHTML.querySelector("article:last-child div:last-child").classList.add("pergunta-selecionada");
            perguntasHTML.querySelector("article:last-child div:last-child").classList.remove("escondido");
        }
    }
}

function validarInfoBasica() {
    let tituloCriacaoQuizz = document.querySelector(".criacao-de-quiz .info-basica .titulo-criacao-quiz").value;
    let urlCriacaoQuizz = document.querySelector(".criacao-de-quiz .info-basica .url-criacao-quiz").value;
    let qtdDePerguntas = document.querySelector(".criacao-de-quiz .info-basica .qtd-de-perguntas").value;
    let qtdDeNiveis = document.querySelector(".criacao-de-quiz .info-basica .qtd-de-niveis").value;
    if (tituloCriacaoQuizz.length < 20 || tituloCriacaoQuizz.length > 65 || parseInt(qtdDePerguntas) < 3 || parseInt(qtdDeNiveis) < 2 || (urlCriacaoQuizz.indexOf("https://") < 0 && urlCriacaoQuizz.indexOf("http://") < 0)) {
        return false;
    } else {
        meuQuizz.title = tituloCriacaoQuizz;
        meuQuizz.image = urlCriacaoQuizz;
        return true;
    }
}

function criarNiveisQuizz() {
    if (validarCriacaoPerguntas()) {
        document.querySelector(".criacao-perguntas").classList.add("escondido");
        document.querySelector(".criacao-niveis").classList.remove("escondido");
        renderizarCriacaoNiveis();
    } else {
        alert("Preencha os campos corretamente para continuar criando o seu Quizz.\n\nTexto da pergunta: no mínimo 20 caracteres\nCor de fundo: deve ser uma cor em hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)\nTextos das respostas: não pode estar vazio\nURL das imagens de resposta: deve ter formato de URL\nÉ obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada. Portanto, é permitido existirem perguntas com só 2 ou 3 respostas")
    }
}

let qtdNiveis;
function renderizarCriacaoNiveis() {
    qtdNiveis = parseInt(document.querySelector(".criacao-de-quiz .info-basica .qtd-de-niveis").value);
    document.querySelector(".criacao-de-quiz .criacao-niveis .inputs").innerHTML = '';
    let niveisHTML = document.querySelector(".criacao-de-quiz .criacao-niveis .inputs");
    for (let i = 0; i < qtdNiveis; i++) {
        niveisHTML.innerHTML += `
            <article>
                <div>
                    <span><h2>Nível ${i + 1}</h2></span>
                    <img onclick="editarNivel(this)" src="./media/edit.svg" alt="Editar nível">
                </div>
                <div class="escondido">
                    <input id="tituloNivel${i + 1}" type="text" placeholder="Título do nível">
                    <input id="minAcertoNivel${i + 1}" type="text" placeholder="% de acerto mínima">
                    <input id="urlNivel${i + 1}" type="text" placeholder="URL da imagem do nível">
                    <textarea id="descricaoNivel${i + 1}" name="descrição" placeholder="Descrição do nível"></textarea>
                </div>
            </article>
        `;
        if (i === 0) {
            niveisHTML.querySelector("article:last-child img").classList.add("escondido");
            niveisHTML.querySelector("article:last-child div:last-child").classList.remove("escondido");
        }
    }
}

function validarCriacaoPerguntas() {
    for (let i=0;i<qtdPerguntas;i++){
        console.log(i+1)
        let textoPergunta = document.getElementById(`textoPergunta${i+1}`).value;
        let corPergunta = document.getElementById(`corPergunta${i+1}`).value;
        let respostaCorreta = document.getElementById(`respostaCorreta${i+1}`).value;
        let urlRespostaCorreta = document.getElementById(`urlRespostaCorreta${i+1}`).value;
        let respostaIncorreta1 = document.getElementById(`respostaIncorreta1${i+1}`).value;
        let urlRespostaIncorreta1 = document.getElementById(`urlRespostaIncorreta1${i+1}`).value;
        let respostaIncorreta2;
        let urlRespostaIncorreta2;
        let respostaIncorreta3;
        let urlRespostaIncorreta3;

        try {
        respostaIncorreta2 = document.getElementById(`respostaIncorreta2${i+1}`).value;
        urlRespostaIncorreta2 = document.getElementById(`urlRespostaIncorreta2${i+1}`).value;
        respostaIncorreta3 = document.getElementById(`respostaIncorreta3${i+1}`).value;
        urlRespostaIncorreta3 = document.getElementById(`urlRespostaIncorreta3${i+1}`).value;
        } catch {
            respostaIncorreta2 = '';
            urlRespostaIncorreta2 = '';
            respostaIncorreta3 = '';
            urlRespostaIncorreta3 = '';
        }

        if (textoPergunta.length < 20 || corPergunta.length != 7 || corPergunta.indexOf("#")<0 || respostaCorreta.length==0 || (urlRespostaCorreta.indexOf("https://") < 0 && urlRespostaCorreta.indexOf("http://") < 0) || respostaIncorreta1.length==0 || (urlRespostaIncorreta1.indexOf("https://") < 0 && urlRespostaIncorreta1.indexOf("http://") < 0)) {
            return false;
        } else if (respostaIncorreta2.length>0 && (urlRespostaIncorreta2.indexOf("https://") < 0 && urlRespostaIncorreta2.indexOf("http://") < 0)) {
            return false;
        } else if (respostaIncorreta3.length>0 && (urlRespostaIncorreta3.indexOf("https://") < 0 && urlRespostaIncorreta3.indexOf("http://") < 0)) {
            return false;
        } else {
            minhaPergunta.title = textoPergunta;
            minhaPergunta.color = corPergunta;
            minhaPergunta.answers[0].text = respostaCorreta;
            minhaPergunta.answers[0].image = urlRespostaCorreta;
            minhaPergunta.answers[0].isCorrectAnswer = true;
            minhaPergunta.answers[1].text = respostaIncorreta1;
            minhaPergunta.answers[1].image = urlRespostaIncorreta1;
            minhaPergunta.answers[1].isCorrectAnswer = false;
            let j=2;
            if (respostaIncorreta2!='') {
                minhaPergunta.answers[j].text = respostaIncorreta2;
                minhaPergunta.answers[j].image = urlRespostaIncorreta2;
                minhaPergunta.answers[j].isCorrectAnswer = false;
                j++;
            }
            if (respostaIncorreta3!='') {
                minhaPergunta.answers[j].text = respostaIncorreta3;
                minhaPergunta.answers[j].image = urlRespostaIncorreta3;
                minhaPergunta.answers[j].isCorrectAnswer = false;
            }
            meuQuizz.questions.push(minhaPergunta);
            return true;
        }
    }
}

let meuQuizzSerializado;
function finalizarCriacaoQuizz() {
    if (validarCriacaoNiveis()) {
        document.querySelector(".criacao-niveis").classList.add("escondido");
        document.querySelector(".finalizar-criacao-quiz").classList.remove("escondido");
        qtdPerguntas = '';
        qtdNiveis = '';
        document.querySelector(".finalizar-criacao-quiz .imagem-meu-quizz").innerHTML = `<img src="${meuQuizz.image}" alt="Imagem do meu quizz">`;
        
        meusQuizzes.push(meuQuizz);
        meuQuizzSerializado = JSON.stringify(meuQuizz);
        const meuQuizzPromise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",meuQuizz);
        meuQuizzPromise.then((response) => {
            salvarNoLocalStorage();
        });
        meuQuizzPromise.catch((error) => {
            alert("Ocorreu um problema e seu Quizz não foi salvo!");
            renderizarTodosOsQuizzes();
        })
    } else {
        alert("Preencha os campos corretamente para continuar criando o seu Quizz.\n\nTítulo do nível: mínimo de 10 caracteres\n% de acerto mínima: um número entre 0 e 100\nURL da imagem do nível: deve ter formato de URL\nDescrição do nível: mínimo de 30 caracteres\nÉ obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%");
    }
}

function validarCriacaoNiveis() {
    let validado=false;
    let minAcertoNivel0=0;
    for (let i=0;i<qtdNiveis;i++){
        let tituloNivel = document.getElementById(`tituloNivel${i+1}`).value;
        let minAcertoNivel = document.getElementById(`minAcertoNivel${i+1}`).value;
        let urlNivel = document.getElementById(`urlNivel${i+1}`).value;
        let descricaoNivel = document.getElementById(`descricaoNivel${i+1}`).value;
        
        if (tituloNivel.length < 10 || parseInt(minAcertoNivel)<0 || parseInt(minAcertoNivel)>100 || (urlNivel.indexOf("https://") < 0 && urlNivel.indexOf("http://") < 0) || descricaoNivel.length < 30) {
            validado = false;
        } else {
            meuNivel.title = tituloNivel;
            meuNivel.minValue = parseInt(minAcertoNivel);
            meuNivel.image = urlNivel;
            meuNivel.text = descricaoNivel;
            meuQuizz.levels.push(meuNivel);
            validado = true;
        }
        if (parseInt(minAcertoNivel)===0) {minAcertoNivel0+=1};
        console.log(minAcertoNivel)
        console.log(minAcertoNivel0)
    }
    if (minAcertoNivel0>0 && validado) {
        validado = true;
    } else {
        meuQuizz.levels = [];
        validado = false;
    };
    return validado;
}

function salvarNoLocalStorage() {
    localStorage.setItem((meusQuizzes.length - 1).toString(),meuQuizzSerializado);
}

function editarPergunta(novaPerguntaSelecionada) {
    document.querySelectorAll(".criacao-perguntas article>div:last-child").forEach((elemento) => {
        if (!elemento.classList.contains("escondido")) {
            elemento.classList.add("escondido");
            elemento.parentNode.querySelector("img").classList.remove("escondido");
        }
    })
    novaPerguntaSelecionada.classList.add("escondido");
    novaPerguntaSelecionada.parentNode.parentNode.querySelector("div:last-child").classList.remove("escondido");
}

function editarNivel(novoNivelSelecionado) {
    document.querySelectorAll(".criacao-niveis article>div:last-child").forEach((elemento) => {
        if (!elemento.classList.contains("escondido")) {
            elemento.classList.add("escondido");
            elemento.parentNode.querySelector("img").classList.remove("escondido");
        }
    })
    novoNivelSelecionado.classList.add("escondido");
    novoNivelSelecionado.parentNode.parentNode.querySelector("div:last-child").classList.remove("escondido");
}

function voltarParaAHome() {
    document.querySelector(".responder-quizz").classList.add("escondido");
    document.querySelector(".criacao-de-quiz").classList.add("escondido");
    document.querySelector("main").classList.remove("escondido");
    document.querySelector(".finalizar-criacao-quiz").classList.add("escondido");
    document.querySelector(".info-basica").classList.remove("escondido");
    acertos=0;
    tentativas=0;
}