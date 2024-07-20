import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ user, setUser, setToken, setSessionId, sessionId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const onLogout = () => {
    setUser(null);
    setToken(null);
    setSessionId(null);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = { sender: 'user', text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        userId: user.userId,
        sessionId,
        messageText: message,
      });
      console.log(response.data)

      const botResponse = { sender: 'bot', text: response.data.botResponse };
      setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (sessionId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/chat/${sessionId}`);
          setMessages(response.data.messages || []);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [sessionId]);

  return (
    <div className='overflow-hidden'>
      <h1>Welcome {user.name}</h1>
      <button onClick={onLogout}>Logout</button>

      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card" id="chat1" style={{ borderRadius: '15px', height: '500px', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                  style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                >
                  <i className="fas fa-angle-left"></i>
                  <p className="mb-0 fw-bold">Live chat</p>
                  <i className="fas fa-times"></i>
                </div>
                <div className="card-body overflow-auto flex-grow-1">
                  {messages.map((msg, index) => (
                    <div key={index} className={`d-flex flex-row ${msg.sender === 'user' ? 'justify-content-end mb-4' : 'justify-content-start mb-4'}`}>
                      {msg.sender === 'user' ? null : (
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                      )}
                      <div className={`p-3 ${msg.sender === 'user' ? 'me-3 border bg-body-tertiary' : 'ms-3 bg-info text-white'}`} style={{ borderRadius: '15px' }}>
                        <p className="small mb-0">{msg.text}</p>
                      </div>
                      {msg.sender === 'user' ? (
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="card-footer form-outline mt-auto" style={{ position: 'sticky', bottom: 0 }}>
                  <input
                    className="form-control bg-body-tertiary"
                    id="textInputExample"
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your message"
                  />
                  <button className="btn btn-primary mt-2" onClick={sendMessage}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
