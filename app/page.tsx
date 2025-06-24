"use client";

import { useEffect, useState } from "react";
import BottomSheet from "@/components/bottom-sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Phone, Globe, ChevronUp } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [snapPoint, setSnapPoint] = useState<"closed" | "half" | "full">(
    "closed"
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleOpenSheet = () => {
    setIsOpen(true);
    setSnapPoint("half");
  };

  const handleSnapPointChange = (point: "closed" | "half" | "full") => {
    setSnapPoint(point);
    if (point === "closed") {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Bottom Sheet Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Interactive bottom sheet with multiple snap points and spring
            animations
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button onClick={handleOpenSheet} size="lg">
              Open Restaurant Details
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSnapPointChange("half")}
              disabled={!isOpen}
            >
              Half Open
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSnapPointChange("full")}
              disabled={!isOpen}
            >
              Full Open
            </Button>
          </div>
        </div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleOpenSheet}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  R
                </div>
                The Garden Bistro
              </CardTitle>
              <CardDescription>Fine dining experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">(324 reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Downtown District</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleOpenSheet}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                  C
                </div>
                Cozy Corner Cafe
              </CardTitle>
              <CardDescription>Coffee & light bites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.6</span>
                <span className="text-gray-500">(189 reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Arts Quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleOpenSheet}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                Sunset Rooftop
              </CardTitle>
              <CardDescription>Cocktails & city views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-gray-500">(567 reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Skyline District</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChevronUp className="w-5 h-5" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>Tap/Click:</strong> Click on any restaurant card or the
              "Open Restaurant Details" button
            </p>
            <p>
              <strong>Drag:</strong> Drag the handle or sheet content up/down to
              change positions
            </p>
            <p>
              <strong>Snap Points:</strong> The sheet snaps to three positions -
              closed, half-open, and fully open
            </p>
            <p>
              <strong>Buttons:</strong> Use the control buttons to manually set
              snap points
            </p>
            <p>
              <strong>Responsive:</strong> Works on both desktop and mobile
              devices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isOpen}
        snapPoint={snapPoint}
        onSnapPointChange={handleSnapPointChange}
        onClose={() => {
          setIsOpen(false);
          setSnapPoint("closed");
        }}
      >
        <div className="p-6">
          {/* Restaurant Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                The Garden Bistro
              </h2>
              <p className="text-gray-600 mb-2">
                Fine dining experience with seasonal ingredients
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500">(324 reviews)</span>
                </div>
                <Badge variant="secondary">$$$$</Badge>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-semibold text-sm">Open Now</p>
                <p className="text-xs text-gray-600">Until 11:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-semibold text-sm">2.1 km away</p>
                <p className="text-xs text-gray-600">Downtown District</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-semibold text-sm">Call</p>
                <p className="text-xs text-gray-600">(555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button className="flex-1">Reserve Table</Button>
            <Button variant="outline" className="flex-1">
              View Menu
            </Button>
            <Button variant="outline" size="icon">
              <Globe className="w-4 h-4" />
            </Button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed">
              The Garden Bistro offers an exceptional fine dining experience
              featuring seasonal ingredients sourced from local farms. Our
              chef-driven menu changes quarterly to showcase the best flavors of
              each season, paired with an extensive wine collection and craft
              cocktails.
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Features</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Outdoor Seating</Badge>
              <Badge variant="outline">Wine Bar</Badge>
              <Badge variant="outline">Private Dining</Badge>
              <Badge variant="outline">Vegan Options</Badge>
              <Badge variant="outline">Parking Available</Badge>
              <Badge variant="outline">Reservations</Badge>
            </div>
          </div>

          {/* Hours */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday - Saturday</span>
                <span>5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>4:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Reviews Preview */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Recent Reviews</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-sm">Sarah M.</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <p className="text-sm text-gray-600">
                  "Absolutely incredible dining experience! The seasonal menu
                  was creative and every dish was perfectly executed."
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-sm">Mike R.</span>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <p className="text-sm text-gray-600">
                  "Great atmosphere and service. The wine pairing
                  recommendations were spot on!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
