"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Star, Bus, Clock, Users, MapPin, Phone, BusFrontIcon, Fullscreen, RabbitIcon } from "lucide-react"
import { stations, buses } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function EnhancedSmartBusTracker() {
    const [selectedStation, setSelectedStation] = useState<string | null>(null)
    const [filteredBuses, setFilteredBuses] = useState(buses)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const savedStation = localStorage.getItem("selectedStation")
        if (savedStation) {
            setSelectedStation(savedStation)
            filterBuses(savedStation)
        }
    }, [])

    const handleStationSelect = (stationName: string) => {
        setSelectedStation(stationName)
        localStorage.setItem("selectedStation", stationName)
        filterBuses(stationName)
        setOpen(false)
    }

    const filterBuses = (stationName: string) => {
        const filtered = buses.filter(bus => bus.route.some(stop => stop.stop === stationName))
        setFilteredBuses(filtered)
    }

    return (
        <div className="container mx-auto p-4 ">
            <div className="flex flex-col justify-between items-center mb-6 gap-4">
                <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
                    <DialogTrigger asChild>
                        <Button className="">
                            {selectedStation ? "Change Bus Station" : "Select Bus Station"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Choose a Bus Station</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[300px]">
                            {stations.map((station) => (
                                <Button
                                    key={station.id}
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => handleStationSelect(station.name)}
                                >
                                    <BusFrontIcon className="w-4 h-4 mr-2" /> {station.name}
                                </Button>
                            ))}
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>

            {selectedStation && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Buses arriving at
                        <span className="text-primary px-1">
                            {selectedStation}
                        </span>
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {
                            filteredBuses.length === 0 && (
                                <div className="w-full h-72 flex flex-col items-center justify-center">
                                    <RabbitIcon className="w-16 h-16 text-gray-300" />
                                    <p className="font-muted-foreground text-sm">
                                        No buses arriving at this station.
                                    </p>
                                </div>)
                        }
                        {filteredBuses.map((bus) => (
                            <Card key={bus.id} className="overflow-hidden">
                                <CardHeader className={cn(
                                    `text-background`,
                                    `bg-foreground`
                                )}>
                                    <CardTitle className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <Bus className="mr-2" />
                                            Bus {bus.number}
                                        </span>
                                        <span className="text-sm font-normal">{bus.arrivalTime}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div className="flex items-center">
                                            <span className="mr-2 w-4 h-4 text-green-600 font-bold">₹</span>
                                            Fare: ₹{bus.fare}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="mr-2 w-4 h-4 text-blue-600" />
                                            Crowd: {bus.crowdLevel}
                                        </div>
                                        <div className="flex items-center col-span-2">
                                            <Clock className="mr-2 w-4 h-4 text-purple-600" />
                                            Fullness: {bus.fullness}%
                                        </div>
                                    </div>
                                    <Progress value={bus.fullness} className="mb-4 h-[5px]" />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full">View Route & Reviews</Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-80">
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-lg">Bus Route</h3>
                                                <div className="space-y-2">
                                                    {bus.route.map((stop, index) => (
                                                        <div key={index} className="flex items-center">
                                                            <div className={`w-6 h-6 rounded-full ${stop.visited ? "bg-amber-500" : 'dark:bg-gray-700 bg-gray-300'} mr-2`} />
                                                            <div className="flex-grow">
                                                                <p className={`font-medium ${stop.visited ? 'text-foreground' : 'text-gray-500'}`}>{stop.stop}</p>
                                                            </div>
                                                            {index < bus.route.length - 1 && (
                                                                <div className="w-0.5 h-4 bg-gray-300 ml-3" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <Progress value={bus.routeProgress} className="mt-2 h-[5px]" />
                                                <h3 className="font-semibold text-lg mt-4">Reviews</h3>
                                                <div className="space-y-2">
                                                    {bus.reviews.map((review, index) => (
                                                        <div key={index} className="border-b pb-2">
                                                            <div className="flex items-center">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                                ))}
                                                            </div>
                                                            <p className="text-sm mt-1">{review.comment}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}