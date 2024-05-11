import Button from '../componentes/Button/button'

import './styles.css'



export default function Home() {
    return (
        <div className='home'>
      

            <section className='section' >



                <h1>Central de Agendamento<span>SENAC</span></h1>
                <p>Para começar, escolha o que você deveja reservar!</p>

                <Button to="/Sala" text="Ver Salas Disponiveis" />
                <Button to="/Equipamento" text="Ver Equipamentos Disponiveis" />
                <Button to="/Gerenciamento" text="Gerenciar Serviços" />
                <Button to="/Relatorios" text="Ver Registros" />

            </section>
        </div>

    )
}