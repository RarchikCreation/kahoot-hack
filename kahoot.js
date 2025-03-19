var questions = [], info = { numQuestions: 0, questionNum: -1, lastAnsweredQuestion: -1 }, showAnswers = true;

const uiElement = document.createElement('div');
uiElement.innerHTML = `
    <div class="handle">Drag me</div>
    <div style="display: flex; justify-content: center;">
        <input type="text" id="quizInput" placeholder="Quiz Id" style="width: 90%; height: 40px; text-align: center;"/>
    </div>
    <button id="closeButton" style="background: #ff4444; color: white; padding: 10px; cursor: pointer;">Close</button>
`;
Object.assign(uiElement.style, { position: "absolute", top: "5%", left: "5%", width: "33vw", background: "#381272", borderRadius: "1vw", zIndex: 9999 });
document.body.appendChild(uiElement);

const handle = uiElement.querySelector(".handle");
const inputBox = uiElement.querySelector("#quizInput");
const closeButton = uiElement.querySelector("#closeButton");

Object.assign(handle.style, { cursor: "grab", padding: "10px", background: "#321066", color: "white" });

closeButton.onclick = () => { uiElement.remove(); showAnswers = false; };
inputBox.oninput = () => {
    const quizID = inputBox.value.trim();
    if (!quizID) {
        inputBox.style.background = "white";
        info.numQuestions = 0;
        return;
    }
    fetch(`https://kahoot.it/rest/kahoots/${quizID}`)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
            inputBox.style.background = "green";
            questions = data.questions.map(q => ({
                type: q.type, time: q.time,
                answers: q.choices.map((c, i) => c.correct ? i : null).filter(i => i !== null),
                incorrectAnswers: q.choices.map((c, i) => !c.correct ? i : null).filter(i => i !== null)
            }));
            info.numQuestions = questions.length;
        })
        .catch(() => { inputBox.style.background = "red"; info.numQuestions = 0; });
};

let isDragging = false, offsetX, offsetY;
handle.onmousedown = e => { isDragging = true; offsetX = e.clientX - uiElement.offsetLeft; offsetY = e.clientY - uiElement.offsetTop; };
document.onmousemove = e => { if (isDragging) Object.assign(uiElement.style, { left: `${e.clientX - offsetX}px`, top: `${e.clientY - offsetY}px` }); };
document.onmouseup = () => { isDragging = false; };

function highlightAnswers(question) {
    question.answers.forEach(i => {
        setTimeout(() => {
            const el = document.querySelector(`[data-functional-selector='answer-${i}']`);
            if (el) el.style.backgroundColor = 'rgb(0, 255, 0)';
        }, 0);
    });
    question.incorrectAnswers.forEach(i => {
        setTimeout(() => {
            const el = document.querySelector(`[data-functional-selector='answer-${i}']`);
            if (el) el.style.backgroundColor = 'rgb(255, 0, 0)';
        }, 0);
    });
}

setInterval(() => {
    const textElement = document.querySelector("[data-functional-selector='question-index-counter']");
    if (textElement) info.questionNum = parseInt(textElement.textContent, 10) - 1;
    if (document.querySelector("[data-functional-selector='answer-0']") && info.lastAnsweredQuestion !== info.questionNum) {
        info.lastAnsweredQuestion = info.questionNum;
        if (showAnswers && questions[info.questionNum]) highlightAnswers(questions[info.questionNum]);
    }
}, 500);

