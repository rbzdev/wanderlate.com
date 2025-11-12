'use client';

import { useTranslations } from 'next-intl';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useState } from 'react';

type Destination = {
    id: string;
    translationKey: string;
    rating: number;
    reviews: number;
    price: number;
    pricePerNight: number;
    nights: number;
    images: string[];
    feesIncluded?: boolean;
};

const destinations: Destination[] = [
    {
        id: '1',
        translationKey: 'reykjavik',
        rating: 9.7,
        reviews: 37,
        price: 310,
        pricePerNight: 44,
        nights: 7,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80',
            'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80',
            'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
        ],
    },
    {
        id: '2',
        translationKey: 'niceMediterranean',
        rating: 9.9,
        reviews: 234,
        price: 890,
        pricePerNight: 127,
        nights: 7,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
        ],
    },
    {
        id: '3',
        translationKey: 'parisEiffel',
        rating: 9.7,
        reviews: 189,
        price: 650,
        pricePerNight: 93,
        nights: 7,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        ],
    },
    {
        id: '4',
        translationKey: 'innsbruckChalet',
        rating: 9.4,
        reviews: 142,
        price: 680,
        pricePerNight: 97,
        nights: 7,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80',
            'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80',
            'https://images.unsplash.com/photo-1609688669309-fc15db557633?w=800&q=80',
        ],
    },
    {
        id: '5',
        translationKey: 'romeHistoric',
        rating: 9.5,
        reviews: 276,
        price: 520,
        pricePerNight: 74,
        nights: 7,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
            'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
            'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80',
        ],
    },
];

export default function WhereToGo() {
    const t = useTranslations('WhereToGo');
    
    return (
        <section className="py-12 dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                        {t('title')}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                        {t('dateRange')}
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {destinations.map((destination) => (
                                <CarouselItem key={destination.id} className="pl-4 basis-2/3 lg:basis-1/3 xl:basis-1/4 flex pb-8">
                                    <DestinationCard destination={destination} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-4 bg-white hover:bg-zinc-100" />
                        <CarouselNext className="hidden md:flex -right-4 bg-white hover:bg-zinc-100" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

function DestinationCard({ destination }: { destination: Destination }) {
    const t = useTranslations('WhereToGo');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
    };

    return (
        <div className="group cursor-pointer bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow my-4 h-full flex flex-col w-full">
            {/* Image Carousel */}
            <div className="relative h-64 overflow-hidden shrink-0">
                <Image
                    src={destination.images[currentImageIndex]}
                    alt={t(`destinations.${destination.translationKey}.title`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-2 transition-opacity">
                    <button
                        onClick={prevImage}
                        className="bg-black/50 p-2 rounded-full shadow-lg"
                        aria-label="Previous image"
                    >
                        <Icon icon="prime:chevron-left" className="w-4 h-4 text-white" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="bg-black/50 p-2 rounded-full shadow-lg"
                        aria-label="Next image"
                    >
                        <Icon icon="prime:chevron-right" className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                    {currentImageIndex + 1}/{destination.images.length}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 flex-1 flex flex-col">
                {/* Rating */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-sm">
                        {destination.rating}
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('exceptional')} ({destination.reviews} {t('reviews')})
                    </span>
                </div>

                {/* Title & Location */}
                <div className="shrink-0">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white line-clamp-2">
                        {t(`destinations.${destination.translationKey}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t(`destinations.${destination.translationKey}.location`)}
                    </p>
                </div>

                {/* Spacer to push price and fees to bottom */}
                <div className="flex-1"></div>

                {/* Price */}
                <div className="space-y-1 shrink-0">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-zinc-900 dark:text-white">€{destination.price}</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        €{destination.pricePerNight} {t('forNights', { nights: destination.nights })}
                    </p>
                </div>

                {/* Fees Included */}
                {destination.feesIncluded && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">{t('feesIncluded')}</p>
                )}
            </div>
        </div>
    );
}
