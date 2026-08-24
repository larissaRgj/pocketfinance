import { useState } from 'react';

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string; // Formato DD/MM/AAAA
}

export interface Usuario {
  nome: string;
  email: string;
  logado: boolean;
}

let usuarioGlobal: Usuario = { nome: '', email: '', logado: false };
let saldoInicialGlobal: number = 0;
let transacoesGlobais: Transacao[] = [];
let listeners: (() => void)[] = [];

export function useDadosFinanceiros() {
  const [usuario, setUsuario] = useState<Usuario>(usuarioGlobal);
  const [saldoInicial, setSaldoInicial] = useState<number>(saldoInicialGlobal);
  const [transacoes, setTransacoes] = useState<Transacao[]>(transacoesGlobais);

  const notificar = () => {
    setUsuario({ ...usuarioGlobal });
    setSaldoInicial(saldoInicialGlobal);
    setTransacoes([...transacoesGlobais]);
    listeners.forEach(l => l());
  };

  useState(() => {
    const listener = () => {
      setUsuario({ ...usuarioGlobal });
      setSaldoInicial(saldoInicialGlobal);
      setTransacoes([...transacoesGlobais]);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  });

  const fazerLogin = (nome: string, email: string) => {
    usuarioGlobal = { nome, email, logado: true };
    notificar();
  };

  const fazerLogout = () => {
    usuarioGlobal = { nome: '', email: '', logado: false };
    saldoInicialGlobal = 0;
    transacoesGlobais = [];
    notificar();
  };

  const atualizarPerfil = (nome: string, email: string) => {
    usuarioGlobal = { ...usuarioGlobal, nome, email };
    notificar();
  };

  const definirSaldoInicial = (valor: number) => {
    saldoInicialGlobal = valor;
    notificar();
  };

  const adicionarTransacao = (nova: Omit<Transacao, 'id'>) => {
    const itemComId = { ...nova, id: String(Date.now()) };
    transacoesGlobais = [itemComId, ...transacoesGlobais];
    notificar();
  };

  const excluirTransacao = (id: string) => {
    transacoesGlobais = transacoesGlobais.filter(t => t.id !== id);
    notificar();
  };

  // Cálculo eletrônico automático geral
  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  const saldoTotal = saldoInicial + totalReceitas - totalDespesas;

  return {
    usuario,
    saldoInicial,
    transacoes,
    fazerLogin,
    fazerLogout,
    atualizarPerfil,
    definirSaldoInicial,
    adicionarTransacao,
    excluirTransacao,
    totalReceitas,
    totalDespesas,
    saldoTotal,
  };
}