'use client';

import NavBar from "@/components/Blocks/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Icon } from "@iconify/react";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { RegisterResponse } from "@/lib/validations/auth";

export default function SignUpPage() {
    const t = useTranslations("SignUp");
    const locale = useLocale();
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        country: "",
        language: "",
        currency: "",
        accountType: "traveler",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        acceptMarketing: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasNumber: false,
        hasLowercase: false,
        hasUppercase: false,
        hasSpecial: false
    });

    const handlePasswordChange = (password: string) => {
        setFormData({ ...formData, password });
        setPasswordValidation({
            minLength: password.length >= 6,
            hasNumber: /\d/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasSpecial: /[#?!@$%^&*-]/.test(password)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // DEBUG == Données soumises 
            console.log('Submitting form data:', formData);
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data: RegisterResponse = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);

            if (!response.ok || !data.success) {
                // Display validation errors if available
                if ('errors' in data && Array.isArray(data.errors)) {
                    const errorMessages = (data.errors as Array<{path?: string[]; message: string}>).map((err) => 
                        `${err.path?.join('.') || 'Field'}: ${err.message}`
                    ).join(', ');
                    setError(errorMessages || data.message || 'Registration failed');
                } else {
                    setError(data.message || 'Registration failed');
                }
                return;
            }

            // Success
            setSuccess(true);

            // Redirect to dashboard
            router.push(`/${locale}/account`);
            
            // // Redirect to login page after 2 seconds
            // setTimeout(() => {
            //     router.push(`/${locale}/login`);
            // }, 2000);

        } catch (err) {
            console.error('Registration error:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        console.log("Google signup");
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <NavBar />

            <div className="flex items-center justify-center px-4 pt-32 pb-16">
                <div className="w-full max-w-4xl">

                    {/* Header */}
                    <div className="text-center space-y-2 mb-4">
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            {t('title')}
                        </h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className=" dark:bg-zinc-900 rounded-2xl border p-8 space-y-8">

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    {t('accountCreatedSuccess')} Redirecting...
                                </p>
                            </div>
                        )}


                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-black dark:text-white border-b">
                                    {t('personalInfo')}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">{t('firstName')}</Label>
                                        <Input
                                            id="firstName"
                                            placeholder={t('firstNamePlaceholder')}
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">{t('lastName')}</Label>
                                        <Input
                                            id="lastName"
                                            placeholder={t('lastNamePlaceholder')}
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('email')}</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={t('emailPlaceholder')}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('phone')} *</Label>
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800">
                                                <span className="text-2xl">🇫🇷</span>
                                                <span className="text-sm">+33</span>
                                            </div>
                                            <Input
                                                id="phone"
                                                placeholder={t('phonePlaceholder')}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <p className="text-xs text-zinc-500">{t('phoneFormat')}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t('birthDate')}</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Input
                                            placeholder={t('day')}
                                            value={formData.birthDay}
                                            onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                                        />
                                        <Input
                                            placeholder={t('month')}
                                            value={formData.birthMonth}
                                            onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                                        />
                                        <Input
                                            placeholder={t('year')}
                                            value={formData.birthYear}
                                            onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-black dark:text-white border-b py-2">
                                    {t('preferences')}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="country">{t('country')}</Label>
                                        <select
                                            id="country"
                                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        >
                                            <option value="">{t('countryPlaceholder')}</option>
                                            <option value="fr">France</option>
                                            <option value="us">United States</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">{t('language')}</Label>
                                        <select
                                            id="language"
                                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
                                            value={formData.language}
                                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                        >
                                            <option value="">{t('languagePlaceholder')}</option>
                                            <option value="fr">Français</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">{t('currency')}</Label>
                                        <select
                                            id="currency"
                                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
                                            value={formData.currency}
                                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                        >
                                            <option value="">{t('currencyPlaceholder')}</option>
                                            <option value="eur">EUR (€)</option>
                                            <option value="usd">USD ($)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Account Type */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                    {t('accountType')}
                                </h2>

                                <div className="flex flex-col">
                                    <div
                                        onClick={() => setFormData({ ...formData, accountType: 'traveler' })}
                                        className={`p-4 border rounded-t-lg cursor-pointer transition-all ${formData.accountType === 'traveler'
                                            ? 'border-secondary bg-secondary/5'
                                            : 'border-zinc-200 dark:border-zinc-700 hover:border-secondary/50'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.accountType === 'traveler' ? 'border-secondary' : 'border-zinc-300'
                                                }`}>
                                                {formData.accountType === 'traveler' && (
                                                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-black dark:text-white mb-1">
                                                    {t('traveler')}
                                                </h3>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                    {t('travelerDesc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setFormData({ ...formData, accountType: 'host' })}
                                        className={`p-4 border rounded-b-lg cursor-pointer transition-all ${formData.accountType === 'host'
                                            ? 'border-secondary bg-secondary/5'
                                            : 'border-zinc-200 dark:border-zinc-700 hover:border-secondary/50'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.accountType === 'host' ? 'border-secondary' : 'border-zinc-300'
                                                }`}>
                                                {formData.accountType === 'host' && (
                                                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-black dark:text-white mb-1">
                                                    {t('host')}
                                                </h3>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                    {t('hostDesc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                    {t('security')}
                                </h2>

                                <div className="space-y-2">
                                    <Label htmlFor="password">{t('password')}</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder={t('passwordPlaceholder')}
                                        value={formData.password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        required
                                    />

                                    {/* {formData.password && ( */}
                                        <div className="space-y-2 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-md">
                                            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                                {t('passwordRequirements')}
                                            </p>
                                            <div className="space-y-1">
                                                {[
                                                    { key: 'minLength', text: t('passwordMinLength') },
                                                    { key: 'hasNumber', text: t('passwordNumber') },
                                                    { key: 'hasLowercase', text: t('passwordLowercase') },
                                                    { key: 'hasUppercase', text: t('passwordUppercase') },
                                                    { key: 'hasSpecial', text: t('passwordSpecial') }
                                                ].map(({ key, text }) => (
                                                    <div key={key} className="flex items-center gap-2 text-xs">
                                                        {passwordValidation[key as keyof typeof passwordValidation] ? (
                                                            <Check className="w-4 h-4 text-green-500" />
                                                        ) : (
                                                            <X className="w-4 h-4 text-red-500" />
                                                        )}
                                                        <span className={passwordValidation[key as keyof typeof passwordValidation] ? 'text-green-600 dark:text-green-400' : 'text-zinc-600 dark:text-zinc-400'}>
                                                            {text}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    {/* )} */}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder={t('confirmPasswordPlaceholder')}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={formData.acceptTerms}
                                        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                        className="mt-1 w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer"
                                        required
                                    />
                                    <Label htmlFor="terms" className="cursor-pointer text-sm">
                                        {t('acceptTerms')}
                                    </Label>
                                </div>

                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="marketing"
                                        checked={formData.acceptMarketing}
                                        onChange={(e) => setFormData({ ...formData, acceptMarketing: e.target.checked })}
                                        className="mt-1 w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer"
                                    />
                                    <Label htmlFor="marketing" className="cursor-pointer text-sm">
                                        {t('acceptMarketing')}
                                    </Label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full bg-secondary hover:bg-secondary/90" 
                                size="lg"
                                disabled={isLoading || success}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5" />
                                        {t('creating')}...
                                    </span>
                                ) : (
                                    t('createAccount')
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white dark:bg-zinc-900 text-zinc-500">
                                        {t('or')}
                                    </span>
                                </div>
                            </div>

                            {/* Google Signup */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                size="lg"
                                onClick={handleGoogleSignup}
                                disabled
                            >
                                <Icon icon="logos:google-icon" className="mr-2 text-xl" />
                                {t('signUpWithGoogle')}
                            </Button>

                            {/* Login Link */}
                            <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                                {t('hasAccount')}{' '}
                                <Link
                                    href={`/${locale}/login`}
                                    className="text-secondary font-semibold hover:underline"
                                >
                                    {t('signIn')}
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
