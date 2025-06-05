
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Shield, Zap, Heart } from 'lucide-react';
import { Character } from '../pages/Index';

interface BattleArenaProps {
  playerTeam: Character[];
  onBackToMenu: () => void;
}

const getElementColor = (element: string) => {
  const colors = {
    fire: 'from-orange-500 to-red-500',
    water: 'from-blue-500 to-cyan-500',
    earth: 'from-green-600 to-emerald-600',
    air: 'from-purple-500 to-indigo-500',
    ice: 'from-cyan-400 to-blue-400',
    nature: 'from-green-500 to-lime-500'
  };
  return colors[element as keyof typeof colors] || 'from-gray-500 to-gray-600';
};

const getCharacterEmoji = (species: string) => {
  if (species.includes('Fox')) return '🦊';
  if (species.includes('Turtle')) return '🐢';
  if (species.includes('Eagle')) return '🦅';
  if (species.includes('Bear')) return '🐻';
  if (species.includes('Wolf')) return '🐺';
  return '🦌';
};

// Mock enemy team
const generateEnemyTeam = (): Character[] => {
  const enemies: Character[] = [
    {
      id: 'enemy-shadow-panther',
      name: 'Shadow',
      element: 'fire',
      species: 'Shadow Panther',
      health: 85,
      maxHealth: 85,
      energy: 95,
      maxEnergy: 95,
      image: '/placeholder.svg',
      rarity: 'rare',
      abilities: [
        { id: 'shadow-strike', name: 'Shadow Strike', damage: 32, energyCost: 22, cooldown: 2, element: 'fire', description: 'Dark flame attack' }
      ]
    },
    {
      id: 'enemy-crystal-serpent',
      name: 'Crystal',
      element: 'ice',
      species: 'Crystal Serpent',
      health: 110,
      maxHealth: 110,
      energy: 85,
      maxEnergy: 85,
      image: '/placeholder.svg',
      rarity: 'epic',
      abilities: [
        { id: 'crystal-blast', name: 'Crystal Blast', damage: 28, energyCost: 20, cooldown: 3, element: 'ice', description: 'Piercing ice crystals' }
      ]
    },
    {
      id: 'enemy-storm-hawk',
      name: 'Storm',
      element: 'air',
      species: 'Storm Hawk',
      health: 75,
      maxHealth: 75,
      energy: 115,
      maxEnergy: 115,
      image: '/placeholder.svg',
      rarity: 'legendary',
      abilities: [
        { id: 'storm-dive', name: 'Storm Dive', damage: 38, energyCost: 30, cooldown: 4, element: 'air', description: 'Lightning-fast dive attack' }
      ]
    }
  ];
  
  return enemies.map(enemy => ({ ...enemy, health: enemy.maxHealth, energy: enemy.maxEnergy }));
};

