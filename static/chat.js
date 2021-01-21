
addEventListener('click', document.querySelector('.name'), function() {
  console.log(this.innerHTML);
});

const user_username = JSON.parse(document.getElementById('user_username').textContent);

document.querySelector('#input').addEventListener('keypress', function (e) {
  if (e.key !== 'Enter'){return false}
  const messageInputDom = document.querySelector('#input');
  const message = messageInputDom.value;
  if (message == '') {return false};
    chatSocket.send(JSON.stringify({
      'message': message,
      'username': user_username,
    }));

    var timemsg = new Date().toString();
    if (timemsg.slice(16, 18) >= 13){
      var timehrs = timemsg.slice(16, 18) - 12
      timemsg = timehrs + ':' + timemsg.slice(19, 21) + ' PM';
    } else {
      var timehrs = timemsg.slice(16, 18)
      timemsg += ' AM';
    }

    document.querySelector('.message-box').innerHTML += (`
      <div class='message ` + 'self-user' + `'>
        <h5 class='name'>
          ` + user_username + ` | ` + timemsg + ` 
        </h5>
        <h2 class='msg-text'> 
          ` + message + `
        </h2>
      </div>
    `);
    messageInputDom.value = '';
}, false);

document.querySelector('#submit').onclick = function (e) {
  const messageInputDom = document.querySelector('#input');
  const message = messageInputDom.value;
  if (message == '') {return false};
    chatSocket.send(JSON.stringify({
      'message': message,
      'username': user_username,
    }));
    document.querySelector('.message-box').innerHTML += (`
      <div class='message ` + 'self-user' + `'>
        <h5 class='name'>
          ` + user_username + ` | ` + (new Date().toString().slice(16, 21)).toString() + ` 
        </h5>
        <h2 class='msg-text'> 
          ` + message + `
        </h2>
      </div>
    `);
    messageInputDom.value = '';
};



// Display the result in the element with id="demo"

// var demo = days + "days and " + hours + "hours" + minutes + "m " + seconds + "s ";
// console.log(demo);

const roomName = JSON.parse(document.getElementById('room-name').textContent);

const chatSocket = new WebSocket(
  'ws://' +
  window.location.host +
  '/ws/chat/' +
  roomName +
  '/'
);
document.querySelector('#chat-text').value = ""
chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  console.log(data);
  document.querySelector('#chat-text').value += (data.username + ': ' + data.message + '\n');
  if (data.username == user_username) {
    const declare = 'self-user'
  } else {
    const declare = 'other-user'
  }
  document.querySelector('.message-box').innerHTML += ('<div class="message ' + declare + '"><h2 class="name">' + data.username + ' | ' + (new Date().toString().slice(16, 24).toString() + '</h2><h5 class="msg-text">' + data.message + '</h5></div>'))
}
document.querySelector('#tester').onclick = function tstmsg() {
  const messageInputDom = document.querySelector('#input');
  const message = messageInputDom.value;
  if (message == '') {return}
  console.log('hi');
  document.querySelector('.message-box').innerHTML += (`
        <div class='message  ` + 'self-user' + `'>
          <h5 class='name'>
            HAMOUDE | ` + (new Date().toString().slice(16, 21)).toString() + ` 
          </h5>
          <h2 class='msg-text'> 
            ` + message + `
          </h2>
        </div>
      `);
  messageInputDom.value = '';
  // document.querySelector('.message-box').innerHTML += (`'</h2><h5 class="msg-text">' + data.message + '</h5></div>`);
}
