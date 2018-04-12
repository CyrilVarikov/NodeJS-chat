const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const greeting = document.querySelector('#greeting');

const userName = document.querySelector('#inputName');
const formUser = document.querySelector('#user');
const button = document.querySelector('#button');

const socket = io('http://localhost:3000');

function setGreeting(value){
    greeting.innerHTML = value;
}

button.click = function(){
    socket.on('greeting', userName.value);
    userName.value = '';
}

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');

    li.innerHTML = value;
    messages.appendChild(li);
}


formUser.addEventListener('submit', event => {
    event.preventDefault();
   
    socket.emit('greeting', userName.value);
});


form.addEventListener('submit', event => {
    event.preventDefault();

    socket.emit('chat', `@${userName.value}: ${input.value}`);
    input.value = '';
});

socket.on('connect', () => setStatus('ONLINE'));

socket.on('disconnect', () => setStatus('DISCONNECTED'));

socket.on('chat', message => printMessage(message));

socket.on('ready', message => setGreeting(message));

