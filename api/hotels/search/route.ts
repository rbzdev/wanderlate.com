import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Configuration Hotelbeds API
const HOTELBEDS_API_URL = 'https://api.test.hotelbeds.com/hotel-api/1.0';
const API_KEY = process.env.HOTELBEDS_API_KEY || '';
const API_SECRET = process.env.HOTELBEDS_API_SECRET || '';

// Génération de la signature X-Signature pour Hotelbeds
function generateSignature(): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
        .createHash('sha256')
        .update(API_KEY + API_SECRET + timestamp)
        .digest('hex');
    
    return signature;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const {
            destination,
            checkIn,
            checkOut,
            adults = 2,
            children = 0,
            rooms = 1
        } = body;

        // Validation des paramètres requis
        if (!destination || !checkIn || !checkOut) {
            return NextResponse.json(
                { error: 'Missing required parameters: destination, checkIn, checkOut' },
                { status: 400 }
            );
        }

        // Construction de la requête Hotelbeds
        const hotelbedsRequest = {
            stay: {
                checkIn,
                checkOut
            },
            occupancies: Array.from({ length: rooms }, () => ({
                rooms: 1,
                adults,
                children: children || 0,
                ...(children > 0 && {
                    paxes: Array.from({ length: children }, () => ({
                        type: 'CH',
                        age: 8 // Age par défaut pour les enfants
                    }))
                })
            })),
            destination: {
                code: destination // Code destination Hotelbeds
            },
            filter: {
                maxRates: 50,
                minRate: 0,
                maxRate: 1000
            }
        };

        // Génération de la signature
        const signature = generateSignature();

        // Appel à l'API Hotelbeds
        const response = await fetch(`${HOTELBEDS_API_URL}/hotels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-key': API_KEY,
                'X-Signature': signature,
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip'
            },
            body: JSON.stringify(hotelbedsRequest)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Hotelbeds API Error:', errorData);
            return NextResponse.json(
                { error: 'Failed to fetch hotels from Hotelbeds', details: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Types pour les données Hotelbeds
        interface HotelbedsImage {
            path: string;
        }

        interface HotelbedsFacility {
            description?: { content?: string };
            facilityCode?: string;
        }

        interface HotelbedsHotel {
            code: string;
            name: string;
            destinationName?: string;
            zoneName?: string;
            categoryCode?: string;
            categoryName?: string;
            minRate?: number;
            maxRate?: number;
            currency?: string;
            images?: HotelbedsImage[];
            description?: { content?: string };
            facilities?: HotelbedsFacility[];
        }

        // Transformation des données Hotelbeds en format simplifié
        const hotels = data.hotels?.hotels?.map((hotel: HotelbedsHotel) => ({
            code: hotel.code,
            name: hotel.name,
            destinationName: hotel.destinationName || hotel.zoneName,
            categoryCode: hotel.categoryCode || '3',
            categoryName: hotel.categoryName || 'Hotel',
            minRate: hotel.minRate || 0,
            maxRate: hotel.maxRate || 0,
            currency: hotel.currency || 'EUR',
            images: hotel.images?.map((img: HotelbedsImage) => img.path) || [],
            description: hotel.description?.content || '',
            rating: parseFloat(hotel.categoryCode || '3'),
            reviewsCount: Math.floor(Math.random() * 500) + 50, // Placeholder
            amenities: hotel.facilities?.map((f: HotelbedsFacility) => f.description?.content || f.facilityCode || '') || []
        })) || [];

        return NextResponse.json({
            success: true,
            total: hotels.length,
            hotels
        });

    } catch (error) {
        console.error('Error in hotels search:', error);
        return NextResponse.json(
            { 
                error: 'Internal server error', 
                message: error instanceof Error ? error.message : 'Unknown error' 
            },
            { status: 500 }
        );
    }
}
