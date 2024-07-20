import React, { useState } from 'react';
import axios from 'axios';

function Register({ setIsRegistered }) {
    const [registerFormData, setRegisterFormData] = useState({
        username: '',
        name: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/users', {
                username: registerFormData.username,
                name: registerFormData.name,
                password: registerFormData.password
            });

            if (response.status === 200) {
                setRegisterFormData({ name: '', username: '', password: '' });
                setIsRegistered(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error registering user');
        }
    };

    return (
        <section className="text-center">
            <div className="p-5 bg-image" style={{
                backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)',
                height: '300px'
            }}></div>

            <div className="card mx-4 mx-md-5 shadow-5-strong bg-body-tertiary" style={{
                marginTop: '-100px',
                backdropFilter: 'blur(30px)'
            }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Sign up now</h2>
                            <form onSubmit={handleRegister}>
                                <div className="form-outline">
                                    <input
                                        type="text"
                                        id="form3Example1"
                                        className="form-control"
                                        value={registerFormData.name}
                                        onChange={(e) => setRegisterFormData({ ...registerFormData, name: e.target.value })}
                                    />
                                    <label className="form-label" htmlFor="form3Example1">Name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control"
                                        value={registerFormData.username}
                                        onChange={(e) => setRegisterFormData({ ...registerFormData, username: e.target.value })}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control"
                                        value={registerFormData.password}
                                        onChange={(e) => setRegisterFormData({ ...registerFormData, password: e.target.value })}
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                {error && <p className="text-danger">{error}</p>}

                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Sign up
                                </button>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                    Already registered?{' '}
                                    <button type="button" className="btn btn-link p-0" onClick={() => setIsRegistered(true)}>
                                        Login
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
