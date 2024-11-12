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
import { Star, Bus, Clock, Users, MapPin, Phone, BusFrontIcon } from "lucide-react"

// Mock data for stations and buses
const stations = [
    { id: 1, name: "Connaught Place" },
    { id: 2, name: "India Gate" },
    { id: 3, name: "Chandni Chowk" },
    { id: 4, name: "Lajpat Nagar" },
    { id: 5, name: "Karol Bagh" },
    { id: 6, name: "Nehru Place" },
    { id: 7, name: "Saket" },
    { id: 8, name: "Dwarka" },
    { id: 9, name: "Rohini" },
    { id: 10, name: "Janakpuri" },
]

const buses = [
    {
        id: 1,
        number: "DTC 423",
        fare: 30,
        crowdLevel: "Medium",
        fullness: 65,
        arrivalTime: "3 min",
        color: "bg-blue-500",
        route: [
            { stop: "Connaught Place", visited: true },
            { stop: "Mandi House", visited: true },
            { stop: "Pragati Maidan", visited: false },
            { stop: "ITO", visited: false },
            { stop: "Delhi Gate", visited: false },
            { stop: "Jama Masjid", visited: false },
        ],
        routeProgress: 33,
        reviews: [
            { rating: 4, comment: "Clean and usually on time" },
            { rating: 3, comment: "Can get crowded during peak hours" },
        ],
    },
    {
        id: 2,
        number: "DTC 581",
        fare: 25,
        crowdLevel: "Low",
        fullness: 40,
        arrivalTime: "7 min",
        color: "bg-green-500",
        route: [
            { stop: "India Gate", visited: true },
            { stop: "Udyog Bhawan", visited: true },
            { stop: "Patel Chowk", visited: true },
            { stop: "Central Secretariat", visited: false },
            { stop: "Janpath", visited: false },
        ],
        routeProgress: 60,
        reviews: [
            { rating: 5, comment: "Very comfortable ride" },
            { rating: 4, comment: "Friendly driver" },
        ],
    },
    {
        id: 3,
        number: "DTC 724",
        fare: 35,
        crowdLevel: "High",
        fullness: 90,
        arrivalTime: "1 min",
        color: "bg-red-500",
        route: [
            { stop: "Chandni Chowk", visited: true },
            { stop: "Chawri Bazar", visited: true },
            { stop: "New Delhi", visited: false },
            { stop: "Rajiv Chowk", visited: false },
            { stop: "Barakhamba Road", visited: false },
        ],
        routeProgress: 40,
        reviews: [
            { rating: 2, comment: "Always packed, needs more frequent service" },
            { rating: 3, comment: "Punctual but uncomfortable during rush hour" },
        ],
    },
    {
        id: 4,
        number: "DTC 340",
        fare: 20,
        crowdLevel: "Medium",
        fullness: 70,
        arrivalTime: "5 min",
        color: "bg-yellow-500",
        route: [
            { stop: "Lajpat Nagar", visited: true },
            { stop: "Moolchand", visited: true },
            { stop: "Defence Colony", visited: false },
            { stop: "AIIMS", visited: false },
            { stop: "Green Park", visited: false },
        ],
        routeProgress: 40,
        reviews: [
            { rating: 4, comment: "Good connectivity to major areas" },
            { rating: 3, comment: "Decent service, could be cleaner" },
        ],
    },
]

export default function EnhancedSmartBusTracker() {
    const [selectedStation, setSelectedStation] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const savedStation = localStorage.getItem("selectedStation")
        if (savedStation) {
            setSelectedStation(savedStation)
        }
    }, [])

    const handleStationSelect = (stationName: string) => {
        setSelectedStation(stationName)
        localStorage.setItem("selectedStation", stationName)
        setOpen(false)
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
                        {buses.map((bus) => (
                            <Card key={bus.id} className="overflow-hidden">
                                <CardHeader className={`${bus.color} text-white`}>
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
                                                            <div className={`w-6 h-6 rounded-full ${stop.visited ? bus.color : 'bg-gray-300'} mr-2`} />
                                                            <div className="flex-grow">
                                                                <p className={`font-medium ${stop.visited ? 'text-black' : 'text-gray-500'}`}>{stop.stop}</p>
                                                            </div>
                                                            {index < bus.route.length - 1 && (
                                                                <div className="w-0.5 h-4 bg-gray-300 ml-3" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <Progress value={bus.routeProgress} className="mt-2 h-[5px]"  />
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