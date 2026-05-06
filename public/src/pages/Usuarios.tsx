/**
 * PÁGINA DE GESTÃO DE USUÁRIOS (Users Page)
 * 
 * FUNÇÃO: Esta página fornece uma interface administrativa para visualizar, buscar e gerenciar membros.
 * Ela exibe uma tabela com informações de perfil, role (cargo), status de ativação e registro de acesso.
 * 
 * COMPONENTES PRINCIPAIS:
 * - Filtro de Busca: Filtra a lista localmente por nome ou email para alta performance.
 * - Tabela dinâmica: Renderiza cada membro com ícones indicativos de status.
 * - AnimatePresence: Usado para transições suaves quando os dados carregam ou mudam.
 */
import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { UserPlus, Search, Shield, User, Mail, Calendar, Trash2, Edit2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { userService, UserProfile } from '../services/userService';
import { Button } from '../components/ui/Button';

export function Usuarios() {
  /**
   * ESTADO (State)
   * users: Lista completa vinda do banco.
   * loading: Controla o esqueleto de carregamento (spinner).
   * searchTerm: Armazena o que o usuário digita na busca.
   */
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [error, setError] = useState('');

  // Carrega os dados assim que o componente é montado na tela.
  useEffect(() => {
    loadUsers();
  }, []);

  /**
   * FUNÇÃO: loadUsers
   * Dispara o pedido ao userService para buscar os dados no Supabase.
   * Se houver falha na rede ou permissão, o erro será exibido via console/alerta.
   */
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError('Falha ao conectar com o banco de dados. Verifique sua conexão ou permissões.');
      console.error('Erro ao carregar usuários:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * LÓGICA DE FILTRAGEM:
   * Filtramos a lista 'users' em tempo real conforme o 'searchTerm'.
   * Isso evita chamadas desnecessárias ao banco de dados enquanto você digita.
   */
  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout 
      title="Gestão de Usuários"
      headerAction={
        <Button 
          size="sm" 
          className="bg-emerald-600 hover:bg-emerald-500 gap-2"
          onClick={() => setIsAddingMode(true)}
        >
          <UserPlus size={16} /> Adicionar Membro
        </Button>
      }
    >
      <div className="space-y-6">
        {/* EXIBIÇÃO DE ERRO: Caso algo dê errado na comunicação via API */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* CAMPO DE BUSCA (Search Box) */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-600 text-white"
            />
          </div>
          {/* INDICADORES RÁPIDOS: Resumo visual dos usuários em tempo real */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/50 rounded-full border border-zinc-700">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {users.filter(u => u.status === 'active').length} Ativos
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/50 rounded-full border border-zinc-700">
              <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" /> {users.length} Total
            </span>
          </div>
        </div>

        {/* TABELA DE MEMBROS (Users Table) */}
        <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-950/50">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Membro</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Função / Role</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Acesso</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <AnimatePresence>
                  {loading ? (
                    // LOADING STATE: Spinner circular centralizado
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <div className="inline-block w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    // EMPTY STATE: Mensagem amigável quando nenhum dado bate com o filtro
                    <tr>
                      <td colSpan={5} className="py-20 text-center text-zinc-600 text-sm italic">
                        Nenhum membro encontrado com os critérios de busca.
                      </td>
                    </tr>
                  ) : filteredUsers.map((user, idx) => (
                    // USER ROW: Linha animada para cada usuário
                    <motion.tr 
                      key={user.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-zinc-900/40 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {/* AVATAR: Usa imagem do banco ou gera uma baseada nas iniciais do nome */}
                            <img 
                              src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=10b981&color=fff`} 
                              alt={user.full_name}
                              className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                            />
                            {user.status === 'active' && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {user.full_name}
                            </div>
                            <div className="text-xs text-zinc-500 flex items-center gap-1">
                              <Mail size={10} /> {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/* ROLE LABEL: Cores diferentes para Administradores, Instrutores e Alunos */}
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${
                            user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 
                            user.role === 'instructor' ? 'bg-amber-500/10 text-amber-400' : 
                            'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {user.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                          </div>
                          <span className="text-xs font-medium capitalize text-zinc-300">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/* STATUS PIILL: Badge visual do status atual */}
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          user.status === 'active' 
                            ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' 
                            : user.status === 'pending'
                            ? 'bg-amber-500/5 text-amber-500 border-amber-500/20'
                            : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                        }`}>
                          {user.status === 'active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-zinc-300">Recente</span>
                          <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                            <Calendar size={10} /> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* BOTÕES DE AÇÃO: Aparecem suavemente ao passar o mouse na linha (hover) */}
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-[10px] text-center text-zinc-600 uppercase tracking-widest py-4">
          Monitoramento e Gestão Centralizada • Software House Fortaleza
        </p>
      </div>
    </Layout>
  );
}
