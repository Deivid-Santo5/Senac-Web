import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebaseconfig'; // Importando 'db' para acessar Firestore
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './styles.css'; // Importar o CSS para estilização
import { Link } from 'react-router-dom';

export default function RelatorioEquipamento() {
    const [agendamentos, setAgendamentos] = useState([]); // State para armazenar os agendamentos
    const [agendamentoExcluir, setAgendamentoExcluir] = useState(null); // State para armazenar o agendamento a ser excluído
    const [modalVisible, setModalVisible] = useState(false); // State para controlar a visibilidade do modal de confirmação

    useEffect(() => {
        const buscarAgendamentos = async () => {
            try {
                const agendamentoRef = collection(db, 'AgendamentoEquipamento');
                const querySnapshot = await getDocs(agendamentoRef);
                const listaAgendamentos = [];
                querySnapshot.forEach((doc) => {
                    listaAgendamentos.push({ id: doc.id, ...doc.data() });
                });
                setAgendamentos(listaAgendamentos);
            } catch (error) {
                console.error('Erro ao buscar agendamentos de equipamento:', error);
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

    // Função para lidar com a exclusão de um agendamento
    const handleExcluirAgendamento = async () => {
        if (agendamentoExcluir) {
            try {
                await deleteDoc(doc(db, 'AgendamentoEquipamento', agendamentoExcluir.id));
                setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== agendamentoExcluir.id));
                setModalVisible(false);
                setAgendamentoExcluir(null);
            } catch (error) {
                console.error('Erro ao excluir agendamento:', error);
            }
        }
    };

    return (
        <div className="table-container">
            <button><Link className='retorno' to='/Equipamento'>Voltar ao Agendamento</Link></button>
            <h2>Relatório de Agendamentos de Equipamento</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Equipamento</th>
                        <th>Solicitante</th>
                        <th>Ações</th> {/* Adicionando uma coluna para as ações */}
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map((agendamento) => (
                        <tr key={agendamento.id} className={getClassByDate(agendamento.date)}>
                            <td>{agendamento.date instanceof Date ? agendamento.date.toLocaleDateString('pt-BR') : agendamento.date}</td>
                            <td>{agendamento.startTime} - {agendamento.endTime}</td>
                            <td>{agendamento.equipamento}</td>
                            <td>{agendamento.requesterName}</td>
                            <td>
                                <button onClick={() => {
                                    setAgendamentoExcluir(agendamento);
                                    setModalVisible(true);
                                }}>Excluir</button> {/* Botão para excluir o agendamento */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de confirmação */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Atenção</h3>
                        <p>Tem certeza que deseja excluir este agendamento?</p>
                        <div className="modal-buttons">
                            <button onClick={handleExcluirAgendamento}>Sim</button>
                            <button onClick={() => {
                                setModalVisible(false);
                                setAgendamentoExcluir(null);
                            }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