const BattleArena: React.FC<BattleArenaProps> = ({ playerTeam, onBackToMenu }) => {
  const [battleState, setBattleState] = useState<'preparing' | 'active' | 'victory' | 'defeat'>('preparing');
  const [currentPlayerTeam, setCurrentPlayerTeam] = useState<Character[]>(
    playerTeam.map(char => ({ ...char, health: char.maxHealth, energy: char.maxEnergy }))
  );
  const [enemyTeam, setEnemyTeam] = useState<Character[]>(generateEnemyTeam());
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [turn, setTurn] = useState<'player' | 'enemy'>('player');

  useEffect(() => {
    if (battleState === 'preparing') {
      setTimeout(() => setBattleState('active'), 2000);
    }
  }, [battleState]);

  const addToBattleLog = (message: string) => {
    setBattleLog(prev => [...prev.slice(-4), message]);
  };

  const useAbility = (character: Character, ability: any, target: Character) => {
    if (character.energy < ability.energyCost) return false;

    // Update character energy
    const updatedCharacter = { ...character, energy: character.energy - ability.energyCost };
    
    // Calculate damage
    const damage = Math.max(1, ability.damage + Math.floor(Math.random() * 10) - 5);
    const updatedTarget = { ...target, health: Math.max(0, target.health - damage) };

    // Update teams
    if (turn === 'player') {
      setCurrentPlayerTeam(prev => prev.map(c => c.id === character.id ? updatedCharacter : c));
      setEnemyTeam(prev => prev.map(c => c.id === target.id ? updatedTarget : c));
    } else {
      setEnemyTeam(prev => prev.map(c => c.id === character.id ? updatedCharacter : c));
      setCurrentPlayerTeam(prev => prev.map(c => c.id === target.id ? updatedTarget : c));
    }

    addToBattleLog(`${character.name} used ${ability.name} on ${target.name} for ${damage} damage!`);

    // Check for victory/defeat
    setTimeout(() => {
      const playerAlive = currentPlayerTeam.some(c => c.health > 0);
      const enemyAlive = enemyTeam.some(c => c.health > 0);

      if (!playerAlive) setBattleState('defeat');
      else if (!enemyAlive) setBattleState('victory');
      else setTurn(turn === 'player' ? 'enemy' : 'player');
    }, 1000);

    return true;
  };

  const handlePlayerAttack = (ability: any) => {
    if (!activeCharacter || turn !== 'player') return;
    
    const aliveEnemies = enemyTeam.filter(c => c.health > 0);
    if (aliveEnemies.length === 0) return;

    const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    useAbility(activeCharacter, ability, target);
    setActiveCharacter(null);
    setSelectedAbility(null);
  };

  const handleEnemyTurn = () => {
    if (turn !== 'enemy') return;

    const aliveEnemies = enemyTeam.filter(c => c.health > 0);
    const alivePlayers = currentPlayerTeam.filter(c => c.health > 0);
    
    if (aliveEnemies.length === 0 || alivePlayers.length === 0) return;

    const enemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    const target = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    const ability = enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];

    setTimeout(() => {
      useAbility(enemy, ability, target);
    }, 1500);
  };

  useEffect(() => {
    if (turn === 'enemy' && battleState === 'active') {
      handleEnemyTurn();
    }
  }, [turn, battleState]);

  if (battleState === 'preparing') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            BATTLE STARTING
          </h1>
          <div className="flex justify-center space-x-8">
            {playerTeam.map((character, index) => (
              <div key={character.id} className="text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getElementColor(character.element)} flex items-center justify-center text-4xl mb-2`}>
                  {getCharacterEmoji(character.species)}
                </div>
                <p className="text-white font-semibold">{character.name}</p>
              </div>
            ))}
          </div>
          <p className="text-2xl text-gray-300">Prepare for battle!</p>
        </div>
      </div>
    );
  }

  if (battleState === 'victory' || battleState === 'defeat') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className={`text-6xl font-bold ${
            battleState === 'victory' 
              ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
              : 'bg-gradient-to-r from-red-400 to-red-600'
          } bg-clip-text text-transparent`}>
            {battleState === 'victory' ? 'VICTORY!' : 'DEFEAT!'}
          </h1>
          <p className="text-2xl text-gray-300">
            {battleState === 'victory' 
              ? 'Your team has emerged victorious!' 
              : 'Better luck next time, champion.'}
          </p>
          <Button
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-lg px-8 py-3"
          >
            Return to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retreat
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Battle Arena</h1>
            <p className={`text-lg ${turn === 'player' ? 'text-green-400' : 'text-red-400'}`}>
              {turn === 'player' ? 'Your Turn' : 'Enemy Turn'}
            </p>
          </div>
          
          <div className="w-20"></div>
        </div>

        {/* Battle Field */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Player Team */}
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Your Team</h2>
            <div className="space-y-4">
              {currentPlayerTeam.map((character) => (
                <Card
                  key={character.id}
                  className={`bg-white/10 backdrop-blur-sm border p-4 cursor-pointer transition-all duration-200 ${
                    activeCharacter?.id === character.id 
                      ? 'border-green-400 bg-green-400/20' 
                      : character.health > 0 && turn === 'player'
                      ? 'border-white/20 hover:border-green-400/50' 
                      : 'border-gray-600 opacity-50'
                  }`}
                  onClick={() => {
                    if (character.health > 0 && turn === 'player') {
                      setActiveCharacter(character);
                    }
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getElementColor(character.element)} flex items-center justify-center text-2xl`}>
                      {getCharacterEmoji(character.species)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{character.name}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-red-400" />
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-red-400 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-red-400">{character.health}/{character.maxHealth}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-blue-400" />
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(character.energy / character.maxEnergy) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-blue-400">{character.energy}/{character.maxEnergy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Enemy Team */}
          <div>
            <h2 className="text-xl font-bold text-red-400 mb-4">Enemy Team</h2>
            <div className="space-y-4">
              {enemyTeam.map((character) => (
                <Card
                  key={character.id}
                  className={`bg-white/10 backdrop-blur-sm border p-4 ${
                    character.health > 0 ? 'border-white/20' : 'border-gray-600 opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getElementColor(character.element)} flex items-center justify-center text-2xl`}>
                      🐾
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{character.name}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-red-400" />
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-red-400 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-red-400">{character.health}/{character.maxHealth}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-blue-400" />
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(character.energy / character.maxEnergy) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-blue-400">{character.energy}/{character.maxEnergy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        {activeCharacter && turn === 'player' && (
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">
              {activeCharacter.name}'s Turn - Choose an Ability
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeCharacter.abilities.map((ability) => (
                <Button
                  key={ability.id}
                  onClick={() => handlePlayerAttack(ability)}
                  disabled={activeCharacter.energy < ability.energyCost}
                  className={`h-auto p-4 ${
                    activeCharacter.energy >= ability.energyCost
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{ability.name}</div>
                    <div className="text-xs opacity-80">
                      {ability.damage} dmg • {ability.energyCost} energy
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Battle Log */}
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-4">
          <h3 className="text-lg font-bold text-white mb-2">Battle Log</h3>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {battleLog.map((log, index) => (
              <p key={index} className="text-gray-300 text-sm">{log}</p>
            ))}
            {battleLog.length === 0 && (
              <p className="text-gray-500 text-sm italic">Battle begins...</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BattleArena;
