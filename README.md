# Compre Facil

## Descricao executiva

Compre Facil e um aplicativo mobile desenvolvido com Expo e React Native para organizacao de listas de compras por setores. O projeto oferece uma experiencia objetiva para registrar produtos, classifica-los automaticamente em categorias de supermercado, controlar quantidades, marcar itens ja coletados e acompanhar o progresso geral da compra.

O app foi estruturado como uma aplicacao React Native de tela unica, com navegacao interna controlada por estado local, interface responsiva para dispositivos moveis e configuracao padrao do Expo para execucao em Android, iOS e Web.

## Objetivos do projeto

- Facilitar a organizacao de compras por setores do mercado.
- Reduzir esquecimentos durante a compra por meio de checklist visual.
- Permitir inclusao rapida de itens em uma barra fixa de entrada.
- Direcionar automaticamente produtos para setores com base em palavras-chave.
- Apresentar um resumo consolidado com progresso dos itens coletados.

## Principais funcionalidades

- Menu de setores com categorias predefinidas: Hortifruti, Limpeza, Casa, Mercearia e Carnes.
- Cadastro de novos produtos pela barra inferior fixa.
- Classificacao automatica de itens por setor usando regras locais de palavras-chave.
- Visualizacao de produtos filtrados pelo setor selecionado.
- Controle de quantidade com acoes de incremento e decremento.
- Remocao automatica de item quando a quantidade chega a zero.
- Marcacao de produtos como coletados.
- Resumo geral da compra agrupado por setor.
- Indicador de progresso total com quantidade de volumes coletados.
- Layout mobile com `SafeAreaView`, `KeyboardAvoidingView`, `FlatList` e `ScrollView`.

## Tecnologias utilizadas

As tecnologias abaixo foram identificadas exclusivamente nos arquivos do projeto.

| Categoria | Tecnologia |
| --- | --- |
| Linguagem | JavaScript |
| Framework principal | React Native |
| Plataforma de desenvolvimento | Expo |
| Biblioteca de UI nativa | React Native |
| Gerenciamento de estado | React Hooks (`useState`) |
| Entrada da aplicacao | `expo` com `registerRootComponent` |
| Assets | PNG para icone, splash, favicon e adaptive icon |
| Gerenciador de pacotes | npm |

### Dependencias declaradas

| Dependencia | Versao | Observacao |
| --- | --- | --- |
| `expo` | `~54.0.35` | Plataforma de execucao e desenvolvimento |
| `expo-status-bar` | `~3.0.9` | Declarada no `package.json` |
| `react` | `19.1.0` | Base da interface declarativa |
| `react-native` | `0.81.5` | Componentes nativos e APIs mobile |
| `@expo/vector-icons` | `^15.0.3` | Declarada no `package.json` |
| `react-native-paper` | `4.9.2` | Declarada no `package.json` |

## Arquitetura e estrutura do projeto

```text
compre-facil/
|-- App.js
|-- app.json
|-- index.js
|-- package.json
|-- README.md
|-- .gitignore
|-- assets/
|   |-- adaptive-icon.png
|   |-- favicon.png
|   |-- icon.png
|   |-- snack-icon.png
|   `-- splash-icon.png
`-- components/
    `-- AssetExample.js
```

### Descricao dos principais arquivos

- `App.js`: arquivo principal da aplicacao. Contem a interface, estados, regras de classificacao automatica, cadastro de produtos, controle de quantidade, checklist e resumo da compra.
- `index.js`: registra o componente raiz com `registerRootComponent` do Expo.
- `app.json`: define metadados e configuracoes do Expo, incluindo nome, slug, versao, icones, splash screen, orientacao e configuracoes para Android, iOS e Web.
- `package.json`: declara scripts npm e dependencias do projeto.
- `assets/`: contem imagens utilizadas pela configuracao do Expo.
- `components/AssetExample.js`: componente de exemplo gerado pelo ambiente Snack/Expo, atualmente separado do fluxo principal do app.

## Instalacao

### Pre-requisitos

- Node.js instalado.
- npm instalado.
- Expo CLI disponivel via `npx expo`.
- Aplicativo Expo Go instalado no dispositivo fisico, caso deseje testar no celular.

### Passos

```bash
git clone https://github.com/luisvfernando7-a11y/Compre-Facil.git
cd Compre-Facil
npm install
```

## Como executar localmente

Inicie o servidor de desenvolvimento do Expo:

```bash
npm start
```

Tambem e possivel usar diretamente:

```bash
npx expo start
```

## Como executar utilizando Expo

Com o servidor iniciado, o Expo exibira um QR Code no terminal ou na interface de desenvolvimento.

### Em dispositivo fisico

1. Instale o Expo Go no Android ou iOS.
2. Execute:

```bash
npm start
```

3. Escaneie o QR Code exibido pelo Expo.

### Em emulador Android

```bash
npm run android
```

### Em simulador iOS

```bash
npm run ios
```

Observacao: a execucao em iOS exige ambiente compativel com macOS e simulador iOS configurado.

### Em ambiente Web

```bash
npm run web
```

## Como gerar build

Para gerar uma exportacao do projeto com Expo:

```bash
npx expo export
```

O comando gera os arquivos de distribuicao no diretorio `dist/`, que ja esta configurado no `.gitignore`.

Para builds nativos de Android e iOS destinados a lojas de aplicativos, o projeto deve receber uma configuracao especifica de build nativo. No estado atual do codigo, nao ha arquivos de configuracao de build nativo ou EAS declarados no repositorio.

## Diferenciais tecnicos

- Classificacao automatica de produtos por setor com regras locais simples e extensivel.
- Interface orientada a fluxo real de compra: setores, itens e resumo.
- Uso de componentes nativos do React Native para compatibilidade mobile.
- Controle de estado local com React Hooks, sem complexidade desnecessaria para o escopo atual.
- Configuracao Expo com suporte a Android, iOS, Web, splash screen, adaptive icon e orientacao portrait.
- Estrutura simples, adequada para evolucao incremental e manutencao por novos desenvolvedores.

## Possiveis melhorias futuras

- Persistir a lista de compras localmente para manter dados apos fechar o aplicativo.
- Implementar cadastro, edicao e remocao de setores personalizados.
- Adicionar exclusao direta de produtos.
- Corrigir a codificacao dos textos com acentos e emojis exibidos no codigo-fonte.
- Remover dependencias declaradas que nao estejam em uso ou integra-las de fato a interface.
- Adicionar testes automatizados para regras de classificacao e manipulacao de itens.
- Configurar pipeline de qualidade com lint, formatacao e validacao antes de commits.
- Criar configuracao de build nativo para publicacao em lojas.

## Licenca

Este projeto esta licenciado sob a licenca `0BSD`, conforme declarado no arquivo `package.json`.

## Creditos do desenvolvedor

Desenvolvido por Luis V. Fernando.

Repositorio: [Compre-Facil](https://github.com/luisvfernando7-a11y/Compre-Facil)
