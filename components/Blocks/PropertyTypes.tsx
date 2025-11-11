'use client';
import Image from "next/image";

// Internationalization
import { useTranslations } from 'next-intl';

interface PropertyType {
    id: string;
    name: string;
    descriptionKey: string;
    image: string;
}

const propertyTypes: PropertyType[] = [
    {
        id: "appartement",
        name: "Appartement",
        descriptionKey: "appartementDesc",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: "maison",
        name: "Maison",
        descriptionKey: "maisonDesc",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80"
    },
    {
        id: "hotel",
        name: "Hôtel",
        descriptionKey: "hotelDesc",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"
    },
    {
        id: "chalet",
        name: "Chalet",
        descriptionKey: "chaletDesc",
        image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&q=80"
    },
    {
        id: "maison-hotes",
        name: "Maison d'hôtes",
        descriptionKey: "maisonHotesDesc",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80"
    },
    {
        id: "unique",
        name: "Unique",
        descriptionKey: "uniqueDesc",
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/591469727.jpg?k=2c87b78d780a32ea7a14b8c82cbc276e3f8a76482065da6ed5416015c922649b&o=&hp=1"
    },
];

export default function PropertyTypes() {
    const t = useTranslations("PropertyTypes");

    return (
        <div className="w-full max-w-7xl mx-auto py-2">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8">
                {t('title')}
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {propertyTypes.map((type, idKey) => (
                    <div key={idKey} className="relative w-full h-42 sm:h-80 rounded-xl overflow-hidden group cursor-pointer">
                        
                        <Image
                            src={type.image}
                            alt={t(`properties.${type.id}`)}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        />
                        
                        {/* Overlay semi-transparent noir */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        {/* Textes */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                            <h3 className="font-semibold text-sm sm:text-lg mb-1">
                                {t(`properties.${type.id}`)}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                                {t(`descriptions.${type.descriptionKey}`)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>


            {/* Container avec scroll horizontal sur mobile */}
            {/* <div className="md:hidden overflow-x-auto -mx-6 px-6">
                <div className="flex gap-4 w-full h-80">
                    {propertyTypes.map((type) => (
                        <div
                            key={type.id}
                            className="relative shrink-0 w-[70%] snap-center rounded-xl overflow-hidden"
                        >
                            <Image
                                src={type.image}
                                alt={t(`properties.${type.id}`)}
                                height={400}
                                width={300}
                                className="object-cover w-full h-full"
                            /> */}

                            {/* Overlay semi-transparent noir */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div> */}
                            
                            {/* Textes */}
                            {/* <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h3 className="font-semibold text-lg mb-1">
                                    {t(`properties.${type.id}`)}
                                </h3>
                                <p className="text-sm text-white/90 line-clamp-2">
                                    {t(`descriptions.${type.descriptionKey}`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}
