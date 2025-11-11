'use client';


import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import type { RegisterResponse } from "@/lib/validations/auth";

// Block
import NavBar from "@/components/Blocks/NavBar";
import Footer from "@/components/Blocks/Footer";

// Components
import { Input } from "@/components/ui/input";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordStrengthIndicator, validatePassword, type PasswordValidation } from "@/components/ui/password-strength-indicator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CountrySelect } from "@/components/ui/country-select";
import { PhoneCodeSelect } from "@/components/ui/phone-code-select";
import { LanguageSelect } from "@/components/ui/language-select";
import { CurrencySelect } from "@/components/ui/currency-select";

export default function SignUpPage() {
    const t = useTranslations("SignUp");
    const locale = useLocale();
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        phoneCountry: "FR", // Nouveau: pays pour l'indicatif
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

    const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
        minLength: false,
        hasNumber: false,
        hasLowercase: false,
        hasUppercase: false,
        hasSpecial: false
    });

    const handlePasswordChange = (password: string) => {
        setFormData({ ...formData, password });
        setPasswordValidation(validatePassword(password));
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
            router.push(`/${locale}/dashboard`);
            
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
        <div className="min-h-screen">
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
                                    <Icon icon="lucide:x" className="w-4 h-4" />
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                                    <Icon icon="lucide:check" className="w-4 h-4" />
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
                                        <InputWithIcon
                                            id="firstName"
                                            icon="lucide:user"
                                            iconPosition="left"
                                            placeholder={t('firstNamePlaceholder')}
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">{t('lastName')}</Label>
                                        <InputWithIcon
                                            id="lastName"
                                            icon="lucide:user"
                                            iconPosition="left"
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
                                        <InputWithIcon
                                            id="email"
                                            type="email"
                                            icon="lucide:mail"
                                            iconPosition="left"
                                            placeholder={t('emailPlaceholder')}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('phone')} *</Label>
                                        <div className="flex gap-2">
                                            <PhoneCodeSelect 
                                                value={formData.phoneCountry}
                                                onChange={(code) => setFormData({ ...formData, phoneCountry: code })}
                                            />
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
                                        <CountrySelect
                                            value={formData.country}
                                            onChange={(code) => setFormData({ ...formData, country: code })}
                                            placeholder={t('countryPlaceholder')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">{t('language')}</Label>
                                        <LanguageSelect
                                            value={formData.language}
                                            onChange={(code) => setFormData({ ...formData, language: code })}
                                            placeholder={t('languagePlaceholder')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">{t('currency')}</Label>
                                        <CurrencySelect
                                            value={formData.currency}
                                            onChange={(code) => setFormData({ ...formData, currency: code })}
                                            placeholder={t('currencyPlaceholder')}
                                        />
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
                                    <PasswordInput
                                        id="password"
                                        placeholder={t('passwordPlaceholder')}
                                        value={formData.password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        required
                                    />

                                    <PasswordStrengthIndicator
                                        validation={passwordValidation}
                                        title={t('passwordRequirements')}
                                        requirements={{
                                            minLength: t('passwordMinLength'),
                                            hasNumber: t('passwordNumber'),
                                            hasLowercase: t('passwordLowercase'),
                                            hasUppercase: t('passwordUppercase'),
                                            hasSpecial: t('passwordSpecial')
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                                    <PasswordInput
                                        id="confirmPassword"
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
            <Footer />
        </div>
    );
}
