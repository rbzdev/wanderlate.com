'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Icon } from '@iconify/react';
import { LANGUAGES, type Language } from '@/lib/data/languages';

interface LanguageSelectProps {
  value: string;
  onChange: (languageCode: string) => void;
  placeholder?: string;
  className?: string;
}

export function LanguageSelect({ 
  value, 
  onChange, 
  placeholder = 'Select language',
  className = ''
}: LanguageSelectProps) {
  const locale = useLocale() as 'en' | 'fr';
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = LANGUAGES.find(l => l.code === value);
  
  const filteredLanguages = LANGUAGES.filter(language => {
    const searchLower = search.toLowerCase();
    return (
      language.name[locale].toLowerCase().includes(searchLower) ||
      language.nativeName.toLowerCase().includes(searchLower) ||
      language.code.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (language: Language) => {
    onChange(language.code);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-left flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
      >
        <span className="flex items-center gap-2">
          {selectedLanguage ? (
            <>
              <span className="text-xl">{selectedLanguage.flag}</span>
              <span className="text-sm text-zinc-900 dark:text-white">
                {selectedLanguage.nativeName}
              </span>
            </>
          ) : (
            <>
              <Icon icon="lucide:globe" className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-500">{placeholder}</span>
            </>
          )}
        </span>
        <Icon 
          icon={isOpen ? "lucide:chevron-up" : "lucide:chevron-down"} 
          className="w-4 h-4 text-zinc-500"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-zinc-200 dark:border-zinc-700">
            <div className="relative">
              <Icon 
                icon="lucide:search" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
              />
              <input
                type="text"
                placeholder={locale === 'fr' ? 'Rechercher...' : 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                autoFocus
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="overflow-y-auto max-h-64">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleSelect(language)}
                  className={`w-full px-3 py-2 text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors ${
                    value === language.code ? 'bg-secondary/10 dark:bg-secondary/20' : ''
                  }`}
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1">
                    {/* <span className="text-sm text-zinc-900 dark:text-white font-medium">
                      {language.nativeName}
                    </span> */}
                    <span className="text-sm text-zinc-500 ml-2">
                      {language.name[locale]}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-zinc-500">
                {locale === 'fr' ? 'Aucune langue trouvée' : 'No language found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
