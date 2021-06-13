const toDoForm = document.querySelector(".js-toDoForm"),
    toDoinput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

// function filterFn(toDo){
//     return toDo.id !== 1;
// }

function deleteToDo(event){
    // console.log(event);
    // console.log(event.target); //버튼 자체 태그가 나온다. 아이디는 부모테그에있다...
    // console.dir(event.target);
    // console.log(event.target.parentElement);
    // console.log(event.target.parentNode);
    // //구글 delete child element mdn 검색
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function filterFn(toDo){
        //console.log( toDo.id , li.id)
        return toDo.id !== parseInt(li.id);
    });
    //console.log(cleanToDos)
    toDos = cleanToDos ;
    saveToDos();
}

function saveToDos(){
    //localStorage.setItem(TODOS_LS, toDos); 
    // 로컬스토리지는  이름 : 데이터 로 저장되는데 데이터는 string 데이터만 올수 있다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 제이슨 스트링으로 변환해서 저장
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");    
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerHTML = "Χ"; 
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);    
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        //id: toDos.length + 1,
        id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
    //toDoList.innerHTML = `<li>${text}</li>`
}

function hendleSubmit(event){    
    event.preventDefault();    
    const currentValue = toDoinput.value;
    paintToDo(currentValue);    
    toDoinput.value = "";
}

function loadTodos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if (loadedtoDos !== null){        
        //console.log(loadedtoDos)
        const parsedTodos = JSON.parse(loadedtoDos);
        //console.log(parsedTodos);
        parsedTodos.forEach(function(toDo){
            //console.log(toDo.text);
            paintToDo(toDo.text);
        });
    } 
}

function init(){
    loadTodos();
    toDoForm.addEventListener("submit", hendleSubmit)
}

init();