//populate local storage, update if you add more forms!!
if (localStorage.length !== 0){
    const listOfULIDs = ['wins', 'tech'] //update if you add more
    for (let ids of listOfULIDs) {
        for (let obj of Object.keys(localStorage)){
            let key = obj;
            let value = localStorage.getItem(obj)
            let parentUL = ids + "Ul"
            let parent = document.querySelector(`#${parentUL}`)
            let c = parent.id[0] + parent.id[1] + parent.id[2] + parent.id[3]
      
            let k = key.slice(0, 4)

            if (k === c) {
                createElementAndAddToDOM('li', parent, value)
            }
        }
        }
    }


const winsForm = document.querySelector("#winsForm");
const winsInput = document.querySelector("#winsInput")

const techForm = document.querySelector("#techForm");
const techInput = document.querySelector("#techInput")

//clears the input value area on click
winsInput.addEventListener('click', clearFormValue)
techInput.addEventListener('click', clearFormValue)
//adds items to list on submit.
winsForm.addEventListener('submit', addToTheList)
techForm.addEventListener('submit', addToTheList)


function addToTheList(e) {
//this function prevents the form from submitting and reloading the page
e.preventDefault();

//finds the ul associated, so long as it's the next sibling and a valid ul
let itemInLocalStorage = notAlreadyInLocalStorage(e.target[0].value);
let invalidEntries = [
    e.target[0].value !== "Add another win",
    e.target[0].value !== "What's the wins?",
    e.target[0].value !== "What was the tech?",
    e.target[0].value !== "Add more tech",
    e.target[0].value !== "",
    itemInLocalStorage
]
let check = true;
for (let x of invalidEntries) {
    if (x === false)
    {
        check = false;
    }
}
if(check === true) {
    const ul = e.target.nextElementSibling;    
    let valueToAdd = e.target[0].value;
    let parentSectionId = e.target.parentElement.id;
     addValueToLocalStorage(valueToAdd, parentSectionId)
    createElementAndAddToDOM('li', ul, valueToAdd)

    switch (parentSectionId) {
        case "wins":
            e.target[0].value = "Add another win"
            break;
        case "tech":
            e.target[0].value = "Add more tech"
            break;
        default:
            break;
    }
}

}

//clears text in a form
function clearFormValue(e) {
    e.target.value = ""
}


//creates an element, adds text and appends to dom
function createElementAndAddToDOM(elementType, parentContainer, text) {
    let newElement = document.createElement(elementType);
    newElement.classList.add('liItems')
    newElement.textContent = text;
    parentContainer.appendChild(newElement);
    addADeleteButton(newElement)
}

function addADeleteButton(parent) {
    let deleteButton = document.createElement('button');
    deleteButton.textContent= 'x'
    deleteButton.classList.add('deleteButton')
    parent.appendChild(deleteButton)
    deleteButton.addEventListener('click', removeFromLocalStorage);
}


function removeFromLocalStorage(e){
    let textCont = e.target.parentElement.childNodes[0].textContent;
    //gets the text from the li item
for (const [key, value] of Object.entries(localStorage)) {
    //finds the matching item in local storage
 
    if (value === textCont) {
        let k = key;
 localStorage.removeItem(key)
        
removeItemFromDom(e.target.parentElement)
     }

    }
}
//localStorage.getItem()

function removeItemFromDom(item) {
    item.remove();
}

function addValueToLocalStorage(value, parentSectionId) {
    let idMarker = 0;

    let IdDoesNotExist = checkIfIdExists(idMarker, parentSectionId, value)
    while (IdDoesNotExist === false) {
        idMarker++
        IdDoesNotExist = checkIfIdExists(idMarker, parentSectionId, value)
        if (IdDoesNotExist === true) {
            break;
        }
    }


    function checkIfIdExists(idMarker, parentSectionId, value) {
        if (!localStorage.getItem(parentSectionId+String(idMarker))) {
        //check if id noes not exists
        //set the item
        //adds to local storage
        localStorage.setItem(parentSectionId+String(idMarker), value)
        

        return true;

        } else {return false;
        }
    }

}

//checks local storage to see if the thing was added already or not
function notAlreadyInLocalStorage(text) {
 for (let t of Object.values(localStorage)) {
    if (text === t) {
        return false;
    }
 }   return true;
}