1. Inicie com ```npm install```.
2. Traga o arquivo XLSX. O arquivo deve se chamar ``` listaUsuarios.xlsx ``` e conter a lista de usuários listados em uma coluna.
3. Traga o arquivo PDF. O arquivo deve se chamar ``` template.pdf ``` Ele será modelo. O script irá gerar uma pasta chamada "pdfs" com os respectivos PDFs listados com os nomes encontrados na tabela.
4. Para selecionar uma fonte personalizada de sua escolha, faça o download do arquivo da fonte no formato .ttf, por exemplo, Arial.ttf, e cole-o na pasta "fonts". Em seguida, modifique o nome da fonte no código:
```javascript
const fontBytes = fs.readFileSync('fonts/Arial.ttf');
```
5. Para executar o script no terminal, certifique-se de estar no diretório raiz da pasta. Execute ```node index.js```.
6. Abra algum PDF e verifique se o texto com o nome do usuário está na posição desejada. Caso deseje modificar a posição, vá para o próximo passo.
7. Para movimentar o texto nos eixos x e y, modifique o valor após o sinal de +:
```javascript
const x = (width - textWidth) / 2 + 15;
const y = height / 2 + 130; 
```
