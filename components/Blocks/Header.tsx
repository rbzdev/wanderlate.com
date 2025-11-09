import Image from "next/image";
import Book from "./Book";
import { Button } from "../ui/button";
import Link from "next/link";

// Internationalization
import { useTranslations,useLocale } from 'next-intl';

export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();

    const benefits = [
        {
            id: 1,
            translationKey: 'flightAlerts',
            imageUrl : "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 2,
            translationKey: 'comboSavings',
            imageUrl : "https://images.pexels.com/photos/3769121/pexels-photo-3769121.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            id: 3,
            translationKey: 'memberDiscounts',
            imageUrl : "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=600",
        }
    ]
    return (
        <header className="w-full px-4 sm:px-6 pt-24 pb-16  space-y-8">

            {/* Book Component */}
            <Book />

            {/* Membership spotlight */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-primary rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <Image
                        src={"/assets/onekey_box.svg"}
                        alt="onekey_box"
                        width={50}
                        height={50}
                        className=""
                    />

                    <div className="flex flex-col">
                        <p className="text-white font-semibold text-sm"> {t('memberBenefits.title')} </p> 
                    <p className="hidden sm:block text-white font-semibold text-sm">{t('memberBenefits.subtitle')} </p>
                    </div>
                </div>

                <Link href={`/${locale}/login`} className="w-full md:w-fit ">
                    <Button className="bg-secondary hover:bg-secondary/90 w-full md:w-fit">
                        {t('memberBenefits.signIn')}
                    </Button>
                </Link>
            </div>

            <div className="hidden md:flex gap-6">
                {benefits.map((benefit) => (
                    <div key={benefit.id} className="flex bg-primary rounded-lg overflow-hidden">
                        <p className="text-sm mt-2 text-white p-4">
                            {t(`advantages.${benefit.translationKey}`)}
                        </p>
                        <Image
                            src={benefit.imageUrl}
                            alt={t(`advantages.${benefit.translationKey}`)}
                            width={200}
                            height={200}
                            className=" w-1/3 h-32 object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Carousel for mobile */}
            <div className="md:hidden relative overflow-hidden">
                <div className="flex gap-1 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
                    {benefits.map((benefit) => (
                        <div key={benefit.id} className="shrink-0 w-[85%] snap-center bg-primary rounded-lg overflow-hidden flex">
                            <p className="text-sm mt-2 text-white p-2 font-semibold flex-1">
                                {t(`advantages.${benefit.translationKey}`)}
                            </p>
                            <Image
                                src={benefit.imageUrl}
                                alt={t(`advantages.${benefit.translationKey}`)}
                                width={200}
                                height={200}
                                className="w-28 h-42 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

        </header>
    );
}
