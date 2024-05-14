import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './styles.css';
import { app } from '../../services/firebaseconfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Modal, Button } from 'react-bootstrap';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth(app);
    const [signInWithEmailAndPassword, user, loadingAuth, error] = useSignInWithEmailAndPassword(auth);

    // FUNÇÃO DE AUTENTIFICAÇÃO DO GOOGLE
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // VARIAVEL QUE IDENTIFICA A AUTENFICAÇÃO DO USUARIO
            if (result.user) {
                navigate('/Home');
            }
        } catch (error) {
            // CASO O USUARIO NÃO FOR AUTENTICADO 
            console.error(error);
        }
    };

    // Atualiza o estado de loading de acordo com o loadingAuth do hook de autenticação
    useEffect(() => {
        setLoading(loadingAuth);
    }, [loadingAuth]);

    // FUNÇÃO QUE LIDA COM AUTENFICAÇÃO DE EMAIL
    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            if (!email) {
                handleShow('Por favor, insira seu email.');
            }
            if (!password) {
                handleShow('Por favor, insira sua senha.');
            }
            return;
        }

        try {
            await signInWithEmailAndPassword(email, password);
        } catch (authError) {
            handleShow('Email ou senha inválidos.');
        }
    };

    // Função para exibir o modal com a mensagem apropriada
    const handleShow = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleClose = () => {
        setShowModal(false);
    };

    // Efeito para redirecionar o usuário após o login ou mostrar erro
    useEffect(() => {
        if (user) {
            setShowModal(false);
            navigate('/Home');
        } else if (error) {
            handleShow('Email ou senha inválidos.');
        }
    }, [user, error, navigate]);

    return (
        <div>

            {loading && <span className='logando' />}
            <div className='modal-dialog modal-sm' >

                <Modal className="modal-1" show={showModal} onHide={handleClose}>
                    <Modal.Title>Atenção</Modal.Title>
                    {modalContent}
                    <Modal.Footer>
                        <Button className="btn-modal" variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>


                {!loading && (
                    <div className="container">
                        <div className="container-login">
                            <div className="wrap-login">
                                <form className="login-form" onSubmit={handleSignIn}>
                                    <span className="login-form-title">
                                        <img className='logo' src={logo} alt="Logos" />
                                    </span>

                                    <div className="wrap-input">
                                        <input
                                            className={email !== '' ? 'has-val input' : 'input'}
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="wrap-input">
                                        <input
                                            className={password !== '' ? 'has-val input' : 'input'}
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Senha"
                                        />
                                    </div>

                                    <div className="container-login-form-btn">
                                        <button type="submit" className="login-form-btn">
                                            Entrar
                                        </button>
                                    </div>

                                    <div className="container-login-form-btn">
                                        <button type="button" className="login-form-btn-google" onClick={signInWithGoogle}>
                                            Entrar com Google
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <span className="txt1"> Não possui conta?</span>
                                        <div>
                                        <Link className="txt2" to="/Register">
                                            Criar Conta.
                                        </Link>
                                        </div> 
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
