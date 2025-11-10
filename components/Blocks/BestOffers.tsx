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
import { url } from 'inspector';

type Offer = {
    id: string;
    translationKey: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice: number;
    pricePerNight: number;
    images: string[];
    vipAccess?: boolean;
    memberPriceAvailable?: boolean;
    taxesIncluded?: boolean;
};

const offers: Offer[] = [
    {
        id: '1',
        translationKey: 'saintTropez',
        rating: 9.8,
        reviews: 127,
        price: 545,
        originalPrice: 700,
        pricePerNight: 109,
        vipAccess: true,
        memberPriceAvailable: true,
        taxesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        ],
    },
    {
        id: '2',
        translationKey: 'bali',
        rating: 9.2,
        reviews: 98,
        price: 320,
        originalPrice: 400,
        pricePerNight: 80,
        memberPriceAvailable: true,
        taxesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        ],
    },
    {
        id: '3',
        translationKey: 'zermatt',
        rating: 9.1,
        reviews: 76,
        price: 410,
        originalPrice: 500,
        pricePerNight: 102,
        vipAccess: true,
        taxesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80',
            'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80',
            'https://images.unsplash.com/photo-1609688669309-fc15db557633?w=800&q=80',
        ],
    },
    {
        id: '4',
        translationKey: 'paris',
        rating: 8.7,
        reviews: 54,
        price: 220,
        originalPrice: 270,
        pricePerNight: 55,
        memberPriceAvailable: true,
        taxesIncluded: true,
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80',
        ],
    },
    {
        id: '5',
        translationKey: 'venice',
        rating: 9.2,
        reviews: 54,
        price: 350,
        originalPrice: 420,
        pricePerNight: 88,
        memberPriceAvailable: false,
        taxesIncluded: true,
        images: [
            'https://www.alponteantico.com/wp-content/uploads/2015/06/palazzo.jpg',
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/14431277.jpg?k=4f151cdc0e2df59b62c4d08190e161d4bd4b1eb16bc2ce4b2d1d0be0f06cd3d4&o=&hp=1',
        ],
    },
    {
        id: '6',
        translationKey: 'barcelona',
        rating: 8.9,
        reviews: 54,
        price: 180,
        originalPrice: 210,
        pricePerNight: 45,
        memberPriceAvailable: false,
        taxesIncluded: true,
        images: [
            'https://www.notreloft.com/images/2019/05/loft-barcelone-theatre-00300.jpg',
            'https://www.urbanegroup.es/media/properties/399/399_1728471687584.jpg',
        ],
    },
    {
        id: '7',
        translationKey: 'amsterdam',
        rating: 8.1,
        reviews: 39,
        price: 260,
        originalPrice: 300,
        pricePerNight: 65,
        memberPriceAvailable: false,
        taxesIncluded: true,
        images: [
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/736915774.jpg?k=870b9deaa09407db80e09842257390bc5db39f05eab259e1d31bb7f2ace1da09&o=&hp=1',
            'https://media.vrbo.com/lodging/34000000/33600000/33593500/33593494/47e12fcc.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        ],
    },
];

export default function BestOffers() {
    const t = useTranslations('BestOffers');
    
    return (
        <section 
        className="py-8 my-8 px-0 sm:px-6 rounded-2xl" 
        style={{
            background: `
                linear-gradient(to bottom right, rgb(51 65 85 / 0.9), rgb(71 85 105 / 0.8), rgb(100 116 139 / 0.7)),
                url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="mb-8 px-4 sm:px-0 shadow-lg rounded-lg ">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {t('title')}
                    </h2> 
                    <p className="text-white/80 text-lg">
                        {t('dateRange')}
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative px-4 sm:px-0">
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {offers.map((offer) => (
                                <CarouselItem key={offer.id} className="pl-4 basis-2/3 lg:basis-1/3 xl:basis-1/4">
                                    <OfferCard offer={offer} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12 bg-white hover:bg-zinc-100" />
                        <CarouselNext className="hidden md:flex -right-12 bg-white hover:bg-zinc-100" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

function OfferCard({ offer }: { offer: Offer }) {
    const t = useTranslations('BestOffers');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % offer.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + offer.images.length) % offer.images.length);
    };

    return (
        <div className="group cursor-pointer bg-white/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            {/* Image Carousel */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={offer.images[currentImageIndex]}
                    alt={t(`offers.${offer.translationKey}.title`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* VIP Access Badge */}
                {offer.vipAccess && (
                    <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-md flex items-center gap-1 text-xs font-semibold">
                        <Icon icon="lucide:star" className="w-3 h-3" />
                        {t('vipAccess')}
                    </div>
                )}

                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={prevImage}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                        <Icon icon="prime:chevron-left" className="w-4 h-4" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                        <Icon icon="prime:chevron-right" className="w-4 h-4" />
                    </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                    {currentImageIndex + 1}/{offer.images.length}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Location */}
                <div>
                    <p className="text-sm text-zinc-600">{t(`offers.${offer.translationKey}.location`)}, {t(`offers.${offer.translationKey}.country`)}</p>
                    <h3 className="text-lg font-semibold text-black line-clamp-2">
                        {t(`offers.${offer.translationKey}.title`)}
                    </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="bg-green-400 text-white px-2 py-1 rounded-md text-sm">
                        {offer.rating}
                    </div>
                    <div className="flex text-xs">
                        <span className=" text-black">{t(`offers.${offer.translationKey}.reviewLabel`)}</span>
                        <span className=" text-zinc-500">({offer.reviews} {t('reviews')})</span>
                    </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-black">{offer.price} €</span>
                        <span className="text-sm text-zinc-500 line-through">{offer.originalPrice} €</span>
                    </div>
                    <p className="text-xs text-zinc-600">{offer.pricePerNight} € {t('perNight')}</p>
                </div>

                {/* Member Price Badge */}
                {offer.memberPriceAvailable && (
                    <div className="flex items-center text-xs w-fit bg-primary text-white py- px-2 rounded-sm font-light">
                        <Icon icon="mdi:star-four-points-small" className="text-3xl" />
                        {t('memberPrice')}
                    </div>
                )}

                {/* Taxes Included */}
                {offer.taxesIncluded && (
                    <p className="text-xs text-zinc-500">{t('taxesIncluded')}</p>
                )}
            </div>
        </div>
    );
}
