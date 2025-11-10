'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedBackground from '@/components/ui/animated-tabs';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import ButtonTab from '../ui/button-tab';

type Destination = {
    id: string;
    name: string;
    country: string;
    image: string;
    price: number;
};

const destinations: Record<string, Destination[]> = {
    beach: [
        {
            id: '1',
            name: 'Nice',
            country: 'France',
            image: 'https://images.unsplash.com/photo-1643914729809-4aa59fdc4c17?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 120,
        },
        {
            id: '2',
            name: 'Barcelone',
            country: 'Spain',
            image: 'https://images.unsplash.com/photo-1578912996078-305d92249aa6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 110,
        },
        {
            id: '3',
            name: 'Malaga',
            country: 'Spain',
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
            price: 90,
        },
        {
            id: '4',
            name: 'Cannes',
            country: 'France',
            image: 'https://images.unsplash.com/photo-1722036716346-e2380e00a6a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074',
            price: 150,
        },
        
        {
            id: '5',
            name: 'Miami',
            country: 'United States',
            image: 'https://images.unsplash.com/photo-1589083130544-0d6a2926e519?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
            price: 150,
        },
        
        {
            id: '6',
            name: 'Bali',
            country: 'Indonesie',
            image: 'https://plus.unsplash.com/premium_photo-1661878915254-f3163e91d870?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 150,
        },
        
        {
            id: '7',
            name: 'Saint-Tropez',
            country: 'France',
            image: 'https://images.unsplash.com/photo-1627669867775-fce0b561dad4?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 150,
        },
        
        {
            id: '8',
            name: 'Ibiza',
            country: 'Espagne',
            image: 'https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/baleares/es-vedra-ibiza-s2540022863.jpg',
            price: 150,
        }



    ],
    culture: [
        {
            id: '5',
            name: 'Paris',
            country: 'France',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            price: 180,
        },
        {
            id: '6',
            name: 'Rome',
            country: 'Italy',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
            price: 160,
        },
        {
            id: '7',
            name: 'Kyoto',
            country: 'Japan',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
            price: 190,
        },
        {
            id: '8',
            name: 'Istanbul',
            country: 'Turkey',
            image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
            price: 140,
        },
    ],
    ski: [
        {
            id: '9',
            name: 'Chamonix',
            country: 'France',
            image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80',
            price: 200,
        },
        {
            id: '10',
            name: 'Zermatt',
            country: 'Switzerland',
            image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80',
            price: 250,
        },
        {
            id: '11',
            name: 'Innsbruck',
            country: 'Austria',
            image: 'https://images.unsplash.com/photo-1609688669309-fc15db557633?w=800&q=80',
            price: 170,
        },
        {
            id: '12',
            name: 'Cortina',
            country: 'Italy',
            image: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80',
            price: 180,
        },
    ],
    family: [
        {
            id: '13',
            name: 'Orlando',
            country: 'USA',
            image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&q=80',
            price: 220,
        },
        {
            id: '14',
            name: 'London',
            country: 'UK',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
            price: 190,
        },
        {
            id: '15',
            name: 'Copenhagen',
            country: 'Denmark',
            image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80',
            price: 210,
        },
        {
            id: '16',
            name: 'Amsterdam',
            country: 'Netherlands',
            image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
            price: 175,
        },
    ],
    wellness: [
        {
            id: '17',
            name: 'Bali',
            country: 'Indonesia',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            price: 130,
        },
        {
            id: '18',
            name: 'Santorini',
            country: 'Greece',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
            price: 200,
        },
        {
            id: '19',
            name: 'Maldives',
            country: 'Maldives',
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
            price: 300,
        },
        {
            id: '20',
            name: 'Tuscany',
            country: 'Italy',
            image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
            price: 165,
        },
    ],
};

export default function DiscoverDestinations() {
    const t = useTranslations('DiscoverDestinations');
    const [activeTab, setActiveTab] = useState('beach');

    const tabs = [
        { id: 'beach', label: t('tabs.beach') },
        { id: 'culture', label: t('tabs.culture') },
        { id: 'ski', label: t('tabs.ski') },
        { id: 'family', label: t('tabs.family') },
        { id: 'wellness', label: t('tabs.wellness') },
    ];

    return (
        <section className="py-1 px-0 dark:bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-4">
                    {t('title')}
                </h2>

                {/* Animated Tabs */}
                <div className="flex justify-between bg-zinc-200 dark:bg-zinc-800 rounded-sm">
                    <AnimatedBackground
                        defaultValue="beach"
                        className="rounded-sm bg-secondary  "
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.3,
                        }}
                        onValueChange={(value) => setActiveTab(value || 'beach')}
                    >
                        {tabs.map((tab) => (
                            <ButtonTab
                                key={tab.id}
                                data-id={tab.id}
                                className="w-fit md:w-full"
                            >
                                {tab.label}
                            </ButtonTab>
                        ))}
                    </AnimatedBackground>
                </div>

                {/* Carousel */}
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 py-4">
                        {destinations[activeTab].map((destination) => (
                            <CarouselItem key={destination.id} className="pl-4 basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="group cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden">
                                    {/* Image */}
                                    <div className="relative h-36 overflow-hidden">
                                        <Image
                                            src={destination.image}
                                            alt={destination.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className=" p-4">
                                        <h3 className="text-xl font-semibold text-black dark:text-white">
                                            {destination.name}
                                        </h3>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {destination.country}
                                        </p>
                                        <div className="flex flex-col items-baseline gap-1">
                                            <span className="text-lg font-semibold text-secondary">
                                                {destination.price} €
                                            </span>
                                            <span className="text-xs text-zinc-500">
                                                {t('priceLabel')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    );
}
