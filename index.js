const fs = require('fs');
const { PDFDocument, rgb, TextAlignment } = require('pdf-lib');
const fontkit = require('fontkit'); // Adiciona esta linha para importar o fontkit
const XLSX = require('xlsx');

async function lerNomesDoExcel(nomeArquivo) {
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
        pdfDoc.registerFontkit(fontkit); // Registra o fontkit antes de incorporar a fonte
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        const fontSize = 17;
        const fontBytes = fs.readFileSync('fonts/JetBrainsMonoNL-Regular.ttf');
        const font = await pdfDoc.embedFont(fontBytes);
        const textWidth = font.widthOfTextAtSize(nome, fontSize);
        const x = (width - textWidth) / 2 + 15;
        const y = height / 2 + 130;
        firstPage.drawText(nome, {
            x: x,
            y: y,
            size: fontSize,
            font: font,
            color: rgb(1, 1, 1),
            alignment: TextAlignment.Center
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

lerNomesDoExcel(listaUsuariosXLSX)
    .then(listaNomes => criarPDFsParaNomes(listaNomes, templatePDF, pastaPDFs))
    .then(() => console.log('PDFs criados com sucesso!'))
    .catch(error => console.error('Erro ao criar PDFs:', error));
