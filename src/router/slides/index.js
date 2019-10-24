import React from 'react';
import { Link } from 'react-router-dom';
import { socket } from '../../index';
import './index.css';
import '../../static/css/svg-icons.css';
import '../../static/css/webslides.css';

export class Slides extends React.Component {
  slides = [
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h1>WebSocket</h1>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h2>什么是WebSocket?</h2>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap">
        <blockquote className="text-quote">
          <p>HTML5开始提供的一种浏览器与服务器进行全双工通讯网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。</p>
        </blockquote>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <div className="content-left">
          <h4>“浏览器与服务器” <br/>“全双工通讯” <br/>“属于应用层协议” <br/>“复用HTTP”</h4>
        </div>
        <div className="content-left">
          <p>* WebSocket可以在浏览器里使用;<br/> * 支持双向通信; <br/> * 使用很简单; <br/> * 基于http, 在http协议的基础上升级协议;</p>
        </div>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h2>WebSocket有哪些优点?</h2>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap">
        <div className="content-center">
          <ul className="flexblock specs padding-min">
            <li style={{padding: '1.2rem'}}><h2>*建立在 TCP 协议之上;</h2></li>
            <li style={{padding: '1.2rem'}}><h2>*支持双向通信，实时性更强;</h2></li>
            <li style={{padding: '1.2rem'}}><h2>*与 HTTP 协议有着良好的兼容性;</h2></li>
            <li style={{padding: '1.2rem'}}><h2>*更好的二进制支持;</h2></li>
            <li style={{padding: '1.2rem'}}><h2>*较少的控制开销;</h2></li>
            <li style={{padding: '1.2rem'}}><h2>*客户端可以与任意服务器通信;</h2></li>
            <li style={{padding: '1.2rem'}}><h2>*支持扩展;</h2></li>
          </ul>
        </div>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap size-50">
        <h2>WebSocket示例:</h2>
        <p style={{margin: 0}}>服务端代码:</p>
        <img style={{width: 500, margin: '1.8rem'}} src={require('./assets/server_code.png')} alt="server code"/>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap size-50">
      <div className="content-center"></div>
        <h2>WebSocket示例:</h2>
        <p style={{margin: 0}}>客户端代码:</p>
        <img style={{width: 500, margin: '1.8rem'}} src={require('./assets/client_code.png')} alt="server code"/>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h1>如何建立连接?</h1>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap">
        <div className="grid vertical-align">
          <div className="column">
            <h4 style={{textAlign: 'left'}}>重点请求首部意义：</h4>
            <ul className="description">
              <li style={{textAlign: 'left'}}>
                <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
                Connection: Upgrade:
                </span>
                表示要升级协议;
              </li>
              <li style={{textAlign: 'left'}}>
                <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
                Sec-WebSocket-Version: 13:
                </span>
                表示 websocket 的版本;
              </li>
              <li style={{textAlign: 'left'}}>
                <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
                Sec-WebSocket-Key:
                </span>
                与后面服务端响应首部Sec-WebSocket-Accept配套;
              </li>
            </ul>
          </div>
          <div className="column">
            <figure>
              <img src={require('./assets/Request-Headers.png')} alt="Request Headers" />
            </figure>
          </div>
        </div>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap size-50">
      <div className="content-center"></div>
        <h2>服务端: 响应协议升级</h2>
        <img style={{width: 500, margin: '1.8rem'}} src={require('./assets/Response-Headers.png')} alt="Response Headers"/>
        <img style={{width: 500, margin: '1.8rem'}} src={require('./assets/General.png')} alt="General"/>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h3>Sec-WebSocket-Accept 的计算</h3>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
      <h4 style={{width: '56rem', margin: '0 auto', textAlign: 'left'}}>计算公式为：</h4>
        <ul style={{width: '56rem', margin: '0 auto', textAlign: 'left'}} className="description">
          <li>
            <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
            1.
            </span>
            将Sec-WebSocket-Key跟258EAFA5-E914-47DA-95CA-C5AB0DC85B11拼接。
          </li>
          <li>
            <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
            2.
            </span>
            通过 SHA1 计算出摘要，并转成 base64 字符串。
          </li>
        </ul>
      </div>
    </section>,
      <section className="bg-apple aligncenter">
      <div className="wrap">
        <h3 style={{textAlign: 'left'}}>简单来说其伪代码是:</h3>
        <p style={{textAlign: 'left'}}><code>Sec-WebSocket-Accept =  toBase64(sha1(Sec-WebSocket-Key + 258EAFA5-E914-47DA-95CA-C5AB0DC85B11))</code></p>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap size-50">
      <div className="content-center"></div>
        <h4>在Node代码中可以简单验证:</h4>
        <img style={{width: 500, margin: '1.8rem'}} src={require('./assets/crypto.png')} alt="Crypto"/>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h3>Sec-WebSocket-Key/Accept 的作用</h3>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
      <h4 style={{width: '56rem', margin: '0 auto', textAlign: 'left'}}>协议想要规避的意外主要是下面几点:</h4>
        <ul style={{width: '56rem', margin: '0 auto', textAlign: 'left'}} className="description">
          <li>
            <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
            1.
            </span>
            避免服务端收到非法的 websocket 连接。
          </li>
          <li>
            <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
            2.
            </span>
            确保服务端理解 websocket 连接。
          </li>
          <li>
            <span style={{width: 'inherit', paddingRight: '1rem'}} className="text-label">
            3.
            </span>
            用浏览器里发起普通 ajax 请求，设置 header 时，Sec-WebSocket-Key 以及其他相关的 header 是被禁止的。
          </li>
        </ul>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h3>WebSocket 的数据传递</h3>
        <p style={{width: 585, margin: '0 auto', textAlign: 'left'}}>WebSocket 客户端、服务端建立连接后，后续的操作都是基于数据帧(所谓的数据帧是指基本的数据单元, 包括三部分：帧头，数据部分，帧尾, 帧头和帧尾包含一些必要的控制信息)的传递。</p>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <p style={{width: 591, margin: '0 auto', textAlign: 'left'}}><span style={{fontSize: 30, fontWeight: 'bold'}}>然后,</span> 还对websocket传输的数据进行数据分片, 即WebSocket 的每条消息可能被切分成多个数据帧。当 WebSocket 的接收方收到一个数据帧时，会根据FIN的值来判断，如当FIN = 1 时， 表示发送方的数据末尾, 即标记是否已经收到消息的最后一个数据帧, 收到后, 一个完整的websocket数据就接受完毕。</p>
      </div>
    </section>,
    <section className="bg-apple">
      <div style={{width: 530}} className="wrap size-50">
        <h4 style={{textAlign: 'left'}}>如下例子: </h4>
        <img style={{width: '100%', margin: '10px 0 0'}} src={require('./assets/graphic.png')} alt="graphic"/>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h4>详细参考:<a style={{paddingLeft: 10}} href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers" title="MDN WebSocket">MDN</a></h4>
      </div>
    </section>,
    <section className="bg-apple">
      <div style={{width: 530}} className="wrap size-50">
        <h4 style={{textAlign: 'left'}}>小结一下:  </h4>
        <img style={{width: '100%', margin: '10px 0 0'}} src={require('./assets/websocket.png')} alt="websocket"/>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h3>Dem 演示</h3>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h4><Link to="/chatroom">#Chatroom</Link></h4>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h4><Link to="/editor">#Editor</Link></h4>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h4><Link to="/whiteboard">#Whiteboard</Link></h4>
      </div>
    </section>,
    <section className="bg-apple">
      <div style={{width: 480}} className="wrap size-50">
        <h4 style={{textAlign: 'left'}}>Whiteboard-client:  </h4>
        <img style={{width: '100%', margin: '10px 0 0'}} src={require('./assets/whiteboard-client.png')} alt="whiteboard client"/>
      </div>
    </section>,
    <section className="bg-apple">
      <div style={{width: 620}} className="wrap size-50">
        <h4 style={{textAlign: 'left'}}>Whiteboard-server:  </h4>
        <img style={{width: '100%', margin: '10px 0 0'}} src={require('./assets/whiteboard-server.png')} alt="whiteboard server"/>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <p style={{width: 560, margin: '0 auto', textAlign: 'left'}}><span style={{fontSize: 30, fontWeight: 'bold'}}>总体而言,</span> 个人感觉使用WebSocket去开发一个应用，难点不在WebSocket本身，而是在定义通讯类型和数据的结构，利用更简洁，高效的数据结构去表达尽可能多的页面复杂交互。</p>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <h2 className="text-emoji zoomIn">😎</h2>
      <h3><strong>Thank you!</strong></h3>
      <p><a title="@Huang.zw">@huang.zw</a></p>
    </section>
  ];
  constructor(props) {
    super(props);
    this.state = {current: 0};
  } 
  componentDidMount() {
    localStorage.getItem('current') &&
    this.setState({current: localStorage.getItem('current')});
    socket.on('change_slide', (msg) => {
      this.set_storage(msg.num);
      this.setState({current: msg.num});
    });
  }
  handle_previous_slide = () => {
    const { current } = this.state;
    const num = current - 1 <= 0 ? 0 : current - 1;
    socket.emit('previous', {num});
    this.set_storage(num);
    this.setState({current: num});
  }
  handle_next_slide = () => {
    const { current } = this.state;
    const num = current + 1 >= this.slides.length - 1 ? this.slides.length - 1 : current + 1;
    socket.emit('next', {num});
    this.set_storage(num);
    this.setState({current: num});
  }
  set_storage = (num) => {
    localStorage.setItem('current', num);
  }
  render() {
    return (
      <div className="slides">
        <article id="webslides">{ this.slides[this.state.current] }</article>
        <div className="slides-btn">
          <span onClick={this.handle_previous_slide} className="btn-left"></span>
          <span onClick={this.handle_next_slide} className="btn-right"></span>
        </div>
      </div>
    );
  }
}
