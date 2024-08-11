const noteContainer = document.querySelector(".notes-container");
const createButton = document.querySelector(".create");
let note = document.querySelectorAll(".delete-area", ".input-box");

function showNotes(){
    noteContainer.innerHTML = localStorage.getItem("note");
}
showNotes();

function updateStorage(){
    localStorage.setItem("note", noteContainer.innerHTML);
}

createButton.addEventListener("click", () =>{
    let deleteArea = document.createElement("div");
    let title = document.createElement("p");
    let img = document.createElement("img");
    let textArea = document.createElement("div");
    let inputBox = document.createElement("p");

    deleteArea.className = "delete-area";
    title.className = "title";
    title.setAttribute("contenteditable", "true");
    deleteArea.appendChild(title);
    img.src = "image/cross.svg";
    deleteArea.appendChild(img);

    textArea.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    textArea.appendChild(inputBox);

    noteContainer.appendChild(deleteArea);
    noteContainer.appendChild(textArea);

    updateStorage();
})

window.confirm = function(message, callback) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const confirm = document.createElement("div");
    const buttonCont = document.createElement("div");

    const yesButton = document.createElement("button");
    yesButton.className = "yesButton";
    yesButton.innerText = "Yes";

    const noButton = document.createElement("button");
    noButton.className = "noButton";
    noButton.innerText = "No";

    confirm.classList.add("confirm");
    confirm.innerText = message;
    buttonCont.appendChild(yesButton);
    buttonCont.appendChild(noButton);
    confirm.appendChild(buttonCont);

    yesButton.addEventListener("click", () => {
        callback(true);
        overlay.remove();
        confirm.remove();
    })

    noButton.addEventListener("click", () => {
        callback(false);
        overlay.remove();
        confirm.remove();
    })

    overlay.addEventListener("click", () => {
        callback(false);
        overlay.remove();
        confirm.remove();
    })

    document.body.appendChild(overlay);
    document.body.appendChild(confirm);
}

noteContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        confirm("Are you sure you want to delete this note?", (confirm) => {
            if(confirm){
                let deleteArea = e.target.closest(".delete-area");
                let textArea = deleteArea.nextElementSibling;
                deleteArea.remove();
                textArea.remove();
                updateStorage();
            }
        })
    }
})

noteContainer.addEventListener("input", function () {
    updateStorage();
});

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})