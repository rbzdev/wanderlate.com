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

type Property = {
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

const properties: Property[] = [
    {
        id: '1',
        translationKey: 'maldivesBungalow',
        rating: 9.7,
        reviews: 203,
        price: 480,
        pricePerNight: 240,
        nights: 2,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
        ],
    },
    {
        id: '2',
        translationKey: 'marrakechRiad',
        rating: 9.4,
        reviews: 156,
        price: 180,
        pricePerNight: 90,
        nights: 2,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1565031491910-e57fac031c41?w=800&q=80',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
        ],
    },
    {
        id: '3',
        translationKey: 'brazilHistoric',
        rating: 9.1,
        reviews: 89,
        price: 220,
        pricePerNight: 110,
        nights: 2,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
            'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80',
        ],
    },
    {
        id: '4',
        translationKey: 'seychellesVilla',
        rating: 9.8,
        reviews: 142,
        price: 650,
        pricePerNight: 325,
        nights: 2,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        ],
    },
    {
        id: '5',
        translationKey: 'santoriniSuite',
        rating: 9.6,
        reviews: 187,
        price: 420,
        pricePerNight: 210,
        nights: 2,
        feesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
            'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1138',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        ],
    },
];

export default function TravelersFavorites() {
    const t = useTranslations('TravelersFavorites');
    
    return (
        <section className="py-8 ">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
                        {t('title')}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        {t('dateRange')}
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative ">
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 pb-6">
                            {properties.map((property) => (
                                <CarouselItem key={property.id} className="pl-4 basis-2/3 lg:basis-1/3 xl:basis-1/4">
                                    <PropertyCard property={property} />
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

function PropertyCard({ property }: { property: Property }) {
    const t = useTranslations('TravelersFavorites');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    return (
        <div className="group cursor-pointer bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            {/* Image Carousel */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={property.images[currentImageIndex]}
                    alt={t(`properties.${property.translationKey}.title`)}
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
                    {currentImageIndex + 1}/{property.images.length}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-sm">
                        {property.rating}
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('exceptional')} ({property.reviews} {t('reviews')})
                    </span>
                </div>

                {/* Title & Location */}
                <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white line-clamp-2">
                        {t(`properties.${property.translationKey}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t(`properties.${property.translationKey}.location`)}
                    </p>
                </div>

                {/* Price */}
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-zinc-900 dark:text-white">€{property.price}</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        €{property.pricePerNight} {t('forNights', { nights: property.nights })}
                    </p>
                </div>

                {/* Fees Included */}
                {property.feesIncluded && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('feesIncluded')}</p>
                )}
            </div>
        </div>
    );
}
