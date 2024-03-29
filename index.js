// Importa o módulo 'fs' para operações de sistema de arquivos
const fs = require('fs');

// Importa as classes necessárias do módulo 'pdf-lib' para trabalhar com PDFs
const { PDFDocument, rgb, TextAlignment } = require('pdf-lib');

// Importa o módulo 'fontkit' necessário para trabalhar com fontes de texto em PDF
const fontkit = require('fontkit');

// Importa o módulo 'xlsx' para ler arquivos Excel
const XLSX = require('xlsx');

// Função assíncrona para ler nomes de um arquivo Excel
async function lerNomesDoExcel(nomeArquivo) {
    // Lê o arquivo Excel
    const workbook = XLSX.readFile(nomeArquivo);

    // Obtém o nome da primeira planilha
    const sheetName = workbook.SheetNames[0];

    // Obtém a primeira planilha
    const worksheet = workbook.Sheets[sheetName];

    // Converte a planilha em um array de objetos com a chave 'nome'
    const nomes = XLSX.utils.sheet_to_json(worksheet, { header: ['nome'], defval: '' });

    // Retorna uma lista de nomes limpa
    return nomes.map(nome => nome.nome.trim());
}

// Função assíncrona para criar PDFs personalizados para nomes
async function criarPDFsParaNomes(listaNomes, templatePDF, pastaPDFs) {
    // Lê o conteúdo do arquivo PDF de modelo
    const templateBytes = fs.readFileSync(templatePDF);

    // Itera sobre cada nome na lista de nomes
    for (const nome of listaNomes) {
        // Carrega o modelo PDF
        const pdfDoc = await PDFDocument.load(templateBytes);

        // Registra o fontkit para incorporação de fontes
        pdfDoc.registerFontkit(fontkit);

        // Obtém as páginas do documento PDF
        const pages = pdfDoc.getPages();

        // Obtém a primeira página
        const firstPage = pages[0];

        // Obtém as dimensões da primeira página
        const { width, height } = firstPage.getSize();

        // Define o tamanho da fonte
        const fontSize = 17;

        // Lê o arquivo de fonte
        const fontBytes = fs.readFileSync('fonts/JetBrainsMonoNL-Regular.ttf');

        // Incorpora a fonte no documento PDF
        const font = await pdfDoc.embedFont(fontBytes);

        // Calcula a largura do texto para centralizá-lo horizontalmente
        const textWidth = font.widthOfTextAtSize(nome, fontSize);
        const x = (width - textWidth) / 2 + 15;

        // Define a posição vertical do texto
        const y = height / 2 + 130;

        // Adiciona o nome à primeira página do PDF
        firstPage.drawText(nome, {
            x: x,
            y: y,
            size: fontSize,
            font: font,
            color: rgb(1, 1, 1),
            alignment: TextAlignment.Center
        });

        // Salva o documento PDF com o nome fornecido
        const novoPDFBytes = await pdfDoc.save();
        fs.writeFileSync(`${pastaPDFs}/${nome}.pdf`, novoPDFBytes);
    }
}

// Caminho para o arquivo PDF de modelo
const templatePDF = 'template.pdf';

// Caminho para o arquivo Excel contendo os nomes
const listaUsuariosXLSX = 'listaUsuarios.xlsx';

// Nome do diretório onde os PDFs serão salvos
const pastaPDFs = 'pdfs';

// Verifica se o diretório para os PDFs existe. Se não existir, cria-o.
if (!fs.existsSync(pastaPDFs)) {
    fs.mkdirSync(pastaPDFs);
}

// Inicia o processo: lê os nomes do arquivo Excel, cria PDFs personalizados e lida com erros
lerNomesDoExcel(listaUsuariosXLSX)
    .then(listaNomes => criarPDFsParaNomes(listaNomes, templatePDF, pastaPDFs))
    .then(() => console.log('PDFs criados com sucesso!'))
    .catch(error => console.error('Erro ao criar PDFs:', error));
