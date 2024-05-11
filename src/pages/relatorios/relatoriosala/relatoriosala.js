import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebaseconfig'; // Importando 'db' para acessar Firestore
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './styles.css'; // Importar o CSS para estilização
import { Link } from 'react-router-dom';

export default function RelatorioSala() {
    const [agendamentos, setAgendamentos] = useState([]); // State para armazenar os agendamentos
    const [modalVisible, setModalVisible] = useState(false); // State para controlar a visibilidade do modal
    const [agendamentoIdToDelete, setAgendamentoIdToDelete] = useState(null); // State para armazenar o ID do agendamento a ser excluído

    useEffect(() => {
        const buscarAgendamentos = async () => {
            try {
                const agendamentoRef = collection(db, 'AgendamentoSala');
                const querySnapshot = await getDocs(agendamentoRef);
                const listaAgendamentos = [];
                querySnapshot.forEach((doc) => {
                    listaAgendamentos.push({ id: doc.id, ...doc.data() });
                });
                setAgendamentos(listaAgendamentos);
            } catch (error) {
                console.error('Erro ao buscar agendamentos de sala:', error);
            }
        };

        buscarAgendamentos();
    }, []);

    // Função para determinar a classe CSS baseada na data do agendamento
    const getClassByDate = (date) => {
        const agendamentoDate = new Date(date); // Convertendo a data do agendamento para objeto Date
        const now = new Date(); // Data atual

        // Verificando se a data do agendamento é menor que a data atual
        if (agendamentoDate < now) {
            return 'agendamento-passado';
        } else {
            return 'agendamento-futuro';
        }
    };

    // Função para excluir um agendamento
    const handleExcluirAgendamento = async (id) => {
        setAgendamentoIdToDelete(id);
        setModalVisible(true);
    };

    // Função para confirmar a exclusão de um agendamento
    const confirmarExclusao = async () => {
        try {
            await deleteDoc(doc(db, 'AgendamentoSala', agendamentoIdToDelete));
            setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== agendamentoIdToDelete));
            setModalVisible(false);
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
        }
    };

    // Função para fechar o modal de confirmação
    const fecharModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="table-container">
            
            <Link to="/Relatorios">
    <button>Voltar</button>
              </Link>

            <h2>Relatório de Agendamentos de Sala</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Sala</th>
                        <th>Solicitante</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map((agendamento) => (
                        <tr key={agendamento.id} className={getClassByDate(agendamento.date)}>
                            <td>{new Date(agendamento.date).toLocaleDateString('pt-BR')}</td>
                            <td>{agendamento.startTime} - {agendamento.endTime}</td>
                            <td>{agendamento.sala}</td>
                            <td>{agendamento.requesterName}</td>
                            <td>
                                <button onClick={() => handleExcluirAgendamento(agendamento.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Atenção</h3>
                        <p>Tem certeza que deseja excluir este agendamento?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmarExclusao}>Sim</button>
                            <button onClick={fecharModal}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
