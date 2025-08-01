
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, DollarSign, Users, Trophy, CheckCircle, UserX } from "lucide-react";

const Algorithm = () => {
  const steps = [
    {
      icon: DollarSign,
      title: "Bid on Pick Order",
      description: "Each couple bids on their preferred picking order (1st, 2nd, 3rd, 4th, 5th pick). Higher bids get earlier picks."
    },
    {
      icon: Users,
      title: "Submit Bids",
      description: "Couples submit their pick order bids simultaneously. Singles don't bid and are assigned bedroom 6 (with twin beds)."
    },
    {
      icon: Trophy,
      title: "Pick Assignment",
      description: "Highest bidder for each position wins that pick order. Winners then choose rooms sequentially: 1st pick chooses first from all rooms, 2nd pick chooses from remaining rooms, etc."
    },
    {
      icon: CheckCircle,
      title: "Second-Price Payment",
      description: "Pay the second-highest bid for your pick position. Singles pay half of the lowest couple payment. Any surplus or deficit is split equally among all participants to reach exactly $3,275."
    }
  ];

  const exampleBids = [
    {
      couple: "Alex & Jamie",
      bids: { "1st": 1125, "2nd": 700, "3rd": 600, "4th": 500, "5th": 175 },
      pickOrder: "1st",
      chosenRoom: "Primary",
      payment: 1000,
      type: "couple",
      bidForPick: 1125,
      savings: 125
    },
    {
      couple: "Morgan & Casey", 
      bids: { "1st": 1000, "2nd": 750, "3rd": 500, "4th": 425, "5th": 300 },
      pickOrder: "2nd",
      chosenRoom: "Bedroom 2",
      payment: 700,
      type: "couple",
      bidForPick: 750,
      savings: 50
    },
    {
      couple: "Taylor & Jordan",
      bids: { "1st": 850, "2nd": 700, "3rd": 625, "4th": 400, "5th": 350 },
      pickOrder: "3rd",
      chosenRoom: "Bedroom 3",
      payment: 550,
      type: "couple",
      bidForPick: 625,
      savings: 75
    },
    {
      couple: "Sam & Riley",
      bids: { "1st": 625, "2nd": 550, "3rd": 550, "4th": 550, "5th": 500 },
      pickOrder: "5th",
      chosenRoom: "Bedroom 5",
      payment: 350,
      type: "couple",
      bidForPick: 500,
      savings: 150
    },
    {
      couple: "Robin & Sage",
      bids: { "1st": 570, "2nd": 570, "3rd": 570, "4th": 565, "5th": 500 },
      pickOrder: "4th",
      chosenRoom: "Bedroom 4",
      payment: 550,
      type: "couple",
      bidForPick: 565,
      savings: 15
    },
    {
      couple: "Chris (Single)",
      bids: { "1st": "—", "2nd": "—", "3rd": "—", "4th": "—", "5th": "—" },
      pickOrder: "—",
      chosenRoom: "Bedroom 6",
      payment: 250,
      type: "single",
      bidForPick: "—",
      savings: "—"
    },
    {
      couple: "Avery (Single)",
      bids: { "1st": "—", "2nd": "—", "3rd": "—", "4th": "—", "5th": "—" },
      pickOrder: "—",
      chosenRoom: "Bedroom 6",
      payment: 250,
      type: "single",
      bidForPick: "—",
      savings: "—"
    }
  ];

  const benefits = [
    "Simple and transparent - easy to understand how winners and prices are determined",
    "Encourages honest bidding - bidding your true value for each position is the smart strategy",
    "Fair pricing - you never pay more than your bid, often paying less",
    "Fun picking process - winners get the excitement of choosing their room in order",
    "Budget balanced - total payments always equal exactly $3,275"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              How the Second-Price Position Auction Works
            </h1>
            <p className="text-xl text-muted-foreground">
              A fair and simple mechanism where you bid for pick order, then choose rooms sequentially
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

          {/* Example scenarios */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Example Scenario</h2>
            
            {/* Main scenario */}
            <div className="mb-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Realistic Example: 5 Bidding Couples + 2 Non-Bidding Singles</CardTitle>
                  <CardDescription>
                    See how the second-price position auction determines pick order and payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Bids Table */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Submitted Bids by Pick Order Preference</h4>
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Results Table */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Auction Results</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 font-semibold">Participant</th>
                            <th className="text-center p-3 font-semibold">Won Pick</th>
                            <th className="text-center p-3 font-semibold">Room Chosen</th>
                            <th className="text-center p-3 font-semibold">Their Bid</th>
                            <th className="text-center p-3 font-semibold">2nd Price Payment</th>
                            <th className="text-center p-3 font-semibold">Adjustment</th>
                            <th className="text-center p-3 font-semibold">Final Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exampleBids.map((bid, index) => {
                            const adjustment = bid.type === 'single' ? -31.25 : -62.50;
                            const finalPayment = bid.type === 'single' ? 218.75 : bid.payment + adjustment;
                            
                            return (
                              <tr key={index} className={`border-b border-border ${bid.type === 'single' ? 'bg-muted/30' : ''}`}>
                                <td className="p-3 font-medium">
                                  {bid.couple}
                                  {bid.type === 'single' && <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" />}
                                </td>
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
                                <td className="text-center p-3">
                                  {bid.type === 'single' ? (
                                    <span className="text-muted-foreground">—</span>
                                  ) : (
                                    `$${bid.bidForPick}`
                                  )}
                                </td>
                                <td className="text-center p-3 font-semibold">
                                  {bid.type === 'single' ? (
                                    <span className="text-muted-foreground">$250</span>
                                  ) : (
                                    `$${bid.payment}`
                                  )}
                                </td>
                                <td className="text-center p-3 text-green-600 font-medium">
                                  {bid.type === 'single' ? '-$31.25' : '-$62.50'}
                                </td>
                                <td className="text-center p-3 font-semibold text-primary">
                                  ${finalPayment.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">Results Summary:</h4>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Alex & Jamie bid highest for 1st pick ($1,125) but only pay the 2nd highest bid ($1,000)</li>
                      <li>• Each winner pays the second-highest bid for their position - this encourages honest bidding</li>
                      <li>• Pick order: Alex & Jamie → Morgan & Casey → Taylor & Jordan → Sam & Riley → Robin & Sage</li>
                      <li>• Room selection happens sequentially based on pick order</li>
                      <li>• <strong>Total second-price payments: $3,150</strong> + Singles: $500 = $3,650</li>
                      <li>• Surplus of $375 redistributed: couples get $62.50 back (for 2 people), singles get $31.25 back (for 1 person)</li>
                      <li>• <strong>Final total collected: Exactly $3,275</strong></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional scenarios in accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="why-second-price" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="font-semibold text-left">Why use second-price instead of just paying your bid?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Second-price auctions have a magical property: <strong>bidding your true value is always your best strategy</strong>, 
                      regardless of what others do. Here's why:
                    </p>
                    
                    <div className="bg-card p-4 rounded-lg border border-border">
                      <h5 className="font-semibold text-foreground mb-2">If you bid too high:</h5>
                      <p>You might win when you shouldn't, paying more than the position is worth to you</p>
                    </div>
                    
                    <div className="bg-card p-4 rounded-lg border border-border">
                      <h5 className="font-semibold text-foreground mb-2">If you bid too low:</h5>
                      <p>You might lose when you would have happily paid the second-highest price</p>
                    </div>
                    
                    <div className="bg-card p-4 rounded-lg border border-border">
                      <h5 className="font-semibold text-foreground mb-2">If you bid exactly your true value:</h5>
                      <p>You win if and only if the price is below what it's worth to you - perfect!</p>
                    </div>
                    
                    <p>
                      This eliminates the need for complex bidding strategies. Just ask yourself: "What's the most 
                      I'd be willing to pay for this pick position?" and bid that amount. The second-price rule 
                      ensures you'll always get a good deal if you win.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tie-scenario" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="font-semibold text-left">What happens if there's a tie?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      If two couples bid the same amount for the same pick position, we use a random tiebreaker 
                      (like a coin flip) to determine the winner. The winner still pays the second-highest bid, 
                      which in case of a tie would be the tied amount.
                    </p>
                    
                    <p>
                      For example: If Alex and Morgan both bid $1,000 for 1st pick and no one bid higher, 
                      one would randomly win 1st pick and pay $1,000 (the "second-highest" bid), while the 
                      other would get their next preference.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="budget-balance" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="font-semibold text-left">How do you ensure exactly $3,275 is collected?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      The second-price payments might not add up to exactly $3,275. We handle this with a simple adjustment:
                    </p>
                    
                    <ul className="space-y-2 list-disc list-inside">
                      <li>If total payments exceed $3,275: Everyone gets an equal rebate</li>
                      <li>If total payments fall short of $3,275: Everyone pays an equal additional share</li>
                    </ul>
                    
                    <p>
                      This adjustment is typically small (around $50 per person) and is split equally so everyone 
                      shares the burden or benefit fairly. The core auction still incentivizes truthful bidding, 
                      and the adjustment ensures we collect exactly what's needed for the Airbnb.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Why This System Works</h2>
            <div className="grid md:grid-cols-1 gap-4">
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
                <CardTitle className="text-lg">The Power of Second-Price Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  This mechanism combines a second-price sealed-bid auction (like eBay's proxy bidding) with 
                  sequential room selection. The second-price rule means you can bid your true maximum value 
                  without worrying about overpaying or complex strategies. Combined with pick-order selection, 
                  this creates a fun, fair, and efficient way to allocate rooms where everyone feels they got 
                  a good deal.
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
                  Simply bid what each pick position is truly worth to you - no complex strategy needed! 
                  The second-price rule ensures you'll never overpay. Singles will be automatically assigned 
                  bedroom 6 (twin beds) at a fair price.
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
