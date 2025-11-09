'use client';
import AnimatedBackground from "@/components/ui/animated-tabs";
import ButtonTab from "@/components/ui/button-tab";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, MapPin, Minus, Plus, Users } from "lucide-react";
import { DateRange } from "react-day-picker";

// Internationalization
import { useTranslations } from 'next-intl';

export default function Book() {
    const t = useTranslations("Book");
    const [activeTab, setActiveTab] = useState<string | null>("sejours");
    const [destination, setDestination] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [adultes, setAdultes] = useState(2);
    const [enfants, setEnfants] = useState(0);
    const [chambres, setChambres] = useState(1);

    // Suggestions de destinations
    const destinations = [
        "Paris, France",
        "Londres, Royaume-Uni",
        "Rome, Italie",
        "Barcelone, Espagne",
        "Amsterdam, Pays-Bas",
        "Berlin, Allemagne",
        "Lisbonne, Portugal",
        "Athènes, Grèce",
        "Prague, République tchèque",
        "Vienne, Autriche"
    ];

    const filteredDestinations = destinations.filter(dest =>
        dest.toLowerCase().includes(destination.toLowerCase())
    );

    return (
        <div className="w-full mx-auto">
            <div className=" rounded-2xl ">

                {/* Animated Tabs */}
                <div className="flex justify-between bg-zinc-200 dark:bg-zinc-800 rounded-sm text-sm! ">
                    <AnimatedBackground
                        defaultValue="sejours"
                        onValueChange={setActiveTab}
                        className="bg-primary rounded-sm shadow-sm"
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        <ButtonTab data-id="sejours">
                            {t('tabs.stays')}
                        </ButtonTab>
                        <ButtonTab data-id="vols">
                            {t('tabs.flights')}
                        </ButtonTab>
                        <ButtonTab data-id="voitures">
                            {t('tabs.cars')}
                        </ButtonTab>
                        <ButtonTab data-id="formules">
                            {t('tabs.packages')}
                        </ButtonTab>
                        <ButtonTab data-id="activites">
                            {t('tabs.activities')}
                        </ButtonTab>
                    </AnimatedBackground>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {/* Séjours Tab Content */}
                    {activeTab === "sejours" && (
                        <div className="space-y-6 p-6 py-8 rounded-xl shadow-2xl bg-white dark:bg-zinc-900">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between ">
                                {/* Destination avec suggestions */}
                                <div className="space-y-2 relative w-full">
                                    <Label htmlFor="destination">
                                        {t('labels.destination')}
                                    </Label>
                                    <Input
                                        id="destination"
                                        type="text"
                                        placeholder={t('placeholders.whereTo')}
                                        value={destination}
                                        onChange={(e) => {
                                            setDestination(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    />
                                    {showSuggestions && destination && filteredDestinations.length > 0 && (
                                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredDestinations.map((dest, index) => (
                                                <button
                                                    key={index}
                                                    className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
                                                    onClick={() => {
                                                        setDestination(dest);
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    <MapPin className="w-4 h-4 text-zinc-400" />
                                                    {dest}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Arrivée/Départ avec calendrier sur 2 mois */}
                                <div className="space-y-2 w-full">
                                    <Label htmlFor="date-range">
                                        {t('labels.checkInOut')}
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal focus:border-secondary focus:ring-[1px] ring-secondary"
                                            >
                                                <CalendarIcon className="mr-2 text-xl text-gray-500" />
                                                {dateRange?.from ? (
                                                    dateRange.to ? (
                                                        <>
                                                            {format(dateRange.from, "d MMM", { locale: fr })} - {format(dateRange.to, "d MMM yyyy", { locale: fr })}
                                                        </>
                                                    ) : (
                                                        format(dateRange.from, "d MMM yyyy", { locale: fr })
                                                    )
                                                ) : (
                                                    <span className="text-muted-foreground">{t('placeholders.selectDates')}</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="range"
                                                selected={dateRange}
                                                onSelect={setDateRange}
                                                numberOfMonths={2}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Voyageurs */}
                                <div className="space-y-2 w-full">
                                    <Label htmlFor="voyageurs">
                                        {t('labels.travelers')}
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal focus:border-secondary focus:ring-[1px] ring-secondary"
                                            >
                                                <Users className="mr-2 text-xl text-gray-500" />
                                                <span className="text-muted-foreground">
                                                    {adultes + enfants} {adultes + enfants === 1 ? t('travelers.traveler') : t('travelers.travelers')}, {chambres} {chambres === 1 ? t('travelers.room') : t('travelers.rooms')}
                                                </span>

                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80" align="start">
                                            <div className="space-y-4">
                                                {/* Adultes */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{t('travelers.adults')}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full"
                                                            onClick={() => setAdultes(Math.max(1, adultes - 1))}
                                                            disabled={adultes <= 1}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="w-8 text-center">{adultes}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full"
                                                            onClick={() => setAdultes(adultes + 1)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Enfants */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <p className="font-medium">{t('travelers.children')}</p>
                                                        <p className="text-xs text-muted-foreground">{t('travelers.childrenAge')}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full"
                                                            onClick={() => setEnfants(Math.max(0, enfants - 1))}
                                                            disabled={enfants <= 0}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="w-8 text-center">{enfants}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full"
                                                            onClick={() => setEnfants(enfants + 1)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Chambres */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{t('travelers.roomsLabel')}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full"
                                                            onClick={() => setChambres(Math.max(1, chambres - 1))}
                                                            disabled={chambres <= 1}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="w-8 text-center">{chambres}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full"
                                                            onClick={() => setChambres(chambres + 1)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Bouton de recherche */}
                                <div className="space-y-2 w-full">
                                    <Label className="invisible">Rechercher</Label>
                                    <Button className="w-full gap-2" size="lg">
                                        <Icon icon="lucide:search" className=" text-xl" />
                                        {t('buttons.search')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === "vols" && (
                        <div className=" h-42 flex items-center justify-center p-4 rounded-2xl shadow-2xl">

                            <div className="flex items-center gap-2 p-2 border border-primary rounded-sm">
                                <Icon icon="lucide:plane" className="text-primary text-xl" />
                                <p className="font-semibold"> {t('comingSoon')} </p>
                            </div>

                        </div>
                    )}

                    {activeTab === "voitures" && (
                        <div className=" h-42 flex items-center justify-center p-4 rounded-2xl shadow-2xl">

                            <div className="flex items-center gap-2 p-2 border border-primary rounded-sm">
                                <Icon icon="lucide:car" className="text-primary text-xl" />
                                <p className="font-semibold"> {t('comingSoon')} </p>
                            </div>

                        </div>
                    )}
                    {activeTab === "formules" && (
                        <div className=" h-42 flex items-center justify-center p-4 rounded-2xl shadow-2xl">

                            <div className="flex items-center gap-2 p-2 border border-primary rounded-sm">
                                <Icon icon="fluent:box-16-regular" className="text-primary text-xl" />
                                <p className="font-semibold"> {t('comingSoon')} </p>
                            </div>

                        </div>
                    )}
                    {activeTab === "activites" && (
                        <div className=" h-42 flex items-center justify-center p-4 rounded-2xl shadow-2xl">

                            <div className="flex items-center gap-2 p-2 border border-primary rounded-sm">
                                <Icon icon="mingcute:heartbeat-line" className="text-primary text-xl" />
                                <p className="font-semibold"> {t('comingSoon')} </p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
