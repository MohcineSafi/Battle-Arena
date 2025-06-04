
import React, { useState } from 'react';
import CharacterSelect from '../components/CharacterSelect';
import BattleArena from '../components/BattleArena';
import TeamFormation from '../components/TeamFormation';
import MainMenu from '../components/MainMenu';

export type Character = {
  id: string;
  name: string;
  element: 'fire' | 'water' | 'earth' | 'air' | 'ice' | 'nature';
  species: string;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  abilities: Ability[];
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
};

export type Ability = {
  id: string;
  name: string;
  damage: number;
  energyCost: number;
  cooldown: number;
  element: string;
  description: string;
};

export type GameState = 'menu' | 'character-select' | 'team-formation' | 'battle';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [playerTeam, setPlayerTeam] = useState<Character[]>([]);

  const handleCharacterSelect = (character: Character) => {
    if (selectedCharacters.length < 3 && !selectedCharacters.find(c => c.id === character.id)) {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const handleTeamReady = (team: Character[]) => {
    setPlayerTeam(team);
    setGameState('battle');
  };

  const renderCurrentScreen = () => {
    switch (gameState) {
      case 'menu':
        return <MainMenu onStartGame={() => setGameState('character-select')} />;
      case 'character-select':
        return (
          <CharacterSelect
            selectedCharacters={selectedCharacters}
            onCharacterSelect={handleCharacterSelect}
            onNext={() => setGameState('team-formation')}
            onBack={() => setGameState('menu')}
          />
        );
      case 'team-formation':
        return (
          <TeamFormation
            selectedCharacters={selectedCharacters}
            onTeamReady={handleTeamReady}
            onBack={() => setGameState('character-select')}
          />
        );
      case 'battle':
        return (
          <BattleArena
            playerTeam={playerTeam}
            onBackToMenu={() => setGameState('menu')}
          />
        );
      default:
        return <MainMenu onStartGame={() => setGameState('character-select')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {renderCurrentScreen()}
    </div>
  );
};

export default Index;
