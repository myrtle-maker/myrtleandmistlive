import React from 'react';
import { useTheme } from './ThemeContext';
import { THEME_CONTENT } from '../data/themeContent';

const About: React.FC = () => {
  const { theme } = useTheme();
  const content = THEME_CONTENT[theme];

  return (
    <section id="about" className={`py-24 relative overflow-hidden theme-transition ${
      theme === 'myrtle' ? 'bg-white' : 'bg-mist-secondary'
    }`}>
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full blur-3xl theme-transition ${
        theme === 'myrtle' ? 'bg-myrtle-accent/10' : 'bg-mist-accent/10'
      }`}></div>
      <div className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full blur-3xl theme-transition ${
        theme === 'myrtle' ? 'bg-green-200/20' : 'bg-purple-900/20'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className={`aspect-[3/4] rounded-sm overflow-hidden theme-transition ${
               theme === 'myrtle' ? 'bg-myrtle-secondary' : 'bg-mist-bg'
             }`}>
                <img 
                  src={theme === 'myrtle' ? "https://picsum.photos/id/400/800/1000" : "https://picsum.photos/id/106/800/1000"} 
                  alt="Theme Mood" 
                  className={`w-full h-full object-cover theme-transition ${theme === 'mist' ? 'grayscale-[40%]' : ''}`}
                />
             </div>
             <div className={`absolute -bottom-6 -right-6 w-48 h-48 p-4 hidden md:block shadow-lg theme-transition ${
               theme === 'myrtle' ? 'bg-white' : 'bg-mist-bg border border-mist-secondary'
             }`}>
                <img 
                  src={theme === 'myrtle' ? "https://picsum.photos/id/152/300/300" : "https://picsum.photos/id/292/300/300"} 
                  alt="Detail" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          
          <div>
            <span className={`text-sm font-bold uppercase tracking-widest mb-2 block theme-transition ${
              theme === 'myrtle' ? 'text-myrtle-accent' : 'text-mist-accent'
            }`}>
              Our Philosophy
            </span>
            <h2 className={`text-4xl mb-6 theme-transition ${
              theme === 'myrtle' ? 'font-geo text-myrtle-text' : 'font-serif text-mist-text'
            }`}>
              {content.aboutHeadline}
            </h2>
            <div className={`space-y-4 leading-relaxed theme-transition ${
              theme === 'myrtle' ? 'text-gray-600 font-sans' : 'text-gray-400 font-light'
            }`}>
              <p>{content.aboutText}</p>
              <p>
                {theme === 'myrtle' 
                  ? "We believe that caring for a plant is an act of grounded optimism. It requires patience, observation, and a connection to the physical world."
                  : "We believe in the power of atmosphere. A scent, a texture, a flicker of light—these are the tools that transform a house into a sanctuary."
                }
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h4 className={`text-xl mb-2 theme-transition ${
                  theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
                }`}>
                  Sustainable
                </h4>
                <p className={`text-sm theme-transition ${
                  theme === 'myrtle' ? 'text-gray-600' : 'text-gray-500'
                }`}>Ethically sourced materials.</p>
              </div>
              <div>
                <h4 className={`text-xl mb-2 theme-transition ${
                  theme === 'myrtle' ? 'font-geo font-bold text-myrtle-text' : 'font-serif text-mist-text'
                }`}>
                  Hand-Crafted
                </h4>
                <p className={`text-sm theme-transition ${
                  theme === 'myrtle' ? 'text-gray-600' : 'text-gray-500'
                }`}>Made in small batches.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;