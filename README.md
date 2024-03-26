1. Inicie com ```npm install```.
2. Traga o arquivo XLSX. O arquivo deve se chamar ``` listaUsuarios.xlsx ``` e conter a lista de usuários listados em uma coluna.
3. Traga o arquivo PDF. O arquivo deve se chamar ``` template.pdf ``` Ele será modelo. O script irá gerar uma pasta chamada "pdfs" com os respectivos PDFs listados com os nomes encontrados na tabela.
4. Para executar o script no terminal, certifique-se de estar no diretório raiz da pasta. Execute ```node index.js```.
5. Abra algum PDF e verifique se o texto com o nome do usuário está na posição desejada. Caso deseje modificar a posição, vá para o próximo passo.
6. Para movimentar o texto nos eixos x e y, modifique o valor após o sinal de +:
```javascript
const x = (width - textWidth) / 2 + 15;
const y = height / 2 + 130; 
```
