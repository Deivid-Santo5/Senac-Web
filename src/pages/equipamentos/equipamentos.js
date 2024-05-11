import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebaseconfig';
import './styles.css';
import logo from '../assets/logo2.png';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AgendamentoEquipamento() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [selectedEquipamento, setSelectedEquipamento] = useState('');
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [requesterName, setRequesterName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [setModalTitle] = useState('');


    useEffect(() => {
        const fetchEquipamentos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Equipamentos'));
                const equipamentosList = [];
                querySnapshot.forEach(doc => {
                    const equipamentoData = doc.data();
                    equipamentosList.push({ id: doc.id, name: equipamentoData.name });
                });
                setEquipamentos(equipamentosList);
            } catch (error) {
                console.error('Erro ao buscar equipamentos:', error);
            }
        };
        fetchEquipamentos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificação de horário, verificação de disponibilidade, e lógica para adicionar agendamento...

        // Dados do agendamento, incluindo o nome do equipamento
        const selectedEquipamentoData = equipamentos.find(equipamento => equipamento.id === selectedEquipamento);
        const bookingData = {
            equipamento: selectedEquipamentoData.name,
            date: date.toLocaleDateString('pt-BR'),
            startTime,
            endTime,
            requesterName,
        };
        try {
            await addDoc(collection(db, 'AgendamentoEquipamento'), bookingData);
            
            setModalMessage('Agendamento concluído com sucesso!');
            setModalVisible(true);
            setSelectedEquipamento('');
            setDate(null);
            setStartTime('');
            setEndTime('');
            setRequesterName('');
        } catch (error) {
            console.error('Erro ao agendar equipamento:', error);
            setModalTitle('Erro');
            setModalMessage('Erro ao agendar equipamento: ' + error.message);
            setModalVisible(true);
        }
    };

    return (
        <div>
            <div className="room-booking-form">

                <img className='logo' src={logo} alt="Logos" />
                <h2>Agendamento de Equipamento</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Equipamento:</label>
                        <select
                            value={selectedEquipamento}
                            onChange={(e) => setSelectedEquipamento(e.target.value)}
                            required
                        >
                            <option value="">Selecione um equipamento</option>
                            {equipamentos.map(equipamento => (
                                <option key={equipamento.id} value={equipamento.id}>
                                    {equipamento.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Data:</label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
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
                            min={startTime}
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
                    <button type="submit">Agendar Equipamento</button>

                    <Link className='retorno' to='/Home'>Página Inicial</Link>
                </form>

                <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                   
                    {modalMessage}
                    <Modal.Footer>
                        <Button variant="primary" className='custom-button' onClick={() => setModalVisible(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

            <Link className='txt2' to="/Sala">
    <button>Ir para Salas</button>
              </Link>

        </div>

    );
}
