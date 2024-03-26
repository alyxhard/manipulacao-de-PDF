const fs = require('fs');
const { PDFDocument, rgb, TextAlignment } = require('pdf-lib');
const XLSX = require('xlsx');

function lerNomesDoExcel(nomeArquivo) {
    const workbook = XLSX.readFile(nomeArquivo);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const nomes = XLSX.utils.sheet_to_json(worksheet, { header: ['nome'], defval: '' });
    return nomes.map(nome => nome.nome.trim());
}

async function criarPDFsParaNomes(listaNomes, templatePDF, pastaPDFs) {
    const templateBytes = fs.readFileSync(templatePDF);
    for (const nome of listaNomes) {
        const pdfDoc = await PDFDocument.load(templateBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        const fontSize = 17;
        const font = await pdfDoc.embedFont('Helvetica');
        const textWidth = font.widthOfTextAtSize(nome, fontSize);
        const x = (width - textWidth) / 2 + 15;
        const y = height / 2 + 130;
        firstPage.drawText(nome, {
            x: x,
            y: y,
            size: fontSize,
            font: font,
            color: rgb(1, 1, 1),
            alignment: TextAlignment.Center // Definindo o alinhamento como centro
        });
        const novoPDFBytes = await pdfDoc.save();
        fs.writeFileSync(`${pastaPDFs}/${nome}.pdf`, novoPDFBytes);
    }
}

const templatePDF = 'template.pdf';
const listaUsuariosXLSX = 'listaUsuarios.xlsx';
const pastaPDFs = 'pdfs';

if (!fs.existsSync(pastaPDFs)) {
    fs.mkdirSync(pastaPDFs);
}

const listaNomes = lerNomesDoExcel(listaUsuariosXLSX);

criarPDFsParaNomes(listaNomes, templatePDF, pastaPDFs)
    .then(() => console.log('PDFs criados com sucesso!'))
    .catch(error => console.error('Erro ao criar PDFs:', error));
