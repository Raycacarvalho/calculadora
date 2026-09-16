# Calculadora — TechManaus Sistemas

Projeto acadêmico de DevOps (ESBAM). Backend em Python (Flask) e frontend estático (HTML/CSS/JS).

## Visão geral
O backend expõe o endpoint `POST /calcular` que recebe `num1`, `num2` e `operacao` e retorna o resultado em JSON. O frontend (`index.html` + `script.js`) envia requisições para esse endpoint.

Local do código relevante:
- Backend: `backend/app.py`
- Dependências: `backend/requirements.txt` (já inclui `Flask` e `flask-cors`)
- Frontend: `index.html`, `script.js`, `style.css`

## Pré-requisitos
- Python 3 (3.8+ recomendado)
- `git` (para clonar o repositório)
- Em Debian/Ubuntu, caso faltem módulos do sistema para venv/pip:
```bash
sudo apt update
sudo apt install python3-venv python3-pip -y
```

## Passo a passo para executar (ambiente limpo)
1. Clonar o repositório e entrar na pasta do projeto:
```bash
git clone https://github.com/Raycacarvalho/calculadora
cd calculadora
```
2. Criar e ativar um ambiente virtual (recomendado):
```bash
python3 -m venv .venv
source .venv/bin/activate
```
3. Instalar dependências do backend:
```bash
pip install -r backend/requirements.txt
```
4. Iniciar o backend (Flask):
```bash
python backend/app.py
```
O servidor Flask padrão roda em `http://127.0.0.1:5000`.

5. Servir o frontend (duas opções):
- Abrir `index.html` diretamente no navegador (funciona, mas algumas configurações de CORS podem bloquear requests).
- Servir via um servidor HTTP simples (recomendado):
```bash
cd calculadora
python3 -m http.server 8000
# abra http://127.0.0.1:8000 no navegador
```

> Observação: se a porta `8000` estiver em uso, escolha outra porta (por exemplo `8001`).

## Testes rápidos
- Testar o endpoint diretamente com `curl`:
```bash
curl -s -X POST http://127.0.0.1:5000/calcular \
  -H "Content-Type: application/json" \
  -d '{"num1":10,"num2":5,"operacao":"+"}'
```

Resposta esperada:
```json
{"resultado": 15.0}
```

## Erros comuns e soluções
- `ERR_CONNECTION_REFUSED` ao abrir `http://127.0.0.1:5000/`: o backend só define `POST /calcular`. A raiz `/` retorna 404 — use o endpoint correto ou abra o frontend.
- Problema ao criar venv (`ensurepip` ausente): instale `python3-venv` via apt (veja Pré-requisitos).
- Módulo `pip` ausente: instale `python3-pip`.

## Parar os servidores
- No terminal onde o Flask ou `http.server` está rodando, pressione `Ctrl+C`.

## Opções adicionais
- Se preferir, crie um script `run.sh` para automatizar (não incluído por padrão).

## Endpoint e uso (resumo técnico)
- `POST /calcular` — corpo JSON: `{ "num1": <n>, "num2": <n>, "operacao": "+"|"-"|"*"|"/"|"^" }`.
- Respostas de erro retornam `400` com `{ "erro": "mensagem" }`.

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
- **Tipo de nuvem:** pública
- **Modelo de serviço:** PaaS (Platform as a Service)

**Justificativa:** a nuvem pública facilita o acesso aos recursos necessários para o funcionamento do sistema sem exigir a criação e manutenção de infraestrutura própria, além de permitir ampliar os recursos conforme a necessidade do projeto. O modelo PaaS foi escolhido por oferecer um ambiente pronto para desenvolver, executar e hospedar a aplicação, permitindo que a equipe se concentre no desenvolvimento do sistema sem se preocupar com a configuração e manutenção de servidores. Detalhes em [`docs/nuvem.md`](docs/nuvem.md).

## Ciclo DevOps aplicado
- **Plan:** planejamento das funcionalidades da calculadora e divisão de atividades entre os integrantes.
- **Code:** desenvolvimento do frontend (HTML/CSS/JS) e backend (Python/Flask), organizados em arquivos e pastas dedicados.
- **Build:** integração entre frontend e backend, com dependências registradas em `backend/requirements.txt`.
- **Test:** testes das operações da calculadora e da comunicação entre frontend e backend.
- **Release:** commits e branches (`feature/*` → `dev` → `main`) usados para organizar e registrar o desenvolvimento das funcionalidades.
- **Deploy:** código armazenado no GitHub, disponibilizando a versão desenvolvida para a equipe.
- **Operate:** a equipe segue realizando alterações, correções e melhorias com o mesmo fluxo de branches e commits.
- **Monitor:** o histórico de commits e branches no GitHub permite acompanhar a evolução do projeto.

Detalhes em [`docs/devops.md`](docs/devops.md).

## Equipe
| Integrante | Papel |
|---|---|
| Giovane | Tech Lead |
| Rayca | Desenvolvedora Backend |
| Beatriz | Desenvolvedora Frontend |
| Jordana | DevOps/Cloud 1 |
| Alexsander | DevOps/Cloud 2 |

---
Arquivo atualizado com instruções de execução e solução de problemas.