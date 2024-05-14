import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PDFGenerator1({ data }) {
    const generatePDF = () => {
        if (!Array.isArray(data)) {
            console.error('Dados inválidos para gerar PDF');
            return;
        }

        const doc = new jsPDF();
        let posY = 10;
        doc.text("Relatório de Agendamentos de Equipamento", 10, posY);
        posY += 10;

        // Definindo as configurações da tabela
        const columns = [
            { title: "Data", dataKey: "date" },
            { title: "Horário", dataKey: "time" },
            { title: "Equipamento", dataKey: "equipamento" },
            { title: "Solicitante", dataKey: "requesterName" }
        ];

        const tableData = data.map(agendamento => ({
            date: agendamento.date instanceof Date ? agendamento.date.toLocaleDateString('pt-BR') : agendamento.date,
            time: `${agendamento.startTime} - ${agendamento.endTime}`,
            equipamento: agendamento.equipamento,
            requesterName: agendamento.requesterName
        }));

        // Configurando a tabela
        doc.autoTable({
            startY: posY,
            head: [columns.map(column => column.title)],
            body: tableData.map(row => columns.map(column => row[column.dataKey])),
        });

        doc.save("relatorio_agendamentos_equipamento.pdf");
    };

    return (
        <button onClick={generatePDF}>Gerar PDF</button>
    );
}

export default PDFGenerator1;
