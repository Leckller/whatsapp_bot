---- Bot para o Whatsapp ----

* tecnologias utilizadas
    - Node.js
    - Mocha, Chai, Sinon
    - Firebase (em construção :P)

* Arquitetura utilizada
  - MSC ( Model, Services, Controlls)

* Para que o app funcione com banco de dados é necessario criar um arquivo na raiz do projeto chamado serviceAccountKey.json

  - Dentro do console do firebase clique em cloud fire store
  - Crie a sua fire store utilizando o modo de testes provisoriamente
  - Vá até as configurações do projeto e clique em "Contas de serviço"
  - Clique em "gerar nova chave privada", após isso vai ser baixado um arquivo json
  - Por fim, coloque o arquivo na raiz do projeto e altere o nome dele para "serviceAccountKey.json"

* Para usar os comando da api do tempo é necessario criar uma chave de api em https://www.weatherapi.com/login.aspx

* Comandos 
  * Comandos com banco de dados on
    - "+var": (nome da variavel) (valor da variavel)'adiciona uma variavel'
    - "!var": (nome da variavel) 'retorna o valor de uma variavel'
    - "+gp": (identificador do gp)'adiciona permissao para falar em um grupo'
    - "+user: (identificador do usuario) 'adiciona permissao para um usuario usar o bot'
  * Comandos default
    - "!everyone": 'menciona todos os participantes do grupo'
  * Comandos com a api do tempo
    - "!climate": (local) 'comando para requisição em uma api do tempo'
    - "&climate": (valor) 'comando para escolher uma opção da api do tempo'