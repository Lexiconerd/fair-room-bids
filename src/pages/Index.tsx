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
import roomCImage from "@/assets/room-c.jpg";
import roomDImage from "@/assets/room-d.jpg";
import roomEImage from "@/assets/room-e.jpg";

const Index = () => {
  const rooms = [
    {
      letter: "A",
      name: "Ocean View Master",
      image: [roomAImage, roomA2Image, roomA3Image],
      features: ["Ocean View", "King Bed", "En-suite Bathroom", "Private Balcony"],
      description: "Wake up to breathtaking ocean views in this luxury master bedroom with private balcony and spa-like bathroom.",
      highlight: "Most Popular"
    },
    {
      letter: "B", 
      name: "Cozy Brick Loft",
      image: roomBImage,
      features: ["Exposed Brick", "Queen Bed", "Reading Nook", "Ambient Lighting"],
      description: "Industrial charm meets comfort in this unique loft space with exposed brick walls and cozy atmosphere."
    },
    {
      letter: "C",
      name: "Luxury Suite", 
      image: roomCImage,
      features: ["Walk-in Closet", "Marble Bathroom", "Chandelier", "Sitting Area"],
      description: "Indulge in luxury with this elegant suite featuring premium finishes and sophisticated decor."
    },
    {
      letter: "D",
      name: "Modern Industrial",
      image: roomDImage, 
      features: ["High Ceilings", "Floor-to-ceiling Windows", "Minimalist Design", "City View"],
      description: "Contemporary design meets urban sophistication in this sleek industrial-style bedroom."
    },
    {
      letter: "E",
      name: "Garden Paradise",
      image: roomEImage,
      features: ["Garden Access", "French Doors", "Natural Materials", "Morning Light"],
      description: "Connect with nature in this serene room featuring direct garden access and natural botanical elements."
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Fair for Everyone",
      description: "Our algorithm ensures every couple gets their most preferred available room at a fair price."
    },
    {
      icon: DollarSign, 
      title: "Transparent Pricing",
      description: "Pay the second-highest bid for your room - usually less than what you're willing to pay."
    },
    {
      icon: Award,
      title: "Strategy-Proof",
      description: "Bidding your true preferences is always the optimal strategy - no need for games."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Welcome to Villa Serenity
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience our fair and transparent room bidding system. Each couple allocates $4,000 
            across five beautiful bedrooms based on your preferences. Our algorithm ensures everyone 
            gets the best possible outcome.
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
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Why Our Bidding System is Fair
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
          <h2 className="text-3xl font-bold mb-4 text-foreground">Choose Your Perfect Room</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each room offers unique amenities and charm. Browse the options below and start 
            planning your ideal allocation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              Learn about our fair bidding algorithm or jump straight to submitting your preferences.
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