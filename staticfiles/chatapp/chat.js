
addEventListener('click', document.querySelector('.name'), function() {
  console.log(this.innerHTML);
});

const user_username = JSON.parse(document.getElementById('user_username').textContent);

document.querySelector('#input').addEventListener('keypress', function (e) {
  if (e.ctrlKey && e.key === 'Enter'){
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

    // document.querySelector('.message-box').innerHTML += (`
    //   <div class='message ` + 'self-user' + `'>
    //     <h5 class='name'>
    //       ` + user_username + ` | ` + timemsg + ` 
    //     </h5>
    //     <h2 class='msg-text'> 
    //       ` + message + `
    //     </h2>
    //   </div>
    // `);
    messageInputDom.value = '';
    // console.log(document.querySelectorAll('.message')[-1].innerHTML)
    autoscroll();
  }
}, false);

document.querySelector('#submit').onclick = function (e) {
  const messageInputDom = document.querySelector('#input');
  const message = messageInputDom.value;
  if (message == '') {return false};
    chatSocket.send(JSON.stringify({
      'message': message,
      'username': user_username,
    }));
    // document.querySelector('.message-box').innerHTML += (`
    //   <div class='message ` + 'self-user' + `'>
    //     <h5 class='name'>
    //       ` + user_username + ` | ` + (new Date().toString().slice(16, 21)).toString() + ` 
    //     </h5>
    //     <code class='msg-text'> 
    //       ` + message + `
    //     </code>
    //   </div>
    // `);
    messageInputDom.value = '';
    autoscroll();
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
  var declare = 'other-user';
  if (data.username == user_username) {
    declare = 'self-user'
  }
  document.querySelector('.message-box').innerHTML += (`
  <div class='message ` + declare + `'>
    <h5 class='name'>
      ` + data.username + ` | ` + (new Date().toString().slice(16, 21)).toString() + ` 
    </h5>
    <h2 class='msg-text'> 
      ` + data.message + `
    </h2>
</div>
  `);
}

var $messages = document.querySelector('.message-box');
const autoscroll = () => {
  $messages.scrollTop = $messages.scrollHeight;
}

document.querySelector('#tester').onclick = function (e) {
  const messageInputDom = document.querySelector('#input');
  const message = messageInputDom.value;
  if (message == '') {return false}
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
  // document.querySelector('.message-box').innerHTML += (`'</h2><h5 class="msg-text">' + data.message + '</h5></div>`);
}
