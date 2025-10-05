import React, { useState, useEffect } from 'react';
import { User, Trophy, Star, Target, ShoppingCart, Users, Award, TrendingUp, Gift, LogOut, Calendar, Ticket } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  avatar: string;
  level: number;
  stars: number;
  xp: number;
  nextLevelXp: number;
  salesCount: number;
  avgTicket: number;
  achievements: string[];
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  type: 'sales' | 'ticket' | 'customer';
  target: number;
  current: number;
  completed: boolean;
}

const SwiftGamificationApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [employee, setEmployee] = useState<Employee>({
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@swift.com',
    position: 'Vendedor Sênior',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    level: 8,
    stars: 2450,
    xp: 1250,
    nextLevelXp: 1500,
    salesCount: 42,
    avgTicket: 125.30,
    achievements: ['Vendedor do Mês', 'Cliente Fiel', 'Especialista em Churrasco']
  });

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: 'Meta Diária de Vendas',
      description: 'Realize 15 vendas hoje',
      reward: 50,
      type: 'sales',
      target: 15,
      current: 8,
      completed: false
    },
    {
      id: 2,
      title: 'Ticket Médio Premium',
      description: 'Mantenha o ticket médio acima de R$ 150',
      reward: 75,
      type: 'ticket',
      target: 150,
      current: 125.30,
      completed: false
    },
    {
      id: 3,
      title: 'Atendimento 5 Estrelas',
      description: 'Receba 10 avaliações 5 estrelas dos clientes',
      reward: 100,
      type: 'customer',
      target: 10,
      current: 7,
      completed: false
    }
  ]);

  const [leaderboard] = useState([
    { name: 'Maria Santos', stars: 2890, sales: 58, position: 1 },
    { name: 'João Silva', stars: 2450, sales: 42, position: 2 },
    { name: 'Carlos Lima', stars: 2200, sales: 39, position: 3 },
    { name: 'Ana Costa', stars: 2100, sales: 35, position: 4 },
    { name: 'Pedro Oliveira', stars: 1950, sales: 31, position: 5 }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const completeChallenge = (id: number) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === id 
          ? { ...challenge, completed: true, current: challenge.target }
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
      setEmployee(prev => ({
        ...prev,
        stars: prev.stars + challenge.reward,
        xp: prev.xp + challenge.reward
      }));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Swift Champions</h1>
            <p className="text-gray-600">Plataforma de Gamificação</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="seu.email@swift.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              Entrar na Plataforma
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Primeira vez? Entre em contato com o seu gerente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Trophy className="w-8 h-8 text-red-600" />
              <h1 className="text-xl font-bold text-gray-800">Swift Champions</h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('challenges')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'challenges'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Desafios
              </button>
              <button
                onClick={() => setCurrentPage('ranking')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'ranking'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Ranking
              </button>
              <button
                onClick={() => setCurrentPage('rewards')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'rewards'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Recompensas
              </button>
              <button
                onClick={() => setCurrentPage('profile')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'profile'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Perfil
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-600">
                  {employee.stars.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard */}
        {currentPage === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Olá, {employee.name.split(' ')[0]}! 👋
                  </h2>
                  <p className="text-red-100">
                    Você está no nível {employee.level} com {employee.xp} XP
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{employee.stars}</div>
                  <div className="text-red-100">Estrelas</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Progresso para o próximo nível</span>
                  <span>{employee.xp} / {employee.nextLevelXp} XP</span>
                </div>
                <div className="w-full bg-red-700 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(employee.xp / employee.nextLevelXp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Vendas Este Mês</p>
                    <p className="text-2xl font-bold text-gray-800">{employee.salesCount}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ticket Médio</p>
                    <p className="text-2xl font-bold text-gray-800">
                      R$ {employee.avgTicket.toFixed(2)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Nível Atual</p>
                    <p className="text-2xl font-bold text-gray-800">{employee.level}</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conquistas</p>
                    <p className="text-2xl font-bold text-gray-800">{employee.achievements.length}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Active Challenges */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Desafios Ativos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {challenges.filter(c => !c.completed).map(challenge => (
                  <div key={challenge.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{challenge.title}</h4>
                      <div className="flex items-center space-x-1 text-yellow-600">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-semibold">{challenge.reward}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>
                          {challenge.type === 'ticket' ? `R$ ${challenge.current}` : challenge.current} / 
                          {challenge.type === 'ticket' ? ` R$ ${challenge.target}` : ` ${challenge.target}`}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Challenges Page */}
        {currentPage === 'challenges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Desafios</h2>
              <div className="text-sm text-gray-600">
                Complete desafios para ganhar estrelas e subir de nível!
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {challenges.map(challenge => (
                <div
                  key={challenge.id}
                  className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all ${
                    challenge.completed
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{challenge.description}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="flex items-center space-x-1 text-yellow-600 mb-2">
                        <Star className="w-5 h-5" />
                        <span className="font-bold">{challenge.reward}</span>
                      </div>
                      {challenge.completed && (
                        <span className="text-green-600 font-semibold text-sm">
                          Concluído!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>
                        {challenge.type === 'ticket' ? `R$ ${challenge.current}` : challenge.current} / 
                        {challenge.type === 'ticket' ? ` R$ ${challenge.target}` : ` ${challenge.target}`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          challenge.completed ? 'bg-green-500' : 'bg-red-600'
                        }`}
                        style={{ 
                          width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  {!challenge.completed && (
                    <button
                      onClick={() => completeChallenge(challenge.id)}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      Simular Conclusão
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ranking Page */}
        {currentPage === 'ranking' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Ranking de Vendedores</h2>
              <div className="text-sm text-gray-600">
                Ranking baseado em estrelas acumuladas este mês
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 bg-gray-50 border-b">
                <h3 className="font-semibold text-gray-800">Top 5 Vendedores</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {leaderboard.map((seller, index) => (
                  <div
                    key={index}
                    className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      seller.name === employee.name ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {seller.position}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-800">{seller.name}</h4>
                          {seller.name === employee.name && (
                            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                              Você
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {seller.sales} vendas realizadas
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-600 mb-1">
                        <Star className="w-4 h-4" />
                        <span className="font-bold">{seller.stars.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500">estrelas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rewards Page */}
        {currentPage === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Loja de Recompensas</h2>
              <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-600">
                  {employee.stars.toLocaleString()} estrelas disponíveis
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: 'Vale Alimentação R$ 50', cost: 500, description: 'Vale para usar no restaurante da empresa', available: true, category: 'voucher' },
                { id: 2, name: '1 Dia de Folga', cost: 800, description: 'Um dia adicional de descanso', available: true, category: 'vacation' },
                { id: 3, name: 'Cupom Swift R$ 50', cost: 600, description: 'Cupom para trocar por produtos na loja', available: true, category: 'coupon' },
                { id: 4, name: 'Kit Churrasco Premium', cost: 1200, description: 'Kit completo para churrasco em casa', available: true, category: 'product' },
                { id: 5, name: 'Vale Compras R$ 100', cost: 1000, description: 'Vale para compras na loja', available: true, category: 'voucher' },
                { id: 6, name: '2 Dias de Folga', cost: 1500, description: 'Dois dias adicionais de descanso', available: true, category: 'vacation' },
                { id: 7, name: 'Cupom Swift R$ 100', cost: 1100, description: 'Cupom para trocar por produtos na loja', available: true, category: 'coupon' },
                { id: 8, name: 'Curso de Especialização', cost: 1800, description: 'Curso profissionalizante', available: true, category: 'training' },
                { id: 9, name: '3 Dias de Folga', cost: 2200, description: 'Três dias adicionais de descanso', available: true, category: 'vacation' },
                { id: 10, name: 'Cupom Swift R$ 200', cost: 2000, description: 'Cupom para trocar por produtos na loja', available: true, category: 'coupon' },
                { id: 11, name: 'Smartphone', cost: 3000, description: 'Smartphone para uso pessoal', available: false, category: 'product' },
                { id: 12, name: '5 Dias de Folga', cost: 3500, description: 'Cinco dias adicionais de descanso', available: false, category: 'vacation' }
              ].map(reward => (
                <div
                  key={reward.id}
                  className={`bg-white rounded-xl shadow-sm p-6 border transition-all ${
                    reward.available && employee.stars >= reward.cost
                      ? 'border-green-300 hover:border-green-400'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    {reward.category === 'vacation' ? (
                      <Calendar className="w-8 h-8 text-blue-600" />
                    ) : reward.category === 'coupon' ? (
                      <Ticket className="w-8 h-8 text-green-600" />
                    ) : (
                      <Gift className="w-8 h-8 text-red-600" />
                    )}
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Star className="w-4 h-4" />
                      <span className="font-bold">{reward.cost}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-2">{reward.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>

                  <button
                    disabled={!reward.available || employee.stars < reward.cost}
                    className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                      reward.available && employee.stars >= reward.cost
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {!reward.available ? 'Indisponível' :
                     employee.stars >= reward.cost ? 'Resgatar' : 'Estrelas Insuficientes'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Page */}
        {currentPage === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-6 mb-6">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{employee.name}</h2>
                  <p className="text-gray-600 mb-2">{employee.position}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600 mb-1">Nível {employee.level}</div>
                  <div className="flex items-center space-x-1 text-yellow-600">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">{employee.stars.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{employee.salesCount}</div>
                  <div className="text-sm text-gray-600">Vendas Este Mês</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    R$ {employee.avgTicket.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Ticket Médio</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {employee.achievements.length}
                  </div>
                  <div className="text-sm text-gray-600">Conquistas</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Conquistas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {employee.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg"
                  >
                    <Award className="w-6 h-6 text-yellow-600" />
                    <span className="font-medium text-gray-800">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso de Nível</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nível Atual</span>
                  <span className="font-bold text-gray-800">Nível {employee.level}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>XP para próximo nível</span>
                    <span>{employee.xp} / {employee.nextLevelXp} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-red-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(employee.xp / employee.nextLevelXp) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 py-2">
          {[
            { id: 'dashboard', icon: Trophy, label: 'Início' },
            { id: 'challenges', icon: Target, label: 'Desafios' },
            { id: 'ranking', icon: Users, label: 'Ranking' },
            { id: 'rewards', icon: Gift, label: 'Prêmios' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentPage(id)}
              className={`flex flex-col items-center justify-center py-2 ${
                currentPage === id ? 'text-red-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwiftGamificationApp;