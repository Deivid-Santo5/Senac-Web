import React from 'react';
import src from '../assets/developer/src.png';
import pages from '../assets/developer/pages.png';
import info from '../assets/developer/info.png';
import rotas from '../assets/developer/rotas.png';
import componentes from '../assets/developer/componentes.png';
import relatorio from '../assets/developer/relatorio.png';
import './styles1.css';
import { Link } from 'react-router-dom';
import RedirectButton from '../componentes/github/botaosite';


function Developer() {
    return (
        <div className="container">
            <h1>Seja Bem vindo a Pagina do Desenvolvedor</h1>

            <p>
                Esta página foi feita para que desenvolvedores ou pessoas que buscam entender mais sobre como foi estruturado nosso projeto, e como foi a organização de criação de cada página.
            </p>

            <div className="info-section">
               
                <div className="text-container">
                    <p>
                        Nosso projeto foi dividido em 3 estruturas principais: Páginas, Rotas e Serviços, que se encontra dentro da pasta principal do projeto chamada de src.
                    </p>
                    <img src={src} alt="Logos" />
                </div>
            </div>

            <div className="info-section">
               
                <div className="text-container">
                    <p>
                        Dentro da pasta Pages temos outras 10 Pastas criadas para representar todas as páginas do sistema Senac Conecta,
                        são elas a página 'adm controle' que é página onde o sistema será gerenciado, através dela é possível a criação, edição e remoção de Salas e Equipamentos.
                    </p>
                    <img src={pages} alt="Logos" />
                    <p>
                        A pasta 'assets' é onde salvamos todas as imagens usadas em nosso projeto, desde, as logos até essas fotos mesmo que estão vendo aqui.
                    </p>
                </div>
            </div>

            <div className="info-section">
               
                <div className="text-container">
                    <p>
                        Já aqui, em componentes, é onde criamos componentes isolados das Páginas, onde podem ser reaproveitados caso surjam outras necessidades.
                    </p>
                    <img src={componentes} alt="Logos" />
                </div>
            </div>

            <div className="info-section">
               
                <div className="text-container">
                    <p>
                        Os relatórios para melhor organização foram divididos em 2 páginas.
                    </p>
                    <img src={relatorio} alt="Logos" />
                </div>
            </div>

            <div className="info-section">
             
                <div className="text-container">
                    <p>
                        E toda aquelas estruturas funcionam graças a estes dois indivíduos,
                         a pasta routers onde se encontra o arquivo AppRoutes é responsável por interligar todas as nossas páginas, 
                         como um sistema de Rotas, e ele é uma ferramenta do próprio React.
                    </p>
                    <p> E também tem a nossa pagina de Serviços que é totalmente controlada pelo firebase,
                     que é um framework que vem nos auxiliando bastante, fornecentos componentes e ferramentes para nosso Backend,
                      como nossos autenticadores de login, o banco de dados e o hosting do nosso sistema.</p>
                    <img src={rotas} alt="rotas" />
                </div>
            </div>

            <div className="info-section">
             
                <div className="text-container">
                    <p>
                        E por último, mas não menos importante, a página de informação do nosso projeto, onde você está, pois para gente é muito importante que você, usuário, consiga usufruir do nosso sistema de forma simples e satisfatória, mas também entenda como somos feitos, para que esse objetivo seja atingido.
                    </p>
                    <img src={info} alt="info" />
                    <p>
                        Muito obrigado por chegar aqui, a sua curiosidade para saber sobre o desenvolvimento do nosso projeto nos deixa muito animados,
                         caso queira se aprofundar mais e vasculhar nossos códigos fique à vontade nesse Github ao final da pagina para melhor entendimentos, muitos de nossos códigos estão comentados.
                    </p>
                    <Link className='txt2' to="/Home">
                    <button>Voltar</button>
                    </Link>

                    <RedirectButton />
                     
                </div>
                
            </div>
        </div>
    );
}

export default Developer;
