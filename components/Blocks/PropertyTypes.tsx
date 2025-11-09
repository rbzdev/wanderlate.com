'use client';
import Image from "next/image";

// Internationalization
import { useTranslations } from 'next-intl';

interface PropertyType {
    id: string;
    name: string;
    image: string;
}

const propertyTypes: PropertyType[] = [
    {
        id: "appartement",
        name: "Appartement",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: "ferme",
        name: "Ferme",
        image: "https://medias.logishotels.com/property-images/196512/facade/retro/grand/logis-hotel-la-ferme-de-flaran-facade-valence-sur-baise-399662.jpg"
    },
    {
        id: "bateau",
        name: "Bateau maison",
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/591469727.jpg?k=2c87b78d780a32ea7a14b8c82cbc276e3f8a76482065da6ed5416015c922649b&o=&hp=1"
    },
    {
        id: "appart-hotel",
        name: "Appart'Hotel",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: "spa",
        name: "Spa",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/7c/5d/38/hotel-spa-vilamont.jpg"
    },
];

export default function PropertyTypes() {
    const t = useTranslations("PropertyTypes");

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-2">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8">
                {t('title')}
            </h2>

            <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-6">
                {propertyTypes.map((type, idKey) => (
                    <div key={idKey} className="relative  w-full h-72 rounded-xl overflow-hidden group cursor-pointer">
                        
                        <Image
                            src={type.image}
                            alt={t(`properties.${type.id}`)}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        />
                        <p className="absolute bottom-0 p-4 font-semibold text-white">
                                {t(`properties.${type.id}`)}
                            </p>
                    </div>
                ))}
            </div>


            {/* Container avec scroll horizontal sur mobile */}
            <div className="md:hidden overflow-x-auto -mx-6 px-6">
                <div className="flex justify-between gap-1 lg:gap-6 w-full h-72">
                    {propertyTypes.map((type) => (
                        <div
                            key={type.id}
                            className="relative shrink-0 w-[60%] snap-center bg-primary rounded-lg overflow-hidden flex"
                        >
                            <Image
                                src={type.image}
                                alt={t(`properties.${type.id}`)}
                                height={200}
                                width={150}
                                className="object-cover w-full h-full"
                            />

                            <p className="absolute bottom-0 p-4 font-semibold text-white">
                                {t(`properties.${type.id}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
