// HTML elements
draggable = document.querySelectorAll('.draggable')
droppable = document.querySelectorAll('.droppable')
emptyNode = document.querySelector('.main-kanban-column-list-item.draggable')
closeBtn = document.querySelector('.popup-content-close')
popup = document.querySelector('.popup')
form = document.querySelector('.popup-content-form')
inputTask = document.querySelectorAll('.popup-content-form-input')[0]
inputTag = document.querySelectorAll('.popup-content-form-input')[1]


// Variables
let dragged = null
let newCardTarget = null

// Event Listeners

draggable.forEach(element => {
    element.addEventListener('dragstart', dragStart)
});

droppable.forEach(element => {
    element.addEventListener('dragenter', dragEnter)
    element.addEventListener('dragleave', dragLeave)
    element.addEventListener('dragover', dragOver)
    element.addEventListener('drop', drop)
    element.addEventListener('click', newCard)
})

form.addEventListener('submit', createNewCard)

closeBtn.addEventListener('click', closePopup)

// Functions

function dragStart(event) {

    // store the dragged element
    dragged = event.target

    console.log(dragged)
}

function dragEnter(event) {
    event.target.classList.add('droppable-hover')
}

function dragOver(event) {

    // Allow drop event
    event.preventDefault()
}

function dragLeave(event) {
    event.target.classList.remove('droppable-hover')
}

function drop(event) {
    // event.preventDefault()

    event.target.classList.remove('droppable-hover')

    const parentNode = event.target.parentNode

    
    parentNode.insertBefore(dragged, event.target)
}

function newCard(event) {
    newCardTarget = event.target
    openPopup()
}

function openPopup() {
    popup.classList.add('opened')
}

function closePopup() {
    popup.classList.remove('opened')
}

function createNewCard(event) {
    
    // Prevent page reload
    event.preventDefault()
    
    // Get user values
    let inputTaskValue = inputTask.value
    let inputTagValue = inputTag.value

    // Delete previous user values
    inputTask.value = ''
    inputTag.value = ''

    closePopup()

    // Create new empty card
    let newEmptyCard = emptyNode.cloneNode(true)
    let deleteBtn = newEmptyCard.querySelector('.main-kanban-column-list-item-header-delete')

    // Set values to the card
    newEmptyCard.querySelector('.main-kanban-column-list-item-header-text').textContent = inputTaskValue
    newEmptyCard.querySelector('.main-kanban-column-list-item-footer-tag').textContent = inputTagValue

    // Insert new card befor droppable field
    newCardTarget.parentNode.insertBefore(newEmptyCard, newCardTarget)

    // Add event listeners to the new card
    newEmptyCard.addEventListener('dragstart', dragStart)
    deleteBtn.addEventListener('click', () => {

        // Delete card if user clicked on trash bin
        newEmptyCard.parentNode.removeChild(newEmptyCard)
    })
}
