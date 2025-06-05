
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Character } from '../pages/Index';

interface CharacterSelectProps {
  selectedCharacters: Character[];
  onCharacterSelect: (character: Character) => void;
  onNext: () => void;
  onBack: () => void;
}

const availableCharacters: Character[] = [
  {
    id: 'fire-fox',
    name: 'Blaze',
    element: 'fire',
    species: 'Fire Fox',
    health: 100,
    maxHealth: 100,
    energy: 100,
    maxEnergy: 100,
    image: '/placeholder.svg?height=200&width=200',
    rarity: 'epic',
    abilities: [
      { id: 'fireball', name: 'Fireball', damage: 30, energyCost: 20, cooldown: 2, element: 'fire', description: 'Launches a blazing fireball' },
      { id: 'flame-dash', name: 'Flame Dash', damage: 20, energyCost: 15, cooldown: 3, element: 'fire', description: 'Swift fire-infused dash attack' }
    ]
  },
  {
    id: 'water-turtle',
    name: 'Neptune',
    element: 'water',
    species: 'Water Turtle',
    health: 150,
    maxHealth: 150,
    energy: 80,
    maxEnergy: 80,
    image: '/placeholder.svg?height=200&width=200',
    rarity: 'rare',
    abilities: [
      { id: 'tidal-wave', name: 'Tidal Wave', damage: 25, energyCost: 25, cooldown: 4, element: 'water', description: 'Summons a powerful wave' },
      { id: 'healing-spring', name: 'Healing Spring', damage: 0, energyCost: 30, cooldown: 5, element: 'water', description: 'Restores health over time' }
    ]
  },
  {
    id: 'lightning-eagle',
    name: 'Thunder',
    element: 'air',
    species: 'Lightning Eagle',
    health: 80,
    maxHealth: 80,
    energy: 120,
    maxEnergy: 120,
    image: '/placeholder.svg?height=200&width=200',
    rarity: 'legendary',
    abilities: [
      { id: 'lightning-strike', name: 'Lightning Strike', damage: 40, energyCost: 35, cooldown: 3, element: 'air', description: 'Devastating lightning attack' },
      { id: 'wind-gust', name: 'Wind Gust', damage: 15, energyCost: 10, cooldown: 1, element: 'air', description: 'Quick wind-based attack' }
    ]
  },
  {
    id: 'earth-bear',
    name: 'Boulder',
    element: 'earth',
    species: 'Earth Bear',
    health: 180,
    maxHealth: 180,
    energy: 60,
    maxEnergy: 60,
    image: '/placeholder.svg?height=200&width=200',
    rarity: 'epic',
    abilities: [
      { id: 'earthquake', name: 'Earthquake', damage: 35, energyCost: 40, cooldown: 5, element: 'earth', description: 'Devastating ground tremor' },
      { id: 'rock-shield', name: 'Rock Shield', damage: 0, energyCost: 20, cooldown: 4, element: 'earth', description: 'Protective stone barrier' }
    ]
  },
  {
    id: 'ice-wolf',
    name: 'Frost',
    element: 'ice',
    species: 'Ice Wolf',
    health: 90,
    maxHealth: 90,
    energy: 110,
    maxEnergy: 110,
    image: '/placeholder.svg?height=200&width=200',
    rarity: 'rare',
    abilities: [
      { id: 'ice-shard', name: 'Ice Shard', damage: 28, energyCost: 18, cooldown: 2, element: 'ice', description: 'Sharp ice projectile' },
      { id: 'frost-bite', name: 'Frost Bite', damage: 22, energyCost: 15, cooldown: 3, element: 'ice', description: 'Freezing bite attack' }
    ]
  },
  {
    id: 'nature-deer',
    name: 'Gaia',
    element: 'nature',
    species: 'Nature Deer',
    health: 120,
    maxHealth: 120,
    energy: 90,
    maxEnergy: 90,
    image: '/placeholder.svg?height=200&width=200',
    rarity: 'epic',
    abilities: [
      { id: 'vine-whip', name: 'Vine Whip', damage: 20, energyCost: 15, cooldown: 2, element: 'nature', description: 'Lashing vine attack' },
      { id: 'nature-heal', name: 'Nature Heal', damage: 0, energyCost: 25, cooldown: 4, element: 'nature', description: 'Restores ally health' }
    ]
  }
];

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

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'border-gray-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-yellow-400'
  };
  return colors[rarity as keyof typeof colors] || 'border-gray-400';
};

