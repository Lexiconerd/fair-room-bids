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
      letter: "1",
      name: "Primary Bedroom",
      image: roomAImage,
      features: ["King Bed", "En-suite Bathroom", "Outdoor Deck"],
      description: "Stay away from the riff-raff downstairs, en-suite bathroom, and you get direct access to the outdoor deck",
      highlight: "Much Luxury"
    },
    {
      letter: "2", 
      name: "Bedroom 2",
      image: [roomBImage, roomB2Image],
      features: ["Queen Bed", "Window", "Spacious"],
      description: "*Slaps bedroom* Look at the space on that thing."
    },
    {
      letter: "3",
      name: "Bedroom 3", 
      image: roomCImage,
      features: ["Fake Plant", "Double Bed", "Rocking Chair", "Sink"],
      description: "Bit of a tight squeeze, but at least you get to wash your face at night."
    },
    {
      letter: "4",
      name: "Bedroom 4",
      image: roomDImage, 
      features: ["Queen Bed", "Small"],
      description: "Pretty bed at least."
    },
    {
      letter: "5",
      name: "Bedroom 5",
      image: roomEImage,
      features: ["Rocking Chair", "En-Suite Bathroom", "King Bed"],
      description: "Proof that the bed numbering is not based on quality. This is why you're betting on bid order."
    },
    {
      letter: "6",
      name: "Bedroom 6 (Singles)",
      image: [roomA2Image,roomA3Image],
      features: ["Twin Beds", "Shared Space", "Garden View", "Natural Light"],
      description: "All the single ladies (now put your hands up)."
    }
  ];

  const features = [
    {
      icon: DollarSign,
      title: "I Love Capitalism",
      description: "Let the pricing algorithm ensure that the value extractive nature of society work for you."
    },
    {
      icon: Award, 
      title: "First-Come, First-Serve Sucks",
      description: "I really dislike it when people get the best rooms just because they showed up first."
    },
    {
      icon: Users,
      title: "Single People Happy",
      description: "For the first time in history, single people pay less for worse accomodations."
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
            className="w-full object-cover max-h-[50vh]"
          />
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Montana Here We Come
            </h1>
          </div>
          <div className="text-center max-w-6xl mx-auto px-8">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Erik’s Ranch is a stunning, 100-acre nonprofit guest lodge near Yellowstone,
            offering upscale accommodations and unforgettable experiences.
            <br/>
            <br/>
            But before all of that, Jay would like you to price your willingness (or lack thereof) to pay for a better room.
            Kathleen is not involved and not responsible for any harm this may cause.
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
                  <CardTitle className="text-base">{feature.title}</CardTitle>
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
            6 bedrooms total: <a 
              href="https://www.nytimes.com/2020/08/05/realestate/master-bedroom-change.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline"
            >
              Primary bedroom
            </a> (best by far), bedrooms 2-5 (couple rooms), and bedroom 6 (twins for singles).
            The downstairs bedrooms are all connected, and two are windowless.
            Browse and plan your pick order strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
          <CardContent className="p-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">You've Reached the End</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Learn more about this works or start bidding.
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

    </div>
  );
};

export default Index;
