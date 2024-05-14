import Button from '../componentes/Button/button';
import './styles.css'


//TELA INICIAL DOS REGISTROS DE AGENDAMENTOS

export default function Relatorios() {
    return (
        <div className='home'>
      

            <section className='section' >



                <h1>Escolha o Relatório que deseja ver</h1>
                <p>
                    Para melhor visibilidade em Aparelhos Celulares, favor baixe o relatorio em PDF ou veja com o aparelho na Horizontal
                </p>
               

                <Button to="/RelatorioSala" text="Ver Registros de Sala" />
                <Button to="/RelatorioEquipamento" text="Ver Registros de Equipamentos" />
                <Button to="/Home" text="Voltar" />
      

            </section>
        </div>

    )
}