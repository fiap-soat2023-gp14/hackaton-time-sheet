# soat23-gp14-pedido

## Description

Este Microserviço é reponsável por gerenciar os registros de ponto dos usuários funcionários de uma empresa.
Ele possuis as funções de:
  - Registrar ponto
  - Exibir pontos do usuário
  - E receber solicitação de emissão de relatório de folha de ponto

## Installation

```bash
$ yarn install
```

## Running the app

Para rodar a aplicação localmente, é necessário possuir o MongoDB rodando e a fila report-request no SQS.

Com o banco disponível, a base timeSheet criada, e a fila configurada devemos atualizar o arquivo local.env com as cofigurações.

```bash
# load configs to env
$ source local.env

# development
$ yarn run start
```

## Test

```bash
# unit tests
$ yarn run test

$ yarn run test:e2e

# test coverage
$ yarn run test:cov

# test BDD
$ yarn run test:bdd
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).