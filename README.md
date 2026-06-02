# Será que Vale?

Dashboard interativo para consulta dos gastos parlamentares dos deputados federais brasileiros com dinheiro público.

## Sobre o Projeto

O **Será que Vale?** permite que qualquer cidadão pesquise um deputado federal e visualize de forma clara como o dinheiro público está sendo gasto. O projeto nasceu da ideia de tornar dados governamentais acessíveis e compreensíveis para todos.

## Funcionalidades

- Busca com autocomplete de todos os 513 deputados federais em exercício
- Perfil do deputado com foto, partido, UF e legislatura atual
- Filtro de período: ano atual, últimos 2 anos ou todos os mandatos
- Gráfico de barras com os gastos por categoria
- Gráfico de linha com a evolução dos gastos mês a mês
- Cards de resumo: total gasto, mês mais caro e número de registros
- Contador ao vivo estimando os gastos dos deputados em 2026
- Tema claro e escuro com as cores da bandeira brasileira

## Fontes de Dados

### API da Câmara dos Deputados
- **URL:** https://dadosabertos.camara.leg.br/swagger/api.html
- **Licença:** Dados Abertos do Governo Federal
- **Endpoints utilizados:**
  - `GET /deputados` — lista todos os deputados em exercício
  - `GET /deputados/{id}/despesas` — despesas de um deputado por ano

Todos os dados de gastos são oficiais, públicos e fornecidos diretamente pela Câmara dos Deputados. Nenhum dado é fabricado ou estimado, exceto o contador da página inicial que usa a média histórica como base de cálculo.

## Stack

- **Frontend:** React + TypeScript + Vite
- **Gráficos:** Chart.js + React-Chartjs-2
- **Roteamento:** React Router DOM
- **Ícones:** Lucide React
- **Deploy:** Vercel

## Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/RafaVPDev/sera-que-vale.git

# Entre na pasta
cd sera-que-vale

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```
