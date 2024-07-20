import React, { useState } from 'react';
import axios from 'axios';
import Robo from '../../assets/robo.png';

function Login({ setIsRegistered, setToken, setUser, setSessionId }) {
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Logging in');

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username: loginFormData.username,
        password: loginFormData.password
      });

      if (response.status === 200) {
        console.log('Login successful');
        setLoginFormData({
          username: '',
          password: ''
        });
        const res = response.data;
        setToken(res.token);
        setUser(res);
        setSessionId(res.sessionId);
        
        window.localStorage.setItem('token', res.token);
        window.localStorage.setItem('user', JSON.stringify(res));
        window.localStorage.setItem('sessionId',res.sessionId);

        console.log('Token set:', res.token);
        console.log('User set:', res);
        console.log('session id:',res.sessionId);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Error logging in user');
      } else {
        setError('Error logging in user');
        console.log(err.message);
      }
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={Robo}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Sign into your account
                      </h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={loginFormData.username}
                          onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })}
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={loginFormData.password}
                          onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>

                      {error && <p className="text-danger">{error}</p>}

                      <div className="pt-1 mb-4">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        Don't have an account?{' '}
                        <button type="button" className="btn btn-link p-0" onClick={() => setIsRegistered(false)}>
                          Register
                        </button>
                      </p>
                      <a href="/" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="/" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
