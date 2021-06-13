const addTaskForm = document.querySelector(".js-addTaskForm");
const addTaskinput = addTaskForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = 'pendings';
const FINISHED_LS = 'finisheds';

let pending_ls =[];
let finishied_ls =[];


function hendleAddTaskFormSubmit(event){
    event.preventDefault();    
    const addtaskValue = addTaskinput.value;    
   
    paintPending(addtaskValue);

    addTaskinput.value = "";      
}

function paintPending(addtaskValue){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");    
    const newId = pending_ls.length + 1;

    span.innerHTML = addtaskValue;
    delBtn.innerHTML = "삭제";
    delBtn.addEventListener("click", deletePending)
    doneBtn.innerHTML = "완료";
    doneBtn.addEventListener("click", sendPendingToFinished)

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    li.id = newId;
    pendingList.appendChild(li);

    const pending_Obj =  {
        pendingText: addtaskValue,
        id: newId,
    };

    pending_ls.push(pending_Obj);

    savePending()
}

function savePending(){
    localStorage.setItem(PENDING_LS, JSON.stringify(pending_ls));
}

function loadPending(){
    const loadedPending = localStorage.getItem(PENDING_LS);
    if (loadedPending !== null){
        const parsedPending = JSON.parse(loadedPending);   
        parsedPending.forEach( value => {
            paintPending(value.pendingText);
        });
    }
}

function deletePending(event){
    const t_btn = event.target;
    const t_li = t_btn.parentNode;
    pendingList.removeChild(t_li);

    const cleanPending_ls = pending_ls.filter( value => {
        return value.id !== parseInt(t_li.id);
    });
    pending_ls = cleanPending_ls;
    savePending();
}

function sendPendingToFinished(event){
    const t_btn = event.target;
    const t_li = t_btn.parentNode;
    const targetPending = pending_ls.filter( value => {
        return value.id === parseInt(t_li.id);       
    });
    console.log(targetPending[0].pendingText);
    paintFinished(targetPending[0].pendingText);

    deletePending(event);
}

function saveFinished(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishied_ls));
}

function paintFinished(finishied_text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");    
    const newId = finishied_ls.length + 1;

    span.innerHTML = finishied_text;
    delBtn.innerHTML = "삭제";
    delBtn.addEventListener("click", deleteFinished)
    doneBtn.innerHTML = "되돌리기";
    doneBtn.addEventListener("click", sendFinishedToPending)

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    li.id = newId;
    finishedList.appendChild(li);

    const finished_Obj =  {
        finishedText: finishied_text,
        id: newId,
    };

    finishied_ls.push(finished_Obj);

    saveFinished();
}

function loadFinished(){
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if (loadedFinished !== null){
        const parsedFinished = JSON.parse(loadedFinished);   
        parsedFinished.forEach( value => {
            paintFinished(value.finishedText);
        });
    }
}

function deleteFinished(event){
    const t_btn = event.target;
    const t_li = t_btn.parentNode;
    finishedList.removeChild(t_li);

    const cleanFinished_ls = finishied_ls.filter( value => {
        return value.id !== parseInt(t_li.id);
    });
    finishied_ls = cleanFinished_ls;
    saveFinished();
}

function sendFinishedToPending(event){
    const t_btn = event.target;
    const t_li = t_btn.parentNode;
    const targetFinished = finishied_ls.filter( value => {
        return value.id === parseInt(t_li.id);       
    });
    console.log(targetFinished[0].finishedText);
    paintPending(targetFinished[0].finishedText);    

    deleteFinished(event);
}


function init(){    
    loadPending();
    loadFinished();
    addTaskForm.addEventListener("submit", hendleAddTaskFormSubmit);
}

init();