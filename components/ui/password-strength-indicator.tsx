'use client';

import { Check, X } from "lucide-react";

export interface PasswordValidation {
  minLength: boolean;
  hasNumber: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasSpecial: boolean;
}

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidation;
  requirements: {
    minLength: string;
    hasNumber: string;
    hasLowercase: string;
    hasUppercase: string;
    hasSpecial: string;
  };
  title: string;
}

export function PasswordStrengthIndicator({ 
  validation, 
  requirements,
  title
}: PasswordStrengthIndicatorProps) {
  const criteriaList = [
    { key: 'minLength' as const, text: requirements.minLength },
    { key: 'hasNumber' as const, text: requirements.hasNumber },
    { key: 'hasLowercase' as const, text: requirements.hasLowercase },
    { key: 'hasUppercase' as const, text: requirements.hasUppercase },
    { key: 'hasSpecial' as const, text: requirements.hasSpecial }
  ];

  return (
    <div className="space-y-2 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-md">
      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {title}
      </p>
      <div className="space-y-1">
        {criteriaList.map(({ key, text }) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            {validation[key] ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-red-500" />
            )}
            <span className={validation[key] ? 'text-green-600 dark:text-green-400' : 'text-zinc-600 dark:text-zinc-400'}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function validatePassword(password: string): PasswordValidation {
  return {
    minLength: password.length >= 6,
    hasNumber: /\d/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasSpecial: /[#?!@$%^&*-]/.test(password)
  };
}
