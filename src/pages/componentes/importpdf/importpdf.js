import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ImportPdf({ agendamentos }) {
    const gerarPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Data', 'Horário', 'Equipamento', 'Solicitante']],
            body: agendamentos.map(agendamento => [
                agendamento.date instanceof Date ? agendamento.date.toLocaleDateString('pt-BR') : agendamento.date,
                `${agendamento.startTime} - ${agendamento.endTime}`,
                agendamento.equipamento,
                agendamento.requesterName
            ])
        });
        doc.save('relatorio_agendamentos.pdf');
    };

    return (
        <div>
            <button onClick={gerarPDF}>Exportar para PDF</button>
        </div>
    );
}
