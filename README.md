---- Bot para o Whatsapp ----

* tecnologias utilizadas
    - Node.js
    - Mocha, Chai, Sinon
    - Firebase (em construção :P)

* Arquitetura utilizada
  - MSC ( Model, Services, Controlls)

* Para que o app funcione é nessario criar um arquivo na raiz do projeto chamado serviceAccountKey.json

  - Dentro do console do firebase clique em cloud fire store
  - Crie a sua fire store utilizando o modo de testes provisoriamente
  - Vá até as configurações do projeto e clique em "Contas de serviço"
  - Clique em "gerar nova chave privada", após isso vai ser baixado um arquivo json
  - Por fim, coloque o arquivo na raiz do projeto e altere o nome dele para "serviceAccountKey.json"

* Comandos 
  - "+gp": (identificador do gp)'adiciona permissao para falar em um grupo'
  - "+user: (identificador do usuario) 'adiciona permissao para um usuario usar o bot'
  - "+var": 'adiciona uma variavel'
  - "!everyone": 'menciona todos os participantes do grupo'
  - "!climate": (local) 'comando para requisição em uma api do tempo'
  - "&climate": (valor) 'comando para escolher uma opção da api do tempo'