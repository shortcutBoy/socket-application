import $ from  'jquery'
import React from 'react';
import { socket } from '../../index';
import './index.css';

const FADE_TIME = 150;
const TYPING_TIMER_LENGTH = 400;
const COLORS = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];
export class Chatroom extends React.Component {
  // Dom
  messagesEl;
  chatPageEl;
  loginPageEl;
  usernameEl;
  inputMessageEl;

  // Params
  socket;
  username;
  connected = false;
  typing = false;
  lastTypingTime;
  currentInput;

  componentDidMount() {

    this.currentInput = $('.usernameInput');
    this.usernameInputEl = $('.usernameInput');
    this.messagesEl = $('.messages');
    this.inputMessageEl = $('.inputMessage');

    this.loginPageEl = $('.login.page');
    this.chatPageEl = $('.chat.page');

    $(window).keydown((event) => {
      if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        this.currentInput.focus();
      }
      if (event.which === 13) {
        if (this.username) {
          this.sendMessage();
          socket.emit('stop typing');
          this.typing = false;
        } else {
          this.setUsername();
        }
      }
    });

    this.loginPageEl.click(() => {
      this.currentInput.focus();
    });
  
    this.inputMessageEl.click(() => {
      this.inputMessageEl.focus();
    });

    socket.on('login', (data) => {
      this.connected = true;
      var message = '';
      this.log(message, {
        prepend: true
      });
      this.addParticipantsMessage(data);
    });
  
    socket.on('new message', (data) => {
      this.addChatMessage(data);
    });
  
    socket.on('user joined', (data) => {
      this.log(data.username + '加入聊天室');
      this.addParticipantsMessage(data);
    });
  
    socket.on('user left', (data) => {
      this.log(data.username + '离开聊天室');
      this.addParticipantsMessage(data);
      this.removeChatTyping(data);
    });
  
    socket.on('typing', (data) => {
      this.addChatTyping(data);
    });
  
    socket.on('stop typing', (data) => {
      this.removeChatTyping(data);
    });
  
    socket.on('disconnect', () => {
      this.log('you have been disconnected');
    });
  
    socket.on('reconnect', () => {
      this.log('you have been reconnected');
      if (this.username) {
        socket.emit('add user', this.username);
      }
    });
  
    socket.on('reconnect_error', () => {
      this.log('attempt to reconnect has failed');
    });
  }

  addParticipantsMessage = (data) => {
    var message = '';
    if (data.numUsers === 1) {
      message += "现有1人加入聊天室";
    } else {
      message += "现有" + data.numUsers + "人加入聊天室";
    }
    this.log(message);
  }

  setUsername = () => {
    this.username = this.cleanInput(this.usernameInputEl.val().trim());

    if (this.username) {
      this.loginPageEl.fadeOut();
      this.chatPageEl.show();
      this.loginPageEl.off('click');
      this.currentInput = this.inputMessageEl.focus();

      socket.emit('add user', this.username);
    }
  }

  sendMessage = () => {
    var message = this.inputMessageEl.val();  
    message = this.cleanInput(message);  
    if (message && this.connected) {
      this.inputMessageEl.val('');
      this.addChatMessage({
        username: this.username,
        message: message
      });
      socket.emit('new message', message);
    }
  }

  log = (message, options) => {
    var $el = $('<li>').addClass('log').text(message);
    this.addMessageElement($el, options);
  }

  addChatMessage = (data, options) => {
    var $typingMessages = this.getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', this.getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    this.addMessageElement($messageDiv, options);
  }

  addChatTyping = (data) => {
    data.typing = true;
    data.message = '输入中...';
    this.addChatMessage(data);
  }

  removeChatTyping = (data) => {
    this.getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  addMessageElement = (el, options) => {
    var $el = $(el);

    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      this.messagesEl.prepend($el);
    } else {
      this.messagesEl.append($el);
    }
    this.messagesEl[0].scrollTop = this.messagesEl[0].scrollHeight;
  }

  cleanInput = (input) => {
    return $('<div/>').text(input).html();
  }

  updateTyping = () => {
    if (this.connected) {
      if (!this.typing) {
        this.typing = true;
        socket.emit('typing');
      }
      this.lastTypingTime = (new Date()).getTime();

      setTimeout(() => {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - this.lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && this.typing) {
          socket.emit('stop typing');
          this.typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  getTypingMessages = (data) => {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  getUsernameColor = (username) => {
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }
  render() {
    return (
      <div className="chatroom">
        <ul className="pages">
          <li className="chat page">
            <div className="chatArea">
              <ul className="messages"></ul>
            </div>
            <input className="inputMessage" placeholder="请输入内容..."/>
          </li>
          <li className="login page">
            <div className="form">
              <h3 className="title">输入名字:</h3>
              <input className="usernameInput" type="text" maxLength="14" />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
