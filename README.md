# Calculadora — TechManaus Sistemas

Projeto acadêmico de DevOps (ESBAM) baseado no estudo de caso da empresa fictícia TechManaus Sistemas.

## Descrição
API de calculadora desenvolvida em **Python com Flask**. Recebe dois números e uma operação via requisição `POST` e retorna o resultado em JSON.

O objetivo do projeto é demonstrar versionamento com Git/GitHub, uso de branches e a aplicação do ciclo DevOps.

## Tecnologias
- Python 3
- Flask

## Como executar
```bash
cd backend
pip install -r requirements.txt
python app.py
```
A API ficará disponível em `http://127.0.0.1:5000`.

## Endpoint

### `POST /calcular`

**Corpo da requisição:**
```json
{
  "num1": 10,
  "num2": 5,
  "operacao": "+"
}
```

**Resposta:**
```json
{
  "resultado": 15.0
}
```

### Operações suportadas
| Operação | Símbolo |
|---|---|
| Soma | `+` |
| Subtração | `-` |
| Multiplicação | `*` |
| Divisão | `/` |
| Potência | `^` |

### Erros tratados
- Campos ausentes (`num1`, `num2` ou `operacao`)
- Números inválidos
- Divisão por zero
- Operação inválida

Todos retornam status `400` com uma mensagem de erro.

## Fluxo de branches
- `feature/*` → desenvolvimento de funcionalidades
- `dev` → integração e testes
- `main` → produção (o merge da `dev` na `main` representa o deploy)

## Estrutura de nuvem recomendada
_Em construção_

## Ciclo DevOps aplicado
_Em construção_

## Equipe
| Integrante | Papel |
|---|---|
| Giovane | Tech Lead |
| Rayca | |
| | |
| | |
| | |