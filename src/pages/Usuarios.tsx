import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { userService, UserProfile } from '../services/userService';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Search, Shield, User, Mail, Trash2, Edit2, CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

/**
 * PÁGINA DE GESTÃO DE USUÁRIOS
 * 
 * FUNÇÃO: Dashboard administrativo para controle total sobre os membros da plataforma.
 */
export function Usuarios() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  const [newUser, setNewUser] = useState<Omit<UserProfile, 'id' | 'created_at'>>({
    full_name: '',
    email: '',
    role: 'student',
    status: 'active',
    avatar_url: ''
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError('Erro ao carregar lista de usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.createUser(newUser);
      setIsAdding(false);
      loadUsers();
    } catch (err: any) {
      setError('Erro ao cadastrar novo usuário.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja remover este usuário permanentemente?')) return;
    try {
      await userService.deleteUser(id);
      loadUsers();
    } catch (err) {
      setError('Erro ao deletar usuário.');
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout 
      title="Usuários SHF"
      headerAction={
        <Button onClick={() => setIsAdding(true)} className="bg-emerald-600 gap-2">
          <UserPlus size={16} /> Novo Membro
        </Button>
      }
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <AnimatePresence>
          {isAdding && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold">Cadastrar Novo Membro</h3>
                  <button type="button" onClick={() => setIsAdding(false)}><X size={20} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Nome Completo" className="bg-black border border-zinc-800 rounded-lg p-2.5 text-sm" value={newUser.full_name} onChange={e => setNewUser({...newUser, full_name: e.target.value})} required />
                  <input placeholder="E-mail Funcional" type="email" className="bg-black border border-zinc-800 rounded-lg p-2.5 text-sm" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
                  <select className="bg-black border border-zinc-800 rounded-lg p-2.5 text-sm" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as any})}>
                    <option value="student">Aluno</option>
                    <option value="instructor">Instrutor</option>
                    <option value="admin">Administrador</option>
                  </select>
                  <select className="bg-black border border-zinc-800 rounded-lg p-2.5 text-sm" value={newUser.status} onChange={e => setNewUser({...newUser, status: e.target.value as any})}>
                    <option value="active">Ativo</option>
                    <option value="pending">Pendente</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-emerald-600">Salvar no Banco</Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex bg-zinc-900/30 p-4 rounded-xl border border-zinc-800">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input placeholder="Filtrar por nome ou e-mail..." className="w-full bg-black border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="overflow-hidden border border-zinc-900 rounded-2xl">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 border-b border-zinc-900">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Membro</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Cargo</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-900/20 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white uppercase">{user.full_name[0]}</div>
                    <div>
                      <div className="text-sm font-bold text-white">{user.full_name}</div>
                      <div className="text-xs text-zinc-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs capitalize px-2 py-1 bg-zinc-800 rounded text-zinc-400">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${user.status === 'active' ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500 bg-zinc-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(user.id!)} className="p-2 text-zinc-500 hover:text-red-400"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
