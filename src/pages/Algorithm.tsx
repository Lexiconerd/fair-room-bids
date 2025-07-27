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
      title: "Bid on Pick Order",
      description: "Each couple bids $3,275 on their preferred picking order (1st, 2nd, 3rd, 4th, 5th pick). Higher bids get earlier picks."
    },
    {
      icon: Users,
      title: "Submit Bids",
      description: "Couples submit their pick order bids simultaneously. Singles don't bid and are assigned bedroom 5 (with twin beds)."
    },
    {
      icon: Trophy,
      title: "Pick Assignment",
      description: "VCG algorithm determines pick order. Winners choose from: Primary bedroom, then bedrooms 1-4 based on their pick position."
    },
    {
      icon: CheckCircle,
      title: "VCG Pricing & Redistribution",
      description: "Pay the second-highest bid for your pick position. Excess funds are redistributed equally among all participants per VCG mechanism."
    }
  ];

  const exampleBids = [
    {
      couple: "Alex & Jamie",
      bids: { "1st": 1200, "2nd": 900, "3rd": 650, "4th": 350, "5th": 175 },
      pickOrder: "1st",
      chosenRoom: "Primary",
      payment: 1100,
      type: "couple",
      bidForPick: 1200,
      savings: 100
    },
    {
      couple: "Morgan & Casey", 
      bids: { "1st": 1100, "2nd": 950, "3rd": 700, "4th": 375, "5th": 150 },
      pickOrder: "2nd",
      chosenRoom: "Bedroom 1",
      payment: 900,
      type: "couple",
      bidForPick: 950,
      savings: 50
    },
    {
      couple: "Taylor & Jordan",
      bids: { "1st": 1000, "2nd": 900, "3rd": 800, "4th": 400, "5th": 175 },
      pickOrder: "3rd",
      chosenRoom: "Bedroom 2",
      payment: 700,
      type: "couple",
      bidForPick: 800,
      savings: 100
    },
    {
      couple: "Sam & Riley",
      bids: { "1st": 950, "2nd": 750, "3rd": 700, "4th": 550, "5th": 325 },
      pickOrder: "4th",
      chosenRoom: "Bedroom 3",
      payment: 400,
      type: "couple",
      bidForPick: 550,
      savings: 150
    },
    {
      couple: "Robin & Sage",
      bids: { "1st": 900, "2nd": 700, "3rd": 600, "4th": 400, "5th": 675 },
      pickOrder: "5th",
      chosenRoom: "Bedroom 4",
      payment: 325,
      type: "couple",
      bidForPick: 675,
      savings: 350
    },
    {
      couple: "Chris (Single)",
      bids: { "1st": "—", "2nd": "—", "3rd": "—", "4th": "—", "5th": "—" },
      pickOrder: "—",
      chosenRoom: "Bedroom 5",
      payment: 162.50,
      type: "single",
      bidForPick: "—",
      savings: "—"
    },
    {
      couple: "Avery (Single)",
      bids: { "1st": "—", "2nd": "—", "3rd": "—", "4th": "—", "5th": "—" },
      pickOrder: "—",
      chosenRoom: "Bedroom 5",
      payment: 162.50,
      type: "single",
      bidForPick: "—",
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
                <CardTitle>Sample Pick Order Allocation: 5 Bidding Couples + 2 Non-Bidding Singles</CardTitle>
                <CardDescription>
                  See how the VCG mechanism determines pick order, with singles automatically assigned bedroom 5 (twin beds)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Participant</th>
                        <th className="text-center p-3 font-semibold">1st Pick</th>
                        <th className="text-center p-3 font-semibold">2nd Pick</th>
                        <th className="text-center p-3 font-semibold">3rd Pick</th>
                        <th className="text-center p-3 font-semibold">4th Pick</th>
                        <th className="text-center p-3 font-semibold">5th Pick</th>
                        <th className="text-center p-3 font-semibold">Pick Order</th>
                        <th className="text-center p-3 font-semibold">Room Chosen</th>
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
                          <td className="text-center p-3">{bid.bids["1st"]}</td>
                          <td className="text-center p-3">{bid.bids["2nd"]}</td>
                          <td className="text-center p-3">{bid.bids["3rd"]}</td>
                          <td className="text-center p-3">{bid.bids["4th"]}</td>
                          <td className="text-center p-3">{bid.bids["5th"]}</td>
                          <td className="text-center p-3">
                            {bid.type === 'single' ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <Badge className="bg-primary text-primary-foreground">
                                {bid.pickOrder}
                              </Badge>
                            )}
                          </td>
                          <td className="text-center p-3">
                            <Badge variant="outline">
                              {bid.chosenRoom}
                            </Badge>
                          </td>
                          <td className="text-center p-3 font-semibold text-primary">
                            ${bid.payment}
                          </td>
                          <td className="text-center p-3">
                            {bid.type === 'single' ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <span className="font-semibold text-green-600">
                                ${bid.savings}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">VCG Pick Order Results:</h4>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Alex & Jamie bid highest for 1st pick ($1,200) and get first choice - select Primary bedroom</li>
                      <li>• Morgan & Casey get 2nd pick, choose bedroom 1</li>
                      <li>• Each couple pays the second-highest bid for their pick position (VCG pricing)</li>
                      <li>• <strong>Total collected: $2,525</strong> from VCG payments + $325 from singles = $2,850</li>
                      <li>• Shortfall of $425 redistributed equally among all 7 participants ($60.71 each)</li>
                      <li>• Singles automatically assigned bedroom 5 (twin beds), pay half of lowest couple payment</li>
                      <li>• <strong>Final redistributed total: Exactly $3,275 to cover Airbnb costs</strong></li>
                      <li>• Pick order determines room selection: Primary → Bedroom 1 → Bedroom 2 → Bedroom 3 → Bedroom 4</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">VCG Redistribution Mechanism:</h4>
                    <p className="text-sm text-foreground">
                      The VCG mechanism ensures truthful bidding by making each participant pay their "externality" - 
                      the cost they impose on others. When total VCG payments fall short of the required $3,275, 
                      the difference is redistributed equally among all participants, maintaining fairness while 
                      covering costs. This redistribution preserves the incentive-compatible nature of the auction.
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
                  The VCG mechanism is designed to make everyone better off. Simply bid what each pick order 
                  position is truly worth to you - no strategy needed! Don't want to participate in bidding? 
                  Singles will be automatically assigned bedroom 5 (twin beds) and pay half the lowest couple payment.
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
