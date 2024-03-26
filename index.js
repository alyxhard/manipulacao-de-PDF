const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const XLSX = require('xlsx');

// Função para ler a lista de nomes do arquivo Excel
function lerNomesDoExcel(nomeArquivo) {
    const workbook = XLSX.readFile(nomeArquivo);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const nomes = XLSX.utils.sheet_to_json(worksheet, { header: ['nome'], defval: '' });
    return nomes.map(nome => nome.nome.trim());
}

// Função para criar PDFs para cada nome na lista
async function criarPDFsParaNomes(listaNomes, templatePDF, pastaPDFs) {
    const templateBytes = fs.readFileSync(templatePDF);
    for (const nome of listaNomes) {
        const pdfDoc = await PDFDocument.load(templateBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawText(nome, {
            x: 50,
            y: 50,
            size: 30,
        });
        const novoPDFBytes = await pdfDoc.save();
        fs.writeFileSync(`${pastaPDFs}/${nome}.pdf`, novoPDFBytes);
    }
}

// Arquivo PDF de template e planilha Excel com lista de nomes
const templatePDF = 'template.pdf';
const listaUsuariosXLSX = 'listaUsuarios.xlsx';
const pastaPDFs = 'pdfs';

// Criar a pasta 'pdfs' se ainda não existir
if (!fs.existsSync(pastaPDFs)) {
    fs.mkdirSync(pastaPDFs);
}

// Ler nomes do arquivo Excel
const listaNomes = lerNomesDoExcel(listaUsuariosXLSX);

// Criar PDFs para cada nome na lista
criarPDFsParaNomes(listaNomes, templatePDF, pastaPDFs)
    .then(() => console.log('PDFs criados com sucesso!'))
    .catch(error => console.error('Erro ao criar PDFs:', error));
