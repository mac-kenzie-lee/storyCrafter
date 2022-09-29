//populate local storage
if (localStorage.length !== 0){
    const listOfULIDs = ['wins']
    for (let ids of listOfULIDs) {
        console.log(Object.keys(localStorage))
        for (let obj of Object.keys(localStorage))
        {
            let key = obj;
            let value = localStorage.getItem(obj)
            let parentUL = ids + "Ul"
            let parent = document.querySelector(`#${parentUL}`)
            createElementAndAddToDOM('li', parent, value)

            

        }

        }
    }


const winsForm = document.querySelector("#winsForm");
const winsInput = document.querySelector("#winsInput")

//clears the input value area on click
winsInput.addEventListener('click', clearFormValue)
//adds items to list on submit.
winsForm.addEventListener('submit', addToTheList)


function addToTheList(e) {
//this function prevents the form from submitting and reloading the page
e.preventDefault();

//finds the ul associated, so long as it's the next sibling and a valid ul
if (e.target.nextElementSibling.tagName === "UL" && (e.target[0].value !== "Add another win" && e.target[0].value !== "What's the wins?")) {
    const ul = e.target.nextElementSibling;    
    let valueToAdd = e.target[0].value;
    let parentSectionId = e.target.parentElement.id;
     addValueToLocalStorage(valueToAdd, parentSectionId)
    createElementAndAddToDOM('li', ul, valueToAdd)
} 
    e.target[0].value = "Add another win"


//document.getElementById("item1").nextSibling.innerHTML;
}

//clears text in a form
function clearFormValue(e) {
    e.target.value = ""
}


//creates an element, adds text and appends to dom
function createElementAndAddToDOM(elementType, parentContainer, text) {
    let newElement = document.createElement(elementType);
    newElement.textContent = text;
    parentContainer.appendChild(newElement);
}

function addValueToLocalStorage(value, parentSectionId) {
    let idMarker = 0;
    let IdDoesNotExist = checkIfIdExists(idMarker, parentSectionId, value)
    console.log(IdDoesNotExist)
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
        localStorage.setItem(parentSectionId+String(idMarker), value)
        console.log('item added')

        return true;

        } else {return false;
        }
    }

    //else {
      //      idMarker++
       //     console.log(idMarker)
        //}
           
            //console.log('pupcpy')
        
 //   localStorage.setItem(value)
}
