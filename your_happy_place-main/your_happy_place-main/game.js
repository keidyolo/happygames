const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backElement = document.getElementById('back')

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}


function showTextNode(textNodeindex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeindex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}



const textNodes = [
    {
        id: 1, 
        text: 'Choose a direction.',
        options: [
            {
                text: 'Left.',
                setState: {light: true, match: true, latern: true}, // dont worry about this part, we can change this as we go along
                nextText: 2
            }, 
            
            {
                text: 'Right.',
                setState: {light: true, match: true, latern: true},
                nextText: 3
            }, 

        ]
    },

] 



startGame()