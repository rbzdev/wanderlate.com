'use client';


import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

// Block
import NavBar from "@/components/Blocks/NavBar";
import Footer from "@/components/Blocks/Footer";

// Components
// import { InputWithIcon } from "@/components/ui/input-with-icon";
// import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const t = useTranslations("Login");
    const locale = useLocale();
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Redirect to dashboard on success
                router.push(`/${locale}/dashboard`);
                router.refresh();
            } else {
                // Show error message
                setError(data.message || 'Login failed. Please try again.');
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Handle Google login logic here
        console.log("Google login");
    };

    return (
        <div className="min-h-screen">
            <NavBar />
            
            <div className="flex items-center justify-center px-4 pt-32 pb-16">
                <div className="w-full max-w-5xl">
                    <div className=" dark:bg-zinc-900 rounded-2xl border p-8 space-y-6">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold text-black dark:text-white">
                                {t('title')}
                            </h1>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="lucide:alert-circle" className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t('emailPlaceholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">{t('password')}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={t('passwordPlaceholder')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary cursor-pointer"
                                    />
                                    <Label htmlFor="remember" className="cursor-pointer text-sm">
                                        {t('rememberMe')}
                                    </Label>
                                </div>
                                <Link 
                                    href={`/${locale}/forgot-password`}
                                    className="text-sm text-secondary hover:underline"
                                >
                                    {t('forgotPassword')}
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full bg-secondary hover:bg-secondary/90" 
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Icon icon="lucide:loader-2" className="w-5 h-5 animate-spin" />
                                        <span>{t('signingIn') || 'Signing in...'}</span>
                                    </div>
                                ) : (
                                    t('signIn')
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 dark:bg-zinc-900 text-zinc-500">
                                    {t('orContinueWith')}
                                </span>
                            </div>
                        </div>

                        {/* Google Login */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full text-black font-normal"
                            size="lg"
                            onClick={handleGoogleLogin}
                        >
                            <Icon icon="logos:google-icon" className="mr-2 text-xl" />
                            {t('continueWithGoogle')}
                        </Button>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                            {t('noAccount')}{' '}
                            <Link 
                                href={`/${locale}/signup`}
                                className="text-secondary font-semibold hover:underline"
                            >
                                {t('createAccount')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}