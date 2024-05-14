import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function PDFGenerator({ data }) {
    const generatePDF = () => {
        if (!Array.isArray(data)) {
            console.error('Dados inválidos para gerar PDF');
            return;
        }

        const doc = new jsPDF();
        let posY = 10;
        doc.text("Relatório de Agendamentos de Sala", 10, posY);
        posY += 10;

        // Definindo as configurações da tabela
        const columns = [
            { title: "Data", dataKey: "date" },
            { title: "Horário", dataKey: "time" },
            { title: "Sala", dataKey: "sala" },
            { title: "Solicitante", dataKey: "requesterName" }
        ];

        const tableData = data.map(agendamento => ({
            date: new Date(agendamento.date).toLocaleDateString('pt-BR'),
            time: `${agendamento.startTime} - ${agendamento.endTime}`,
            sala: agendamento.sala,
            requesterName: agendamento.requesterName
        }));

        // Configurando a tabela
        doc.autoTable({
            startY: posY,
            head: [columns.map(column => column.title)],
            body: tableData.map(row => columns.map(column => row[column.dataKey])),
        });

        doc.save("relatorio_agendamentos_sala.pdf");
    };

    return (
        <button onClick={generatePDF}>Gerar PDF</button>
    );
}

export default PDFGenerator;
