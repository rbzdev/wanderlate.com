'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function WaterfrontWinners() {
    const t = useTranslations('WaterfrontWinners');

    return (
        <section className="relative w-full my-12 h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-red-400">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80&quot')`,
                }}
            >
                {/* Overlay pour améliorer la lisibilité */}
                {/* <div className="absolute inset-0 bg-black/10" /> */}
            </div>

            {/* background-image: url(&quot;https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80&quot;); */}

            {/* Content */}
            {/* <div className=" h-full max-w-7xl mx-auto px-6 flex items-center"> */}
                <div className="absolute bottom-8 left-8 bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-xl shadow-2xl">
                    <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6">
                        {t('description')}
                    </p>
                    <Button 
                        size="lg"
                        className="bg-primary hover:bg-primary/90 font-normal"
                    >
                        {t('cta')}
                    </Button>
                </div>
            {/* </div> */}
        </section>
    );
}
