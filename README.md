![alt text](assets/image.png)

1. ``` git clone https://github.com/alyxhard/manipulacao-de-PDF.git ```

2. Atenção! Lembre-se de estar no diretório raiz antes de executar npm install. Após clonar o repositório, a pasta raiz será nomeada com o nome deste repositório, para entrar na pasta basta avançar uma pasta acima da sua pasta 
``` cd NOME_PASTA_REPOSITORIO ``` .

3. Inicie com ```npm install```.

4. Traga seu arquivo XLSX ou edite o disponivel na pasta. O arquivo deve se chamar ``` listaUsuarios.xlsx ``` e conter a lista com todos os usuários listados em uma coluna.

5. Traga seu arquivo PDF. O arquivo deve se chamar ``` template.pdf ``` Ele será modelo. O script irá gerar uma pasta chamada ``` pdfs ``` com os respectivos PDFs listados com os nomes encontrados na tabela.

6. Para selecionar uma fonte personalizada de sua escolha, faça o download do arquivo da fonte no formato ``` .ttf ```, por exemplo,``` Arial.ttf ```, e cole-o na pasta ``` fonts ```. Em seguida, abra o arquivo ``` index.js ``` e modifique o nome da fonte no código:
```javascript
const fontBytes = fs.readFileSync('fonts/Arial.ttf');
```

7. Para executar o script no terminal, certifique-se de estar no diretório raiz da pasta. Execute ```node index.js```.

8. A pasta ``` pdfs ``` é criada automaticamente. Abra algum PDF e verifique se o texto com o nome do usuário está na posição desejada. Para movimentar a posição siga o para o proximo passo.

9. Para movimentar a posição do texto abra o arquivo ``` index.js ``` e modifique os eixos x e y, modifique o valor após o sinal de +:
```javascript
const x = (width - textWidth) / 2 + 15;
const y = height / 2 + 130; 
```
