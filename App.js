import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function App() {
  // Mantendo os setores fiéis ao seu mockup e adicionando os essenciais
  const [topicos] = useState([
    { id: 'HORTIFRUTI', nome: 'HORTIFRUTI', icone: '🍎' },
    { id: 'LIMPEZA', nome: 'LIMPEZA', icone: '🧼' },
    { id: 'CASA', nome: 'CASA', icone: '🏠' },
    { id: 'MERCEARIA', nome: 'MERCEARIA', icone: '📦' },
    { id: 'CARNES', nome: 'CARNES', icone: '🥩' },
  ]);

  // Controle de Navegação: 'MENU', 'ITENS' ou 'RESUMO'
  const [telaAtiva, setTelaAtiva] = useState('MENU');
  const [topicoAtivoId, setTopicoAtivoId] = useState('HORTIFRUTI');
  
  const [produtos, setProdutos] = useState([]);
  const [novoItemTexto, setNovoItemTexto] = useState('');

  const categoriaAtual = topicos.find(t => t.id === topicoAtivoId);

  // --- DIRECIONAMENTO INTELIGENTE ---
  const mapearSetorAutomatico = (texto) => {
    const termo = texto.toLowerCase().trim();
    
    const regras = {
      HORTIFRUTI: ['banana', 'maçã', 'maca', 'uva', 'alface', 'tomate', 'cebola', 'batata', 'fruta', 'legume', 'laranja', 'limão', 'limao', 'cenoura'],
      LIMPEZA: ['detergente', 'sabão', 'sabao', 'amaciante', 'desinfetante', 'cloro', 'esponja', 'vassoura', 'rodo'],
      CASA: ['lâmpada', 'lampada', 'pano', 'copo', 'prato', 'talher', 'pilha', 'vela', 'fósforo'],
      MERCEARIA: ['arroz', 'feijão', 'feijao', 'macarrão', 'óleo', 'sal', 'açúcar', 'café', 'biscoito'],
      CARNES: ['carne', 'frango', 'peixe', 'bife', 'linguiça', 'salsicha']
    };

    for (const [setor, palavras] of Object.entries(regras)) {
      if (palavras.some(palavra => termo.includes(palavra))) {
        return setor;
      }
    }
    return topicoAtivoId; 
  };

  const adicionarProduto = () => {
    if (!novoItemTexto.trim()) return;

    const setorDestino = mapearSetorAutomatico(novoItemTexto);
    const novoProduto = {
      id: Date.now().toString(),
      nome: novoItemTexto.trim().toUpperCase(),
      setor: setorDestino,
      quantidade: 1,
      pego: false,
    };

    setProdutos([...produtos, novoProduto]);
    setNovoItemTexto('');
    setTopicoAtivoId(setorDestino);
    setTelaAtiva('ITENS');
  };

  const alternarCheckItem = (id) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, pego: !p.pego } : p));
  };

  const alterarQuantidade = (id, operacao) => {
    setProdutos(produtos.map(p => {
      if (p.id === id) {
        let novaQtd = p.quantidade + (operacao === '+' ? 1 : -1);
        return { ...p, quantidade: novaQtd };
      }
      return p;
    }).filter(p => p.quantidade > 0));
  };

  const produtosExibidos = produtos.filter(p => p.setor === topicoAtivoId);
  const totalGeralItens = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const totalGeralPegos = produtos.filter(p => p.pego).reduce((acc, p) => acc + p.quantidade, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFBFB" />

      {/* Cabeçalho Principal Solto - Igual ao Canva */}
      <View style={styles.headerGeral}>
        <Text style={styles.headerTituloGeral}>CONSUMO CONSCIENTE</Text>
      </View>

      {/* TELA 1: COMPRE FÁCIL (MENU DE SETORES) */}
      {telaAtiva === 'MENU' && (
        <View style={styles.telaEstrutura}>
          <View style={styles.colunaSimulada}>
            <View style={styles.cardTituloSetor}>
              <Text style={styles.textoCardTitulo}>COMPRE FÁCIL 🛒</Text>
            </View>

            <FlatList
              data={topicos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.botaoTopicoCanva}
                  onPress={() => {
                    setTopicoAtivoId(item.id);
                    setTelaAtiva('ITENS');
                  }}
                >
                  <Text style={styles.textoBotaoTopicoCanva}>
                    {item.nome} {item.icone}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listaEspacoInterno}
            />

            <View style={styles.botoesAcaoRodape}>
              <TouchableOpacity style={styles.botaoAcaoSecundario}>
                <Text style={styles.textoAcaoSecundario}>ADICIONAR TÓPICO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoAcaoSecundario}>
                <Text style={styles.textoAcaoSecundario}>EDITAR TÓPICO</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.botaoIrParaResumo} onPress={() => setTelaAtiva('RESUMO')}>
            <Text style={styles.textoBotaoIrParaResumo}>📋 VER RESUMO DA COMPRA</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* TELA 2: ITENS DO SETOR */}
      {telaAtiva === 'ITENS' && (
        <View style={styles.telaEstrutura}>
          <TouchableOpacity style={styles.botaoVoltarLayout} onPress={() => setTelaAtiva('MENU')}>
            <Text style={styles.textoBotaoVoltarLayout}>← Voltar para Setores</Text>
          </TouchableOpacity>

          <View style={styles.colunaSimulada}>
            <View style={styles.cardTituloSetor}>
              <Text style={styles.textoCardTitulo}>ITENS - {categoriaAtual?.nome}</Text>
            </View>

            <FlatList
              data={produtosExibidos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.linhaItemCanva}>
                  <TouchableOpacity style={styles.checkboxArea} onPress={() => alternarCheckItem(item.id)}>
                    <View style={[styles.caixaSelecao, item.pego && styles.caixaSelecaoMarcada]} />
                    <Text style={[styles.nomeProdutoTexto, item.pego && styles.nomeProdutoTextoPego]}>
                      {item.nome} ({item.quantidade}x)
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.botoesMaisMenosArea}>
                    <TouchableOpacity style={styles.botaoMaisMenos} onPress={() => alterarQuantidade(item.id, '-')}>
                      <Text style={styles.textoMaisMenos}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoMaisMenos} onPress={() => alterarQuantidade(item.id, '+')}>
                      <Text style={styles.textoMaisMenos}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.textoListaVazia}>Nenhum item cadastrado aqui.</Text>
              }
              contentContainerStyle={styles.listaEspacoInterno}
            />

            <View style={styles.botoesAcaoRodape}>
              <View style={styles.botaoAcaoPrincipalFalso}>
                <Text style={styles.textoAcaoPrincipalFalso}>ADICIONAR ITEM</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.botaoIrParaResumo} onPress={() => setTelaAtiva('RESUMO')}>
            <Text style={styles.textoBotaoIrParaResumo}>📋 VER RESUMO DA COMPRA</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* TELA 3: RESUMO GERAL DA COMPRA */}
      {telaAtiva === 'RESUMO' && (
        <View style={styles.telaEstrutura}>
          <TouchableOpacity style={styles.botaoVoltarLayout} onPress={() => setTelaAtiva('MENU')}>
            <Text style={styles.textoBotaoVoltarLayout}>← Voltar para Menu</Text>
          </TouchableOpacity>

          <View style={styles.cardTituloSetor}>
            <Text style={styles.textoCardTitulo}>📋 RESUMO GERAL DA COMPRA</Text>
          </View>

          <View style={styles.cardProgressoBranco}>
            <Text style={styles.textoProgressoBranco}>
              Progresso Total: <Text style={styles.negritoVerde}>{totalGeralPegos} de {totalGeralItens}</Text> volumes pegos
            </Text>
          </View>

          <ScrollView style={styles.scrollResumo} showsVerticalScrollIndicator={false}>
            {topicos.map(topico => {
              const itensDoSetor = produtos.filter(p => p.setor === topico.id);
              if (itensDoSetor.length === 0) return null;

              return (
                <View key={topico.id} style={styles.blocoCategoriaResumo}>
                  <Text style={styles.tituloCategoriaResumo}>{topico.icone} {topico.nome}</Text>
                  {itensDoSetor.map(item => (
                    <View key={item.id} style={styles.linhaResumoItem}>
                      <Text style={[styles.textoItemResumoNome, item.pego && styles.textoItemResumoNomePego]}>
                        {item.pego ? '✅ ' : '⬜ '} {item.nome}
                      </Text>
                      <Text style={styles.textoItemResumoQtd}>Qtd: {item.quantidade}</Text>
                    </View>
                  ))}
                </View>
              );
            })}

            {produtos.length === 0 && (
              <Text style={styles.textoListaVazia}>Sua lista inteira está vazia atualmente. 🌱</Text>
            )}
          </ScrollView>
        </View>
      )}

      {/* BARRA DE INPUT FIXA INFERIOR */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.barraFormulario}
      >
        <TextInput
          style={styles.inputTexto}
          placeholder="Digite o item aqui..."
          placeholderTextColor="#8A9E96"
          value={novoItemTexto}
          onChangeText={setNovoItemTexto}
          onSubmitEditing={adicionarProduto}
        />
        <TouchableOpacity style={styles.botaoInserirLista} onPress={adicionarProduto}>
          <Text style={styles.textoBotaoInserir}>INSERIR NA LISTA</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFB', 
  },
  headerGeral: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: '#FAFBFB',
  },
  headerTituloGeral: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.5,
  },
  telaEstrutura: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  botaoVoltarLayout: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  textoBotaoVoltarLayout: {
    color: '#46685B',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Estrutura das Caixas / Colunas do Canva
  colunaSimulada: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#46685B',
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardTituloSetor: {
    backgroundColor: '#46685B',
    paddingVertical: 14,
    alignItems: 'center',
  },
  textoCardTitulo: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  listaEspacoInterno: {
    padding: 16,
  },

  // Botões de Tópicos / Setores (Estilo Canva)
  botaoTopicoCanva: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#46685B',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textoBotaoTopicoCanva: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#46685B',
  },

  // Rodapé das Caixas
  botoesAcaoRodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#E2ECE9',
    backgroundColor: '#FFF',
  },
  botaoAcaoSecundario: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#46685B',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  textoAcaoSecundario: {
    fontSize: 11,
    color: '#46685B',
    fontWeight: 'bold',
  },

  // Componentes dos Itens
  linhaItemCanva: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E2ECE9',
  },
  checkboxArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  caixaSelecao: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#46685B',
    borderRadius: 2,
    marginRight: 12,
  },
  caixaSelecaoMarcada: {
    backgroundColor: '#46685B',
  },
  nomeProdutoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334E44',
  },
  nomeProdutoTextoPego: {
    textDecorationLine: 'line-through',
    color: '#9CB0A9',
  },
  botoesMaisMenosArea: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoMaisMenos: {
    paddingHorizontal: 6,
  },
  textoMaisMenos: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#46685B',
  },
  botaoAcaoPrincipalFalso: {
    backgroundColor: '#46685B',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  textoAcaoPrincipalFalso: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Estilos da Tela de Resumo
  cardProgressoBranco: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2ECE9',
    borderRadius: 8,
    padding: 14,
    marginVertical: 12,
    alignItems: 'center',
  },
  textoProgressoBranco: {
    fontSize: 14,
    color: '#334E44',
    fontWeight: '500',
  },
  negritoVerde: {
    color: '#46685B',
    fontWeight: 'bold',
  },
  scrollResumo: {
    flex: 1,
  },
  blocoCategoriaResumo: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2ECE9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  tituloCategoriaResumo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#46685B',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F7F4',
    paddingBottom: 6,
    marginBottom: 10,
  },
  linhaResumoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  textoItemResumoNome: {
    fontSize: 13,
    color: '#334E44',
  },
  textoItemResumoNomePego: {
    color: '#9CB0A9',
    textDecorationLine: 'line-through',
  },
  textoItemResumoQtd: {
    fontSize: 13,
    color: '#6A847B',
    fontWeight: 'bold',
  },

  // Botão de navegação inferior para o resumo
  botaoIrParaResumo: {
    backgroundColor: '#E2ECE9',
    borderWidth: 1,
    borderColor: '#46685B',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 4,
  },
  textoBotaoIrParaResumo: {
    fontSize: 13,
    color: '#46685B',
    fontWeight: 'bold',
  },

  // Input Fixo na Base do App
  barraFormulario: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E2ECE9',
    gap: 10,
  },
  inputTexto: {
    borderWidth: 1,
    borderColor: '#46685B',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#334E44',
    backgroundColor: '#FAFBFB',
  },
  botaoInserirLista: {
    backgroundColor: '#46685B',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotaoInserir: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  textoListaVazia: {
    textAlign: 'center',
    color: '#9CB0A9',
    fontSize: 13,
    marginTop: 20,
  },
});