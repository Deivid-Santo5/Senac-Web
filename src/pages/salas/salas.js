import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebaseconfig'; // Importando 'db' para acessar Firestore
import './styles.css';
import logo from '../assets/logo2.png';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap'; // Importando o Modal e Button do Bootstrap
import DatePicker from 'react-datepicker'; // Importando DatePicker do 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'; // Importando os estilos do 'react-datepicker'

export default function AgendamentoSala() {
    const [salas, setSalas] = useState([]); // State para armazenar a lista de salas disponíveis
    const [selectedSala, setSelectedSala] = useState(''); // State para a sala selecionada
    const [date, setDate] = useState(null); // State para a data selecionada
    const [startTime, setStartTime] = useState('07:00'); // State para a hora de início, padrão 07:00
    const [endTime, setEndTime] = useState('08:00'); // State para a hora de término, padrão 08:00
    const [requesterName, setRequesterName] = useState(''); // State para o nome do solicitante

    // States para o modal de notificação
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    // Função para buscar salas disponíveis no banco de dados
    useEffect(() => {
        const fetchSalas = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Sala'));
                const salasList = [];
                querySnapshot.forEach(doc => {
                    salasList.push({ name: doc.name, ...doc.data() });
                });
                setSalas(salasList);
            } catch (error) {
                console.error('Erro ao buscar salas:', error);
            }
        };
        fetchSalas();
    }, []);

    // Função para lidar com a submissão do formulário
    async function handleSubmit(e) {
        e.preventDefault();

        // Dados do agendamento, incluindo o nome do solicitante
        const bookingData = {
            sala: selectedSala,
            date: formatDate(date), // Convertendo para formato de data desejado
            startTime,
            endTime,
            requesterName,
        };

        try {
            // Verifica se já existe um agendamento para o mesmo dia e horário
            const agendamentoCollection = collection(db, 'AgendamentoSala');
            const agendamentoQuery = query(
                agendamentoCollection,
                where('sala', '==', selectedSala),
                where('date', '==', bookingData.date),
                where('startTime', '==', bookingData.startTime),
                where('endTime', '==', bookingData.endTime)
            );
            const agendamentoSnapshot = await getDocs(agendamentoQuery);

            if (!agendamentoSnapshot.empty) {
                // Se já existir um agendamento para o mesmo dia e horário, exibe mensagem de erro
                setModalTitle('Erro');
                setModalMessage('Já existe um agendamento para este dia e horário.');
                setModalVisible(true);
            } else {
                // Se não houver conflito, adiciona os dados de agendamento à coleção 'AgendamentoSala'
                await addDoc(agendamentoCollection, bookingData);

                // Configura as mensagens do modal
                setModalTitle('');
                setModalMessage('Agendamento concluído com sucesso!');
                setModalVisible(true);

                // Limpa os campos do formulário após o envio
                setSelectedSala('');
                setDate(null);
                setStartTime('07:00'); // Reinicia para o horário padrão
                setEndTime('08:00'); // Reinicia para o horário padrão
                setRequesterName('');
            }
        } catch (error) {
            console.error('Erro ao agendar sala:', error);

            // Configura as mensagens do modal
            setModalTitle('Erro');
            setModalMessage('Erro ao agendar sala: ' + error.message);
            setModalVisible(true);
        }
    }

    // Função para formatar a data no formato desejado (mês/dia/ano)
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const month = formattedDate.getMonth() + 1;
        const day = formattedDate.getDate();
        const year = formattedDate.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <div>
         


        <div className="room-booking-form">
            <img className='logo' src={logo} alt="Logos" />
            <h2>Agendamento de Sala</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Sala:</label>
                    <select
                        value={selectedSala}
                        onChange={(e) => setSelectedSala(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma sala</option>
                        {salas.map(sala => (
                            <option key={sala.name} value={sala.name}>
                                {sala.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Data:</label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()} // Não permitir selecionar datas anteriores
                        required
                    />
                </div>
                <div>
                    <label>Hora de Início:</label>
                    <input
                        type="time"
                        value={startTime}
                        min="07:00"
                        max="22:00"
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hora de Término:</label>
                    <input
                        type="time"
                        value={endTime}
                        min={startTime} // Garante que o horário de término seja após o horário de início
                        max="22:00"
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nome do Solicitante:</label>
                    <input
                        type="text"
                        value={requesterName}
                        onChange={(e) => setRequesterName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Agendar Sala</button>

                <Link className='retorno' to='/Home'>Página Inicial</Link>
            </form>

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
               
                {modalTitle}
                
                {modalMessage}
                
                <Modal.Footer>
                    <Button variant="primary" className='custom-button' onClick={() => setModalVisible(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

        <button><Link className="txt2" to="/RelatorioSala">Ver Agendamentos Recentes </Link></button>
        
        </div>
    );
}
