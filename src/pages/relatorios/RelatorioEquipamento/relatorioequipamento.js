import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebaseconfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './styles.css';
import { Link } from 'react-router-dom';
import PDFGenerator1 from '../../componentes/jsPDF - EQUIPAMENTO/jsPDF-equip'; // Importe o componente PDFGenerator

export default function RelatorioEquipamento() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [agendamentoExcluir, setAgendamentoExcluir] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    const getClassByDate = (date) => {
        const agendamentoDate = new Date(date);
        const now = new Date();
        return agendamentoDate < now ? 'agendamento-passado' : 'agendamento-futuro';
    };

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
            <Link to="/Relatorios">
                <button>Voltar</button>
            </Link>

            <PDFGenerator1 data={agendamentos} />
            
            <h2>Relatório de Agendamentos de Equipamento</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Equipamento</th>
                        <th>Solicitante</th>
                        <th>Ações</th>
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
                                }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirmação de Exclusão</h3>
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
