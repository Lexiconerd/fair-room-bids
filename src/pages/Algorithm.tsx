import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, Users, Trophy, CheckCircle } from "lucide-react";

const Algorithm = () => {
  const steps = [
    {
      icon: DollarSign,
      title: "Allocate Your Budget",
      description: "Each couple gets $4,000 to distribute across the 5 rooms based on your preferences."
    },
    {
      icon: Users,
      title: "Submit Bids",
      description: "All couples submit their bids simultaneously without seeing others' bids."
    },
    {
      icon: Trophy,
      title: "Room Assignment",
      description: "Our algorithm assigns rooms to maximize total satisfaction across all couples."
    },
    {
      icon: CheckCircle,
      title: "Fair Pricing",
      description: "Pay the second-highest bid for your room (usually less than what you bid)."
    }
  ];

  const exampleBids = [
    {
      couple: "Alex & Jamie",
      bids: { A: 1800, B: 1200, C: 600, D: 400, E: 0 },
      assigned: "A",
      payment: 1500
    },
    {
      couple: "Morgan & Casey",
      bids: { A: 1500, B: 800, C: 1000, D: 500, E: 200 },
      assigned: "C",
      payment: 600
    },
    {
      couple: "Taylor & Jordan",
      bids: { A: 800, B: 1600, C: 600, D: 1000, E: 0 },
      assigned: "B",
      payment: 800
    }
  ];

  const benefits = [
    "No strategic manipulation - bidding your true preferences is optimal",
    "Fair pricing - you never pay more than your maximum willingness",
    "Efficient allocation - rooms go to those who value them most",
    "Transparent process - everyone understands how it works"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              How the Fair Bidding System Works
            </h1>
            <p className="text-xl text-muted-foreground">
              A transparent, strategy-proof mechanism that ensures everyone gets their fair share
            </p>
          </div>

          {/* Step-by-step process */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">The Process</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="relative bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">Step {index + 1}</Badge>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Example scenario */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Example Scenario</h2>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Sample Bids from 3 Couples</CardTitle>
                <CardDescription>
                  See how the algorithm assigns rooms fairly based on preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Couple</th>
                        <th className="text-center p-3 font-semibold">Room A</th>
                        <th className="text-center p-3 font-semibold">Room B</th>
                        <th className="text-center p-3 font-semibold">Room C</th>
                        <th className="text-center p-3 font-semibold">Room D</th>
                        <th className="text-center p-3 font-semibold">Room E</th>
                        <th className="text-center p-3 font-semibold">Assigned</th>
                        <th className="text-center p-3 font-semibold">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exampleBids.map((bid, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="p-3 font-medium">{bid.couple}</td>
                          <td className="text-center p-3">${bid.bids.A}</td>
                          <td className="text-center p-3">${bid.bids.B}</td>
                          <td className="text-center p-3">${bid.bids.C}</td>
                          <td className="text-center p-3">${bid.bids.D}</td>
                          <td className="text-center p-3">${bid.bids.E}</td>
                          <td className="text-center p-3">
                            <Badge className="bg-primary text-primary-foreground">
                              Room {bid.assigned}
                            </Badge>
                          </td>
                          <td className="text-center p-3 font-semibold text-primary">
                            ${bid.payment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Result:</strong> Each couple gets their most preferred available room, 
                    and pays less than their maximum bid. Total collected: $2,900. 
                    Surplus of $1,100 split equally = $367 refund per couple.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Why This System Is Fair</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to action */}
          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Submit Your Bids?</h3>
                <p className="text-muted-foreground mb-6">
                  The process is simple, fair, and designed to make everyone happy.
                </p>
                <Link to="/bidding">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Bidding <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Algorithm;