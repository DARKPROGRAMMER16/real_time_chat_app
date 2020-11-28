const socket = io()

let name;
let textarea = document.querySelector('#textarea');
let container = document.querySelector('.container');
do {
    name = prompt("Enter your name ?");
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // appending msg
    appendMessage(msg,'outgoing')
    textarea.value = ""
    scrollToBottom()

    // send message to server
    socket.emit('message', msg)
}

function appendMessage(msg,type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add('message',className)

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    container.appendChild(mainDiv)
}


// recieving message
socket.on('message', (msg) => {
    appendMessage(msg,'incoming')
    scrollToBottom()
})


function scrollToBottom() {
    container.scrollTop = container.scrollHeight
}