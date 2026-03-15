const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const addBtn = document.getElementById("addBtn");
const emptyMsg = document.getElementById("emptyMsg");
const errorMsg = document.getElementById("errorMsg");
const deleteBtn = document.getElementById("deleteBtn");
const quest = document.getElementById("quest");
const ans = document.getElementById("ans");

addBtn.addEventListener("click", function () {

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if(question.length < 5) {
        errorMsg.textContent = "Question must be at least 5 characters";
        return;
    }

    if(answer.length < 15) {
        errorMsg.textContent = "Answer must be at least 15 characters";
        return;
    }

    if(question.length > 5){
        const h3 = document.createElement("h3");
        h3.textContent = questionInput.value;
        quest.appendChild(h3); 
    }
    
    if(answer.length > 15){
        const p = document.createElement("p");
        p.textContent = answerInput.value;
        ans.appendChild(p);
    }
    errorMsg.textContent =""

});
deleteBtn.addEventListener("click",function(){
    quest.removeChild(quest.lastElementChild);
    ans.removeChild(ans.lastElementChild);
});