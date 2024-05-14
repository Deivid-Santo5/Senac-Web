import Button from '../componentes/Button/button'

import './styles.css'



export default function Home() {
    return (
        <div className='home'>
      

            <section className='section' >



                <h1>Central de Agendamento<span>SENAC CONECTA</span></h1>
                <p>Para começar, escolha o que você deveja reservar!</p>

                <Button to="/Sala" text="Agendar Salas" />
                <Button to="/Equipamento" text="Agendar Equipamentos" />
                <Button to="/Gerenciamento" text="Gerenciar Serviços" />
                <Button to="/Relatorios" text="Ver Registros" />
                <Button to="/Developer" text="Saiba mais" />

            </section>
        </div>

    )
}