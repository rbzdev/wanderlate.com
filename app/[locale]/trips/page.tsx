'use client';

import { useState } from 'react';
import NavBar from '@/components/Blocks/NavBar';
import Book from '@/components/Blocks/Book';
import Footer from '@/components/Blocks/Footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Type pour les hôtels Hotelbeds
type Hotel = {
    code: string;
    name: string;
    destinationName: string;
    categoryCode: string;
    categoryName: string;
    minRate: number;
    maxRate: number;
    currency: string;
    images: string[];
    description: string;
    rating: number;
    reviewsCount: number;
    amenities: string[];
};

export default function TripsPage() {
    const t = useTranslations('Trips');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

    // Fonction de recherche d'hôtels via Hotelbeds
    const searchHotels = async (searchParams: {
        destination: string;
        checkIn: string;
        checkOut: string;
        adults: number;
        children: number;
        rooms: number;
    }) => {
        setLoading(true);
        try {
            const response = await fetch('/api/hotels/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchParams),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch hotels');
            }

            const data = await response.json();
            setHotels(data.hotels || []);
            setFilteredHotels(data.hotels || []);
        } catch (error) {
            console.error('Error searching hotels:', error);
            setHotels([]);
            setFilteredHotels([]);
        } finally {
            setLoading(false);
        }
    };

    // Filtrage par prix
    const handlePriceFilter = () => {
        const filtered = hotels.filter(
            (hotel) => hotel.minRate >= priceRange[0] && hotel.minRate <= priceRange[1]
        );
        setFilteredHotels(filtered);
    };

    // Réinitialiser les filtres
    const resetFilters = () => {
        setPriceRange([0, 1000]);
        setFilteredHotels(hotels);
    };

    return (
        <div className="min-h-screen px-4 sm:px-8 overflow-x-hidden">
            <NavBar />

            <div className="max-w-7xl mx-auto py-8">
                {/* Search Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
                        {t('title')}
                    </h1>
                    <Book />
                </div>

                {/* Filters and Results */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                                {t('filters.title')}
                            </h2>

                            {/* Price Range Filter */}
                            <div className="space-y-4 mb-6">
                                <Label className="text-base font-medium">
                                    {t('filters.priceRange')}
                                </Label>
                                <div className="space-y-4">
                                    <Slider
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        max={1000}
                                        step={10}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                                        <span>€{priceRange[0]}</span>
                                        <span>€{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="space-y-3">
                                <Button
                                    onClick={handlePriceFilter}
                                    className="w-full"
                                >
                                    <Icon icon="lucide:filter" className="mr-2" />
                                    {t('filters.apply')}
                                </Button>
                                <Button
                                    onClick={resetFilters}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Icon icon="lucide:x" className="mr-2" />
                                    {t('filters.reset')}
                                </Button>
                            </div>

                            {/* Additional Filters Placeholder */}
                            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {t('filters.starRating')}
                                        </span>
                                        <Icon icon="lucide:chevron-down" className="text-zinc-400" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {t('filters.amenities')}
                                        </span>
                                        <Icon icon="lucide:chevron-down" className="text-zinc-400" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {t('filters.boardType')}
                                        </span>
                                        <Icon icon="lucide:chevron-down" className="text-zinc-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <Icon icon="lucide:loader-2" className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                                    <p className="text-zinc-600 dark:text-zinc-400">{t('loading')}</p>
                                </div>
                            </div>
                        ) : filteredHotels.length > 0 ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        {t('results.found', { count: filteredHotels.length })}
                                    </p>
                                    <Button variant="outline" size="sm">
                                        <Icon icon="lucide:arrow-up-down" className="mr-2" />
                                        {t('results.sortBy')}
                                    </Button>
                                </div>

                                {filteredHotels.map((hotel) => (
                                    <HotelCard key={hotel.code} hotel={hotel} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-12 text-center">
                                <Icon icon="lucide:search-x" className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                                    {t('noResults.title')}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                    {t('noResults.description')}
                                </p>
                                <Button onClick={resetFilters}>
                                    {t('noResults.tryAgain')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
    const t = useTranslations('Trips');

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hotel Image */}
                <div className="relative h-64 md:h-auto">
                    <Image
                        src={hotel.images[0] || '/placeholder-hotel.jpg'}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-800/90 px-3 py-1 rounded-md">
                        <div className="flex items-center gap-1">
                            <Icon icon="lucide:star" className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-sm">{hotel.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Hotel Info */}
                <div className="md:col-span-2 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                                {hotel.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                                <Icon icon="lucide:map-pin" className="w-4 h-4" />
                                <span>{hotel.destinationName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(parseInt(hotel.categoryCode))].map((_, i) => (
                                    <Icon
                                        key={i}
                                        icon="lucide:star"
                                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                                {t('hotelCard.from')}
                            </p>
                            <p className="text-3xl font-bold text-primary">
                                {hotel.currency}{hotel.minRate}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {t('hotelCard.perNight')}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                        {hotel.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 4).map((amenity, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-300"
                            >
                                {amenity}
                            </span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button className="flex-1">
                            {t('hotelCard.viewDetails')}
                        </Button>
                        <Button variant="outline">
                            <Icon icon="lucide:heart" className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
