let myLibrary = [// all book data is stored in this list
    {
        "title": "Harry Potter and The Sorcerer's Stone",
        "author": "J. K. Rowling",
        "totalPages": "336",
        "isread": "105"
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J. D. Salinger",
        "totalPages": "234",
        "isread": "80"
    }
];




const directoryHTML = document.getElementById("directory");
// ^this node is a <ul> element which contains all of the books

function Book(title, author, isread, totalPages) {
    // constructer this function can be used to create
    // an object before appending it to myLibrary
    this.title = title,
        this.author = author,
        this.totalPages = totalPages,
        this.isread = isread
}

function addBookToLibrary() {
    // This function creates a new ".book" element
    // and adds it to the directory
    event.preventDefault();

    let title = document.getElementById("enter-title").value;
    let author = document.getElementById("enter-author").value;
    let pagesRead = document.getElementById("enter-pages-read").value;
    let totalPages = document.getElementById("enter-total-pages").value;

    book = new Book(title, author, pagesRead, totalPages)



    let item = directoryHTML.appendChild(document.createElement("li"));
    item.className = "book";

    let titleElement = document.createElement("h4");
    titleElement.innerHTML = title;

    let authorElement = document.createElement("p");
    authorElement.innerHTML = author;

    let progressElement = document.createElement("div");
    progressElement.style = "width: " + (pagesRead / totalPages) * 100 + "%";
    progressElement.className = "progress-bar";

    item.appendChild(titleElement);
    item.appendChild(authorElement);
    item.appendChild(progressElement);
    item.dataset.index = myLibrary.length;
    item.setAttribute("onclick", "openPageForm(" + myLibrary.length + ")")

    myLibrary.push(book);
    closeAddForm();
}



function findBookNode(index) {
    let bookNodes = document.querySelectorAll(".book");
    let bookHTML = directoryHTML.querySelectorAll(".book")[index];
    console.log(bookNodes);

    for (let i = 0; i < bookNodes.length; i++) {
        if (bookNodes[i].dataset.index == index) {
            bookHTML = bookNodes[i];
        }
    }
    return bookHTML;
}



let submitButton = document.querySelector("#pageForm").querySelector("input[type=submit]");


function finishedBook(index) {
    alert("Congratulations! You finished " + myLibrary[index].title + "!")
    const bookHTML = findBookNode(index);
    bookHTML.remove();
    document.querySelector("#finished").appendChild(bookHTML);

}

function openPageForm(index) {
    event.preventDefault();
    
    const pageFormNode = document.querySelector("#pageForm");
    pageFormNode.querySelector(".delete").setAttribute("onclick","Delete(" + index + ")");

    pageFormNode.style = "display:flex";
    document.querySelector("#updated-page").value = myLibrary[index].isread;
    submitButton.setAttribute("onclick", "updatePages(" + index + ")")
}

function closePageForm() {
    event.preventDefault();

    document.querySelector("#pageForm").style = "display:none";
}

function updatePages(index) {
    event.preventDefault();
    closePageForm();

    const bookHTML = findBookNode(index);

    const updateForm = document.querySelector("#updated-page");
    let percentageComplete = (updateForm.value / myLibrary[index].totalPages) * 100;
    

    if (percentageComplete >= 100) {
        bookHTML.querySelector(".progress-bar").style = "width: 100%"
        finishedBook(index);
    }
    else {
        bookHTML.querySelector(".progress-bar").style = "width: " + percentageComplete + "%";
    }



    myLibrary[index].isread = bookHTML.value;
}





function openAddForm() {
    event.preventDefault();
    document.querySelector("#addForm").style = "display:flex";

}

function closeAddForm() {
    event.preventDefault();
    const inputs = document.querySelector("#addForm").querySelectorAll("input");
    for (i in inputs) {
        if (inputs[i].type == "text" || inputs[i].type == "number") {
            inputs[i].value = "";
        }

    }
    document.querySelector("#addForm").style = "display:none";
}

function Delete(index) {
    event.preventDefault();
    console.log(findBookNode(index));
    findBookNode(index).remove();

    closePageForm();
}