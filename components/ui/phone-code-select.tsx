'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Icon } from '@iconify/react';
import { COUNTRIES, type Country } from '@/lib/data/countries';

interface PhoneCodeSelectProps {
  value: string;
  onChange: (countryCode: string) => void;
  className?: string;
}

export function PhoneCodeSelect({ value, onChange, className = '' }: PhoneCodeSelectProps) {
  const locale = useLocale() as 'en' | 'fr';
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.code === value);
  
  const filteredCountries = COUNTRIES.filter(country => {
    const searchLower = search.toLowerCase();
    return (
      country.name[locale].toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.phoneCode.includes(searchLower)
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

  const handleSelect = (country: Country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
      >
        <span className="text-sm">{selectedCountry?.flag || '🌍'}</span>
        <span className="text-xs font-medium text-zinc-900 dark:text-white ">
          {selectedCountry?.phoneCode || '+--'}
        </span>
        <Icon 
          icon={isOpen ? "lucide:chevron-up" : "lucide:chevron-down"} 
          className="w-3 h-3 text-zinc-500"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 left-0 mt-1 w-80 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-zinc-200 dark:border-zinc-700">
            <div className="relative">
              <Icon 
                icon="lucide:search" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
              />
              <input
                type="text"
                placeholder={locale === 'fr' ? 'Rechercher un pays...' : 'Search country...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                autoFocus
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-64">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full px-3 py-2 text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors ${
                    value === country.code ? 'bg-secondary/10 dark:bg-secondary/20' : ''
                  }`}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="flex-1 text-sm text-zinc-900 dark:text-white">
                    {country.name[locale]}
                  </span>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {country.phoneCode}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-zinc-500">
                {locale === 'fr' ? 'Aucun pays trouvé' : 'No country found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
