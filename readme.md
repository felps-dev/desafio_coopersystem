## Desafio Coopersystem - Resumo

O desafio consistia em utilizar Django/Python para montar uma aplicação simples que cadastrasse produtos e pedidos, com 2 condições:
- Caso o estoque do produto esteja zerado, ele deve ficar indisponível, se não, disponível.
- Um pedido não pode ser feito sem que tenha o produto em estoque.

Com isso a seguinte aplicação foi desenvolvida:

![Imagem exemplo](https://i.imgur.com/QkaE1ng.png)

## Observações
Como foi especificado que poderia ser utilizado o DRF(Django Rest Framework), optei por utilizar do mesmo para construir a REST API (sendo consumida por um frontend em react-js), portanto não utilizei do sistema de templates do DJANGO.

## Tecnologias utilizadas
#### Backend
- Python 3.10.0
- Django 4.0.4
- Django Rest Framework 3.13.1
- Docker
- PostgreSQL

#### Frontend
- ReactJS
- Javascript (Ecmascript 2021)

#### Recursos disponíveis
- Filtros no Backend (Utilizando Django Filter)
- Documentação automática via Swagger UI (Utilizando o DRF-Spectacular)
- Interface baseada no material design (Utilizando Material UI)
- Imagem em Docker para build de produção para frontend e backend

## Como instalar (Setup)
Primeiramente clone o repositório, logo após crie um SCHEMA no Postgres com o nome que deseja, exemplo: `coopersystem`.
Com ele clonado siga os passos adiante.
#### Backend
- Instale o Python 3.10.0 ou mais recente
- Crie um virtual env dentro da pasta do backend `python -m venv env`
- Inicie seu env (depende do sistema, o exemplo é com windows) `env/Scripts/activate`
- Realize a instalação das dependencias `pip install -r requirements.txt`
- Crie uma cópia do arquivo `env_template` com o nome `.env` e preencha com os dados.
- No Django Secret do arquivo `.env`, coloque uma frase aleatória.
- Realize as migrations `python manage.py migrate`
- Crie seu super user `python manage.py createsuperuser`
- Colete os arquivos estáticos `python manage.py collectstatic`
- Inicie a API em dev `python manage.py runserver`

#### Frontend
- Instale o Node com o NPM, se puder, coloque o Yarn para agilizar a instalação.
- Dentro da pasta do frontend execute o comando `npm i` ou `yarn`
- Aguarde que as dependencias sejam instaladas
- Execute o frontend com `npm run dev` ou `yarn dev`

## Como Utilizar (Usage)
- Após iniciar o servidor do frontend e do backend você terá um output com o endereço e porta. Padrão: `localhost:3000`
- No frontend basta realizar login com o usuário e senha criado no `createsuperuser`
- A aplicação irá funcionar.
- Para visualizar o Swagger UI abra o endereço da API + `/api/docs/swui`. Ex: `http://localhost:8000/api/docs/swui` 

## Detalhes adicionais
O tempo total de desenvolvimento foi de **4h 32m e 57s** (Não contando com o tempo de release / email). Foram utilizadas as funções mais recentes da DRF, porém por ser um projeto simples não teve tanto o que se explorar.
Por consistencia de dados, foi utilizado os signals, assim temos certeza da quantidade atual do produto.
