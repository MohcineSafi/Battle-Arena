
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sword, Users, Calendar, Settings } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="text-center z-10 space-y-8 px-4">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
            ELEMENTAL
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 bg-clip-text text-transparent animate-fade-in delay-500">
            ARENA
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 animate-fade-in delay-1000">
            Battle with mystical creatures wielding elemental powers
          </p>
        </div>

        {/* Menu buttons */}
        <div className="space-y-4 animate-fade-in delay-1500">
          <Button
            onClick={onStartGame}
            className="w-64 h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sword className="mr-3 h-6 w-6" />
            Start Battle
          </Button>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="w-64 h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
            >
              <Users className="mr-2 h-5 w-5" />
              Multiplayer
            </Button>
            
            <Button
              variant="outline"
              className="w-64 h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Seasonal Events
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="w-64 h-12 bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in delay-2000">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-orange-400 text-3xl mb-2">🦊</div>
            <h3 className="text-lg font-bold text-white mb-2">Unique Characters</h3>
            <p className="text-gray-300 text-sm">Choose from fire foxes, water turtles, and more mystical creatures</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-blue-400 text-3xl mb-2">⚔️</div>
            <h3 className="text-lg font-bold text-white mb-2">Team Battles</h3>
            <p className="text-gray-300 text-sm">Strategic 3v3 battles with elemental combinations</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-green-400 text-3xl mb-2">🌟</div>
            <h3 className="text-lg font-bold text-white mb-2">Seasonal Events</h3>
            <p className="text-gray-300 text-sm">Limited-time events with exclusive rewards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
