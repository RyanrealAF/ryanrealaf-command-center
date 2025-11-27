import React from 'react';
import { ViewState } from '../types';
import BrandLogo from './BrandLogo';
import { cva } from 'class-variance-authority';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { label: 'MANIFESTO', value: ViewState.MANIFESTO },
    { label: 'PROTOCOLS', value: ViewState.PROTOCOLS },
    { label: 'ARCHIVE', value: ViewState.ARCHIVE },
  ];

  const navButtonStyles = cva(
    'font-display tracking-widest transition-all duration-300',
    {
      variants: {
        isActive: {
          true: 'text-bronze',
          false: 'text-mist hover:text-white',
        },
        isMobile: {
          true: 'text-[10px] font-bold',
          false: 'text-sm relative',
        },
      },
      defaultVariants: { isActive: false, isMobile: false },
    }
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-void/90 backdrop-blur-md border-b border-stone/50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity" 
          onClick={() => setView(ViewState.MANIFESTO)}
        >
          <BrandLogo className="h-16 w-auto text-bronze drop-shadow-bronze" />
        </div>

        <div className="flex items-center gap-8 hidden md:flex">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={navButtonStyles({ isActive: currentView === item.value })}
            >
              {item.label}
              {currentView === item.value && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-bronze" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu icon placeholder - simplistic for tactical feel */}
        <div className="md:hidden flex gap-4">
           {navItems.map((item) => (
             <button
               key={item.value}
               onClick={() => setView(item.value)}
               className={navButtonStyles({
                 isActive: currentView === item.value,
                 isMobile: true,
                 className: currentView !== item.value ? 'text-stone' : '' // Keep specific mobile inactive color
               })}
             >
               {item.label.slice(0, 3)}
             </button>
           ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