const CharacterSelect: React.FC<CharacterSelectProps> = ({
  selectedCharacters,
  onCharacterSelect,
  onNext,
  onBack
}) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
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
            <h1 className="text-4xl font-bold text-white mb-2">Choose Your Champions</h1>
            <p className="text-gray-300">Select 3 characters for your team ({selectedCharacters.length}/3)</p>
          </div>
          
          <Button
            onClick={onNext}
            disabled={selectedCharacters.length !== 3}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Selected characters preview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Your Team</h2>
          <div className="flex gap-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center ${
                  selectedCharacters[index] ? 'bg-gradient-to-br ' + getElementColor(selectedCharacters[index].element) : 'bg-white/10'
                }`}
              >
                {selectedCharacters[index] ? (
                  <span className="text-2xl">{selectedCharacters[index].species.includes('Fox') ? '🦊' : 
                    selectedCharacters[index].species.includes('Turtle') ? '🐢' : 
                    selectedCharacters[index].species.includes('Eagle') ? '🦅' : 
                    selectedCharacters[index].species.includes('Bear') ? '🐻' : 
                    selectedCharacters[index].species.includes('Wolf') ? '🐺' : '🦌'}</span>
                ) : (
                  <span className="text-white/50 text-sm">Empty</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Character grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCharacters.map((character) => {
            const isSelected = selectedCharacters.find(c => c.id === character.id);
            const canSelect = selectedCharacters.length < 3 && !isSelected;
            
            return (
              <Card
                key={character.id}
                className={`bg-white/10 backdrop-blur-sm border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  isSelected 
                    ? `${getRarityColor(character.rarity)} bg-white/20` 
                    : canSelect 
                    ? `border-white/20 hover:border-white/40` 
                    : 'border-gray-600 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => canSelect && onCharacterSelect(character)}
              >
                <div className="p-6">
                  {/* Character image/icon */}
                  <div className={`h-32 w-32 mx-auto mb-4 rounded-full bg-gradient-to-br ${getElementColor(character.element)} flex items-center justify-center text-6xl`}>
                    {character.species.includes('Fox') ? '🦊' : 
                     character.species.includes('Turtle') ? '🐢' : 
                     character.species.includes('Eagle') ? '🦅' : 
                     character.species.includes('Bear') ? '🐻' : 
                     character.species.includes('Wolf') ? '🐺' : '🦌'}
                  </div>

                  {/* Character info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{character.species}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      character.rarity === 'legendary' ? 'bg-yellow-500 text-black' :
                      character.rarity === 'epic' ? 'bg-purple-500 text-white' :
                      character.rarity === 'rare' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {character.rarity.toUpperCase()}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Health:</span>
                      <span className="text-green-400 font-semibold">{character.maxHealth}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Energy:</span>
                      <span className="text-blue-400 font-semibold">{character.maxEnergy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Element:</span>
                      <span className={`font-semibold capitalize ${
                        character.element === 'fire' ? 'text-orange-400' :
                        character.element === 'water' ? 'text-blue-400' :
                        character.element === 'earth' ? 'text-green-400' :
                        character.element === 'air' ? 'text-purple-400' :
                        character.element === 'ice' ? 'text-cyan-400' :
                        'text-lime-400'
                      }`}>
                        {character.element}
                      </span>
                    </div>
                  </div>

                  {/* Abilities preview */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Abilities:</h4>
                    <div className="space-y-1">
                      {character.abilities.slice(0, 2).map((ability) => (
                        <div key={ability.id} className="text-xs text-gray-300">
                          • {ability.name} ({ability.damage} dmg)
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="mt-4 text-center">
                      <span className="text-green-400 font-semibold text-sm">✓ SELECTED</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;
