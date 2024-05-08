import logo from '../assets/logo.png';
import './styles.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseconfig';
import { Modal, Button } from 'react-bootstrap';

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');


// COMPONENTE PARA O REGRISTRO DE NOVO USUARIO
    const [
        createUserWithEmailAndPassword,
        user,
   
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

   

    function handleSignOut(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);

         if (user) {
            setEmail('');
            setPassword('');
        }
    }


    // COMPONENTE PARA O FECHANDO DO MODAL
    const handleClose = () => setShowModal(false);

    // FUNÇÃO DE LIDA COM AS VERIFICAÇÕES DO MODAL
    const handleShow = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

   // VERIFICAÇÃO DE COMPONENTES DE FALHA OU SUCESSOS
   useEffect(() => {
    
     if (error) {
        handleShow('Email Inválido ou Já Existente');
    }
    
    if (user) {
        handleShow('Conta Criada com Sucesso');

        setEmail('');

        setPassword('');
        
    } 
}, [user, error]);



    return (
        <div >
            <Modal className='modal' show={showModal} onHide={handleClose}>
               
                    <Modal.Title>Atenção</Modal.Title>
                
              {modalContent}
                <Modal.Footer>

                    <Button className='btn-modal' variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="container">

                <div className="container-login" >

                    <div className="wrap-login">

                        <form className="login-form">



                            <span className="login-form-title">

                                <img src={logo} alt="Logos" />

                            </span>

                            <form>
                                <div className='wrap-input'>
                                    <label htmlFor='email'>E-mail</label>
                                    <input
                                        className={email !== "" ? 'has-val input' : 'input'}
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                </div>
                            </form>

                            <form>
                                <label htmlFor='password'>Senha</label>
                                <div className='wrap-input'>

                                    <input
                                        className={password !== "" ? 'has-val input' : 'input'}
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </div>
                            </form>
                            <div className='container-login-form-btn'>
                                <button className='login-form-btn' onClick={handleSignOut}>Criar Conta</button>
                            </div>

                            <div className='text-center'>
                                <Link className='txt1' to='/' >Já possui conta?</Link>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
