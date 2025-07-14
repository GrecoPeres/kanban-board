import { useDarkMode } from '../hooks/useDarkMode';
import { BsSun, BsMoon } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { CgOptions } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa';

interface Props {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: Props) {
  const { isDark, toggleDark } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
      {/* Opções qnd o menu esta aberto */}
      <div className="flex flex-col items-end gap-2 transition-all duration-300">
        <button
          onClick={() => {
            onClick();
            toggleMenu();
          }}
          className={`transform transition-all duration-400 delay-200 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          } bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-2 shadow text-sm flex items-center gap-2`}
        >
          <FaPlus /> Nova Coluna
        </button>

        <button
          onClick={() => {
            onClick();
            toggleMenu();
          }}
          className={`transform transition-all duration-400 delay-200 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          } bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 shadow text-sm flex items-center gap-2`}
        >
          <FaPlus /> Nova Tarefa
        </button>

        <button
          onClick={() => {
            toggleDark();
            toggleMenu();
          }}
          className={`transform transition-all duration-400 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          } bg-gray-600 hover:bg-gray-700 text-white rounded-full px-4 py-2 shadow text-sm flex items-center gap-2`}
        >
          {isDark ? <BsSun /> : <BsMoon />}
          Tema {isDark ? 'Claro' : 'Escuro'}
        </button>
      </div>

      {/* btn principal */}
      <button
        onClick={toggleMenu}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-xl transition-transform duration-300"
        title="Ações"
      >
        {isOpen ? <FaTimes /> : <CgOptions />}
      </button>
    </div>
  );
}
