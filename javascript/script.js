
const quizPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
quizPromise.then(show);

function show(response){
    console.log(response.data);
};