import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, Users, Trophy, CheckCircle, UserX } from "lucide-react";

const Algorithm = () => {
  const steps = [
    {
      icon: DollarSign,
      title: "Allocate Your Budget",
      description: "Each bidding couple gets $3,275 to distribute across the 5 rooms based on your preferences. The lowest bid counts double (for singles' costs)."
    },
    {
      icon: Users,
      title: "Submit Bids",
      description: "Couples submit their bids simultaneously without seeing others' bids. Some may choose not to participate."
    },
    {
      icon: Trophy,
      title: "Room Assignment",
      description: "Our Vickrey-Clarke-Groves algorithm assigns rooms to maximize total satisfaction across all participants."
    },
    {
      icon: CheckCircle,
      title: "Fair Pricing",
      description: "Pay the second-highest bid for your room (usually less than what you bid). Non-bidding singles pay half of the cheapest assigned room."
    }
  ];

  const exampleBids = [
    {
      couple: "Alex & Jamie",
      bids: { A: 800, B: 650, C: 550, D: 500, E: 500 },
      assigned: "A",
      payment: 750,
      type: "couple",
      bidForAssigned: 800,
      savings: 50
    },
    {
      couple: "Morgan & Casey", 
      bids: { A: 750, B: 775, C: 600, D: 550, E: 500 },
      assigned: "B",
      payment: 650,
      type: "couple",
      bidForAssigned: 775,
      savings: 125
    },
    {
      couple: "Taylor & Jordan",
      bids: { A: 700, B: 650, C: 825, D: 600, E: 500 },
      assigned: "C",
      payment: 600,
      type: "couple",
      bidForAssigned: 825,
      savings: 225
    },
    {
      couple: "Sam & Riley",
      bids: { A: 650, B: 600, C: 650, D: 775, E: 500 },
      assigned: "D",
      payment: 600,
      type: "couple",
      bidForAssigned: 775,
      savings: 175
    },
    {
      couple: "Robin & Sage",
      bids: { A: 600, B: 575, C: 575, D: 625, E: 800 },
      assigned: "E",
      payment: 500,
      type: "couple",
      bidForAssigned: 800,
      savings: 300
    },
    {
      couple: "Chris (Single)",
      bids: { A: "—", B: "—", C: "—", D: "—", E: "—" },
      assigned: "A",
      payment: 250,
      type: "single",
      bidForAssigned: "—",
      savings: "—"
    },
    {
      couple: "Avery (Single)",
      bids: { A: "—", B: "—", C: "—", D: "—", E: "—" },
      assigned: "A",
      payment: 250,
      type: "single",
      bidForAssigned: "—",
      savings: "—"
    }
  ];

  const benefits = [
    "Strategy-proof mechanism - bidding your true preferences is always optimal",
    "Fair pricing - you never pay more than your maximum willingness to pay",
    "Efficient allocation - rooms go to those who value them most highly",
    "Transparent process - everyone understands the Vickrey-Clarke-Groves rules",
    "Non-participants accommodated - singles get the remaining room at fair cost"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              How the Vickrey-Clarke-Groves Auction Works
            </h1>
            <p className="text-xl text-muted-foreground">
              A proven strategy-proof mechanism that ensures optimal room allocation and fair pricing
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
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Realistic Example Scenario</h2>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Sample Allocation: 5 Bidding Couples + 2 Non-Bidding Singles</CardTitle>
                <CardDescription>
                  See how the VCG mechanism assigns all 5 couples to different rooms, with singles sharing the largest room
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Participant</th>
                        <th className="text-center p-3 font-semibold">Room A</th>
                        <th className="text-center p-3 font-semibold">Room B</th>
                        <th className="text-center p-3 font-semibold">Room C</th>
                        <th className="text-center p-3 font-semibold">Room D</th>
                        <th className="text-center p-3 font-semibold">Room E</th>
                        <th className="text-center p-3 font-semibold">Assigned</th>
                        <th className="text-center p-3 font-semibold">Payment</th>
                        <th className="text-center p-3 font-semibold">Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exampleBids.map((bid, index) => (
                        <tr key={index} className={`border-b border-border ${bid.type === 'single' ? 'bg-muted/30' : ''}`}>
                          <td className="p-3 font-medium">
                            {bid.couple}
                            {bid.type === 'single' && <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" />}
                          </td>
                          <td className="text-center p-3">{bid.bids.A}</td>
                          <td className="text-center p-3">{bid.bids.B}</td>
                          <td className="text-center p-3">{bid.bids.C}</td>
                          <td className="text-center p-3">{bid.bids.D}</td>
                          <td className="text-center p-3">{bid.bids.E}</td>
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
                
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">VCG Auction Results:</h4>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• All 5 couples get assigned to different rooms based on their highest bids</li>
                      <li>• Each couple pays the second-highest bid for their assigned room (VCG pricing)</li>
                      <li>• Lowest winning bid is $500 (Room E), so singles pay $250 each</li>
                      <li>• Singles share Room A (4-person capacity) with Alex & Jamie</li>
                      <li>• Total collected: $2,500 from couples + $500 from singles = $3,000</li>
                      <li>• Shortfall of $275 split equally among all 7 participants ($39.29 each)</li>
                      <li>• <strong>Final total: Exactly $3,275 to cover Airbnb costs</strong></li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Why This Allocation is Optimal:</h4>
                    <p className="text-sm text-foreground">
                      The VCG mechanism maximizes total welfare by assigning each couple to their most preferred 
                      available room. Since Room A has 4-person capacity, it can accommodate both the winning 
                      couple and the two non-bidding singles. The payment structure incentivizes truthful 
                      bidding and ensures efficient allocation across all participants.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* VCG Properties */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Why Vickrey-Clarke-Groves is Ideal</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical note */}
          <section className="mb-12">
            <Card className="bg-muted/30 border-muted">
              <CardHeader>
                <CardTitle className="text-lg">About the VCG Mechanism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  The Vickrey-Clarke-Groves mechanism is a Nobel Prize-winning auction format that guarantees 
                  truthful bidding is the dominant strategy. Unlike traditional auctions where strategic 
                  underbidding might be beneficial, VCG ensures that bidding your true valuations always 
                  yields the best possible outcome for you. This makes the process fair, efficient, and 
                  eliminates the need for complex bidding strategies.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Call to action */}
          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Submit Your Bids?</h3>
                <p className="text-muted-foreground mb-6">
                  The VCG mechanism is designed to make everyone better off. Simply bid what each room 
                  is truly worth to you - no strategy needed! Don't want to participate in bidding? 
                  Singles will be automatically assigned the cheapest room and pay half the cost.
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
