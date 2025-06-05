
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Character } from '../pages/Index';

interface TeamFormationProps {
  selectedCharacters: Character[];
  onTeamReady: (team: Character[]) => void;
  onBack: () => void;
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

const TeamFormation: React.FC<TeamFormationProps> = ({
  selectedCharacters,
  onTeamReady,
  onBack
}) => {
  const [teamOrder, setTeamOrder] = useState<Character[]>(selectedCharacters);

  const handlePositionChange = (character: Character, newPosition: number) => {
    const newOrder = [...teamOrder];
    const currentIndex = newOrder.findIndex(c => c.id === character.id);
    
    // Remove from current position
    newOrder.splice(currentIndex, 1);
    // Insert at new position
    newOrder.splice(newPosition, 0, character);
    
    setTeamOrder(newOrder);
  };

  const getCharacterEmoji = (species: string) => {
    if (species.includes('Fox')) return '🦊';
    if (species.includes('Turtle')) return '🐢';
    if (species.includes('Eagle')) return '🦅';
    if (species.includes('Bear')) return '🐻';
    if (species.includes('Wolf')) return '🐺';
    return '🦌';
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Team Formation</h1>
            <p className="text-gray-300">Arrange your team and prepare for battle</p>
          </div>
          
          <Button
            onClick={() => onTeamReady(teamOrder)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            Enter Battle
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Battle Formation Arena */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Battle Formation</h2>
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg p-8 border border-white/20">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {teamOrder.map((character, index) => (
                <div key={character.id} className="text-center">
                  <div className="relative mb-4">
                    <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${getElementColor(character.element)} flex items-center justify-center text-4xl shadow-lg`}>
                      {getCharacterEmoji(character.species)}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold">{character.name}</h3>
                  <p className="text-gray-300 text-sm">{character.species}</p>
                  
                  {/* Position controls */}
                  <div className="flex justify-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handlePositionChange(character, Math.max(0, index - 1))}
                      disabled={index === 0}
                    >
                      ←
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => handlePositionChange(character, Math.min(2, index + 1))}
                      disabled={index === 2}
                    >
                      →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Team Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Health:</span>
                <span className="text-green-400 font-semibold">
                  {teamOrder.reduce((sum, char) => sum + char.maxHealth, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Energy:</span>
                <span className="text-blue-400 font-semibold">
                  {teamOrder.reduce((sum, char) => sum + char.maxEnergy, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Avg Damage:</span>
                <span className="text-red-400 font-semibold">
                  {Math.round(teamOrder.reduce((sum, char) => 
                    sum + char.abilities.reduce((aSum, ability) => aSum + ability.damage, 0) / char.abilities.length, 0
                  ) / teamOrder.length)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Elemental Balance</h3>
            <div className="space-y-2">
              {teamOrder.map((character, index) => (
                <div key={character.id} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${getElementColor(character.element)}`}></div>
                  <span className="text-gray-300 text-sm capitalize">{character.element}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Formation Tips</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Position 1: Frontline fighter</p>
              <p>• Position 2: Support/healer</p>
              <p>• Position 3: Heavy damage dealer</p>
              <p>• Balance elements for synergy</p>
            </div>
          </Card>
        </div>

        {/* Individual Character Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamOrder.map((character, index) => (
            <Card key={character.id} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <div className="text-center mb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${getElementColor(character.element)} flex items-center justify-center text-3xl mb-2`}>
                  {getCharacterEmoji(character.species)}
                </div>
                <h3 className="text-lg font-bold text-white">{character.name}</h3>
                <p className="text-gray-300 text-sm">Position {index + 1}</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Health</span>
                    <span className="text-green-400">{character.maxHealth}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full" 
                      style={{ width: `${(character.maxHealth / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Energy</span>
                    <span className="text-blue-400">{character.maxEnergy}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full" 
                      style={{ width: `${(character.maxEnergy / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Abilities:</h4>
                  <div className="space-y-1">
                    {character.abilities.map((ability) => (
                      <div key={ability.id} className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-300">{ability.name}</span>
                          <span className="text-red-400">{ability.damage} dmg</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Reset button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => setTeamOrder(selectedCharacters)}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Formation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamFormation;
