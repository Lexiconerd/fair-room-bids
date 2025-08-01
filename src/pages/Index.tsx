import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, DollarSign, Award, ExternalLink } from "lucide-react";

// Import room images
import roomAImage from "@/assets/room-a.jpg";
import roomA2Image from "@/assets/room-a-2.jpg";
import roomA3Image from "@/assets/room-a-3.jpg";
import roomBImage from "@/assets/room-b.jpg";
import roomB2Image from "@/assets/room-b-2.jpg";
import roomCImage from "@/assets/room-c.jpg";
import roomDImage from "@/assets/room-d.jpg";
import roomEImage from "@/assets/room-e.jpg";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const rooms = [
    {
      letter: "Primary",
      name: "Primary Bedroom",
      image: roomAImage,
      features: ["King Bed", "En-suite Bathroom", "Outdoor Deck"],
      description: "Wake up to sweeping mountain vistas in this luxurious main-level suite with king bed and access to a private deck.",
      highlight: "First Pick Choice"
    },
    {
      letter: "1", 
      name: "Bedroom 1",
      image: [roomBImage, roomB2Image],
      features: ["Exposed Brick", "Queen Bed", "Reading Nook", "Ambient Lighting"],
      description: "Industrial charm meets comfort in this unique loft space with exposed brick walls and cozy atmosphere."
    },
    {
      letter: "2",
      name: "Bedroom 2", 
      image: roomCImage,
      features: ["Walk-in Closet", "Marble Bathroom", "Chandelier", "Sitting Area"],
      description: "Indulge in luxury with this elegant suite featuring premium finishes and sophisticated decor."
    },
    {
      letter: "3",
      name: "Bedroom 3",
      image: roomDImage, 
      features: ["High Ceilings", "Floor-to-ceiling Windows", "Minimalist Design", "City View"],
      description: "Contemporary design meets urban sophistication in this sleek industrial-style bedroom."
    },
    {
      letter: "4",
      name: "Bedroom 4",
      image: roomEImage,
      features: ["Garden Access", "French Doors", "Natural Materials", "Morning Light"],
      description: "Connect with nature in this serene room featuring direct garden access and natural botanical elements."
    },
    {
      letter: "5",
      name: "Bedroom 5 (Singles)",
      image: [roomA2Image,roomA3Image],
      features: ["Twin Beds", "Shared Space", "Garden View", "Natural Light"],
      description: "Comfortable twin-bed accommodation for singles, featuring garden views and natural light."
    }
  ];

  const features = [
    {
      icon: Award,
      title: "I Love Capitalism",
      description: "Let the pricing algorithm ensure that the value extractive nature of society work for you."
    },
    {
      icon: DollarSign, 
      title: "First-Come, First-Serve Sucks",
      description: "I really dislike it when people get the best rooms just because they showed up first."
    },
    {
      icon: Users,
      title: "Single People Sad",
      description: "The system recognizes the universal truth that single people get screwed in group stay situations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="mb-8">
          <img 
            src={heroImage} 
            alt="Erik's Ranch - Montana guest lodge near Yellowstone" 
            className="w-full object-cover max-h-[75vh]"
          />
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Montana Here We Come
            </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Erik’s Ranch is a stunning, 100-acre nonprofit guest lodge near Yellowstone,
            offering upscale accommodations and unforgettable experiences.
            <br/>
            <br/>
            But before all of that, Jay&#8212;Kathleen washes her hands of it&#8212;would like
            you to price your willingness (or lack thereof) to pay for a better room.
          </p>
          <div className="mb-6">
            <a 
              href="https://www.airbnb.com/rooms/10743612" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              View Full Airbnb Listing <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/algorithm">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Learn How It Works <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/bidding">
              <Button size="lg" variant="outline">
                Start Bidding
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Why Are You Subjecting Your Friends to This?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center bg-card border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Room Showcase */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Available Rooms</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            6 bedrooms total: Primary bedroom (1st pick), bedrooms 1-4 (picks 2-5), and bedroom 5 (twins for singles). 
            Browse and plan your pick order strategy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {rooms.map((room) => (
            <RoomCard key={room.letter} {...room} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
          <CardContent className="p-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Ready to Begin?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Learn about our fair pick order algorithm or jump straight to submitting your pick preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/algorithm">
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </Link>
              <Link to="/bidding">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Your Bids <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact Information</h4>
              <p className="text-muted-foreground">Email: [your-email@example.com]</p>
              <p className="text-muted-foreground">Phone: [your-phone-number]</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Important Dates</h4>
              <p className="text-muted-foreground">Bidding Deadline: [Insert Date]</p>
              <p className="text-muted-foreground">Results Announced: [Insert Date]</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Property Details</h4>
              <p className="text-muted-foreground">Villa Serenity</p>
              <p className="text-muted-foreground">[Property Address]</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Villa Serenity Room Bidding System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
