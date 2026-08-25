# 💰 PocketFinance

Aplicativo mobile de controle financeiro pessoal para Android e iOS, desenvolvido com React Native e Expo. Gerencie suas receitas, despesas e acompanhe seu saldo em tempo real.

---

## 📋 Sumário

- [Características](#características)
- [Tech Stack](#tech-stack)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Autor](#autor)

---

## ✨ Características

### 💳 Gestão de Movimentações
- ✅ Cadastro de receitas
- ✅ Cadastro de despesas
- ✅ Categorização automática
- ✅ Data e hora de cada transação
- ✅ Descrição detalhada

### 📊 Análise Financeira
- ✅ Visualização por mês e ano
- ✅ Cálculo automático de saldos
- ✅ Gráficos e estatísticas
- ✅ Histórico completo
- ✅ Filtros avançados

### 👤 Gerenciamento de Usuário
- ✅ Cadastro de usuários
- ✅ Perfil personalizado
- ✅ Sincronização de dados
- ✅ Backup automático

### 📱 Interface Mobile
- ✅ Design responsivo
- ✅ Navegação intuitiva
- ✅ Temas personalizáveis
- ✅ Notificações push

---

## 🛠 Tech Stack

### Frontend Mobile
```
React Native v0.81.5
Expo v54.0.36
TypeScript
Expo Router v6.0.24
React Navigation v7.1.8
```

### Plataformas Suportadas
- 📱 **iOS** - via Expo
- 🤖 **Android** - via Expo
- 🌐 **Web** - via Expo Web

### Dependências Principais
- `expo` - Framework para React Native
- `react-native` - Framework mobile
- `@react-navigation` - Roteamento
- `@expo/vector-icons` - Ícones
- `react-native-reanimated` - Animações

---

## 📦 Instalação

### Pré-requisitos
- Node.js v18+ ou superior
- npm ou yarn
- Expo CLI (opcional, mas recomendado)
- Emulador Android ou Simulador iOS (opcional)

### Clone o repositório
```bash
git clone https://github.com/larissaRgj/pocketfinance.git
cd pocketfinance
```

### Instale as dependências
```bash
npm install
# ou
yarn install
```

### Inicie a aplicação

**Modo desenvolvimento**
```bash
npm start
# ou
expo start
```

**Android**
```bash
npm run android
# ou
expo run:android
```

**iOS**
```bash
npm run ios
# ou
expo run:ios
```

**Web**
```bash
npm run web
# ou
expo start --web
```

---

## 🚀 Como Usar

### 1. Primeira Execução

```bash
npm install
npm start
```

Escanear o QR Code com o app Expo Go no seu celular, ou:
- Pressione `i` para iOS Simulator
- Pressione `a` para Android Emulator
- Pressione `w` para Web

### 2. Principais Funcionalidades

#### Cadastro de Receita
1. Na tela inicial, clique em "Adicionar Receita"
2. Preencha:
   - Valor
   - Descrição
   - Categoria
   - Data
3. Clique em "Salvar"

#### Cadastro de Despesa
1. Na tela inicial, clique em "Adicionar Despesa"
2. Preencha:
   - Valor
   - Descrição
   - Categoria
   - Data
3. Clique em "Salvar"

#### Visualizar Saldo
- Saldo atual aparece na tela principal
- Atualiza automaticamente ao adicionar movimentações

#### Histórico por Período
1. Navegue até "Histórico"
2. Selecione mês e ano desejados
3. Visualize todas as transações do período

---

## 📁 Estrutura do Projeto

```
pocketfinance/
├── app/
│   ├── (tabs)/              # Abas principais da aplicação
│   │   ├── index.tsx       # Tela inicial
│   │   ├── add-income.tsx  # Adicionar receita
│   │   ├── add-expense.tsx # Adicionar despesa
│   │   └── history.tsx     # Histórico
│   ├── _layout.tsx         # Layout raiz
│   └── ...
├── components/              # Componentes reutilizáveis
│   ├── TransactionCard.tsx
│   ├── Chart.tsx
│   └── ...
├── hooks/                   # Custom hooks
├── context/                 # Context API
├── utils/                   # Funções auxiliares
│   ├── storage.ts          # Persistência local
│   └── calculations.ts     # Cálculos financeiros
├── app.json               # Configurações Expo
├── package.json
└── tsconfig.json
```

---

## 🎯 Funcionalidades Principais

### 💵 Movimentações Financeiras
- Adicionar receitas e despesas
- Categorizar automaticamente
- Data e hora de cada transação
- Valores em tempo real

### 📈 Análise de Dados
- Visualização por período (mês/ano)
- Gráficos de receitas vs despesas
- Saldo acumulado
- Tendências de gastos

### 🔔 Notificações
- Alertas de movimentações
- Lembrete de orçamento
- Avisos de limite

### 💾 Persistência
- Armazenamento local seguro
- Sincronização automática
- Backup de dados

---

## 🧪 Testes

```bash
# Lint do código
npm run lint

# Executar testes (quando configurados)
npm test
```

---

## 📱 Plataformas e Versões

### iOS
- iOS 14.0+
- Suporta iPhone e iPad

### Android
- Android 8.0+
- API Level 26+

### Web
- Chrome, Firefox, Safari
- Responsivo para desktop e tablet

---

## 🎨 Personalização

### Temas
Editar em `utils/theme.ts`:
```typescript
const theme = {
  primary: '#6366f1',      // Cor primária
  success: '#10b981',      // Sucesso (receita)
  danger: '#ef4444',       // Perigo (despesa)
  background: '#f3f4f6',   // Fundo
};
```

### Categorias
Editar em `utils/categories.ts`:
```typescript
const categories = {
  income: ['Salário', 'Freelance', 'Investimentos', ...],
  expense: ['Alimentação', 'Transporte', 'Saúde', ...],
};
```

---

## 🔐 Segurança

- ✅ Dados armazenados localmente
- ✅ Sem envio a servidores externos
- ✅ Autenticação opcional
- ✅ Criptografia de dados sensíveis (futuro)

---

## 🐛 Troubleshooting

### Problema: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install
```

### Problema: "Expo not found"
```bash
# Instalar Expo CLI globalmente
npm install -g expo-cli
```

### Problema: Aplicativo não abre
```bash
# Resetar projeto
npm run reset-project
npm start
```

### Problema: Cache do Expo
```bash
# Limpar cache
npx expo start --clear
```

---

## 🎯 Funcionalidades Futuras

- [ ] Autenticação com Firebase
- [ ] Sincronização em nuvem
- [ ] Múltiplas contas/carteiras
- [ ] Metas de orçamento
- [ ] Relatórios PDF
- [ ] Exportação de dados
- [ ] Integração com banco de dados
- [ ] Dark Mode
- [ ] Widgets na home screen

---

## 📞 Teste o App

Você pode testar ou baixar o aplicativo através do link:
[Acessar PocketFinance no Expo](https://expo.dev/accounts/larissargj/projects/pocketfinance/builds/)

Ou escaneie o QR Code com a câmera do seu celular para baixar via Expo Go.

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

**Larissa Rodrigues Guimarães**
- GitHub: [@larissaRgj](https://github.com/larissaRgj)
- LinkedIn: [Larissa Guimarães](https://www.linkedin.com/in/larissa-guimaraes-b30489334)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Como contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NewFeature`)
3. Commit suas mudanças (`git commit -m 'Add NewFeature'`)
4. Push para a branch (`git push origin feature/NewFeature`)
5. Abra um Pull Request

---

## 💡 Dicas de Desenvolvimento

- Use Expo Go para testar rápido no device
- React Native Debugger para debugging
- Expo Snack para prototipagem rápida
- Mantenha componentes pequenos e reutilizáveis
- Use TypeScript para melhor DX

---

## 📚 Recursos Úteis

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)

---

**Desenvolvido com ❤️ e ☕ por Larissa Rodrigues**