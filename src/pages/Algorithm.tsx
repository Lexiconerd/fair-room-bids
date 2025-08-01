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
      description: "Each couple bids their preferred picking order (1st, 2nd, 3rd, 4th, 5th pick). The total, with the 5th pick doubled, must equal $3,275."
    },
    {
      icon: Users,
      title: "Submit Bids",
      description: "Couples submit their pick order bids anonymously. Singles don't bid and are assigned bedroom 6 (with twin beds)."
    },
    {
      icon: Trophy,
      title: "Pick Assignment",
      description: "VCG algorithm determines pick order. Each pick gets assigned to the highest bidder among the remaining bidders."
    },
    {
      icon: CheckCircle,
      title: "VCG Pricing & Redistribution",
      description: "Pay the second-highest bid for your pick position. Singles pay half of the lowest pick price. Excess funds (or deficit) are redistributed equally among all participants per VCG mechanism."
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
      payment: 600,
      type: "couple",
      bidForPick: 625,
      savings: 25
    },
    {
      couple: "Sam & Riley",
      bids: { "1st": 625, "2nd": 550, "3rd": 550, "4th": 550, "5th": 500 },
      pickOrder: "5th",
      chosenRoom: "Bedroom 4",
      payment: 500,
      type: "couple",
      bidForPick: 500,
      savings: 0
    },
    {
      couple: "Robin & Sage",
      bids: { "1st": 570, "2nd": 570, "3rd": 570, "4th": 565, "5th": 500 },
      pickOrder: "4th",
      chosenRoom: "Bedroom 5",
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

          {/* Example scenarios */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Example Scenarios</h2>
            
            {/* Main scenario */}
            <div className="mb-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Realistic Example: 5 Bidding Couples + 2 Non-Bidding Singles</CardTitle>
                  <CardDescription>
                    See how the VCG mechanism determines pick order, with singles automatically assigned bedroom 5 (twin beds)
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
                    <h4 className="font-semibold text-foreground mb-4">VCG Auction Results</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 font-semibold">Participant</th>
                            <th className="text-center p-3 font-semibold">Assigned Pick</th>
                            <th className="text-center p-3 font-semibold">Room Chosen</th>
                            <th className="text-center p-3 font-semibold">VCG Payment</th>
                            <th className="text-center p-3 font-semibold">Redistribution</th>
                            <th className="text-center p-3 font-semibold">Final Payment</th>
                            <th className="text-center p-3 font-semibold">Bid vs Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exampleBids.map((bid, index) => {
                            const redistribution = bid.type === 'single' ? -60.71 : -60.71;
                            const finalPayment = bid.type === 'single' ? 162.50 : bid.payment + redistribution;
                            const bidAmount = bid.type === 'single' ? 0 : (typeof bid.bidForPick === 'number' ? bid.bidForPick : 0);
                            const savings = bid.type === 'single' ? 0 : bidAmount - finalPayment;
                            
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
                                <td className="text-center p-3 font-semibold">
                                  {bid.type === 'single' ? (
                                    <span className="text-muted-foreground">—</span>
                                  ) : (
                                    `$${bid.payment}`
                                  )}
                                </td>
                                <td className="text-center p-3 text-green-600 font-medium">
                                  -$60.71
                                </td>
                                <td className="text-center p-3 font-semibold text-primary">
                                  ${finalPayment.toFixed(2)}
                                </td>
                                <td className="text-center p-3">
                                  {bid.type === 'single' ? (
                                    <span className="text-muted-foreground">—</span>
                                  ) : (
                                    <span className="font-semibold text-green-600">
                                      +${savings.toFixed(2)}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">VCG Results Summary:</h4>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Alex & Jamie bid highest for 1st pick ($1,200) and get first choice - select Primary bedroom</li>
                      <li>• Each couple pays the second-highest bid for their assigned pick position (VCG pricing)</li>
                      <li>• <strong>Total VCG payments: $2,525</strong> + Singles payment: $325 = $2,850</li>
                      <li>• Shortfall of $425 redistributed equally among all 7 participants (-$60.71 each)</li>
                      <li>• <strong>Final total collected: Exactly $3,275</strong> to cover Airbnb costs</li>
                      <li>• Pick order determines room selection: Primary → Bedroom 1 → Bedroom 2 → Bedroom 3 → Bedroom 4</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional scenarios in accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="single-bidder" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="font-semibold text-left">What happens if nobody participates but one person?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      If only one couple participates in bidding while everyone else gets default assignments, the non-participants get default bids of $468 for picks 1-4 and $475 for pick 5:
                    </p>
                    
                    {/* Bids Table */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Bids Made</h4>
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
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Alex & Jamie</td>
                              <td className="text-center p-3 font-semibold">$1,200</td>
                              <td className="text-center p-3">$950</td>
                              <td className="text-center p-3">$700</td>
                              <td className="text-center p-3">$500</td>
                              <td className="text-center p-3">$400</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Morgan & Casey <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$475</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Taylor & River <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$468</td>
                              <td className="text-center p-3 text-muted-foreground">$475</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Sam <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Results Table */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">VCG Auction Results</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3 font-semibold">Participant</th>
                              <th className="text-center p-3 font-semibold">Assigned Pick</th>
                              <th className="text-center p-3 font-semibold">Room Chosen</th>
                              <th className="text-center p-3 font-semibold">VCG Payment</th>
                              <th className="text-center p-3 font-semibold">Redistribution</th>
                              <th className="text-center p-3 font-semibold">Final Payment</th>
                              <th className="text-center p-3 font-semibold">Bid vs Final</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Alex & Jamie</td>
                              <td className="text-center p-3"><Badge className="bg-primary text-primary-foreground">1st</Badge></td>
                              <td className="text-center p-3"><Badge variant="outline">Primary</Badge></td>
                              <td className="text-center p-3 font-semibold">$468</td>
                              <td className="text-center p-3 text-green-600 font-medium">+$0</td>
                              <td className="text-center p-3 font-semibold text-primary">$468.00</td>
                              <td className="text-center p-3 font-semibold text-green-600">+$732.00</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Morgan & Casey <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3"><Badge variant="outline">2nd</Badge></td>
                              <td className="text-center p-3"><Badge variant="outline">Bedroom 1</Badge></td>
                              <td className="text-center p-3 font-semibold">$468</td>
                              <td className="text-center p-3 text-green-600 font-medium">+$0</td>
                              <td className="text-center p-3 font-semibold text-primary">$468.00</td>
                              <td className="text-center p-3 font-semibold text-green-600">+$0.00</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Taylor & River <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3"><Badge variant="outline">3rd</Badge></td>
                              <td className="text-center p-3"><Badge variant="outline">Bedroom 2</Badge></td>
                              <td className="text-center p-3 font-semibold">$468</td>
                              <td className="text-center p-3 text-green-600 font-medium">+$0</td>
                              <td className="text-center p-3 font-semibold text-primary">$468.00</td>
                              <td className="text-center p-3 font-semibold text-green-600">+$0.00</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Sam <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3"><span className="text-muted-foreground">—</span></td>
                              <td className="text-center p-3"><Badge variant="outline">Bedroom 5</Badge></td>
                              <td className="text-center p-3"><span className="text-muted-foreground">—</span></td>
                              <td className="text-center p-3 text-green-600 font-medium">+$0</td>
                              <td className="text-center p-3 font-semibold text-primary">$234.00</td>
                              <td className="text-center p-3"><span className="text-muted-foreground">—</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2">Results Summary:</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        <li>• Alex & Jamie get 1st pick and pay the 2nd highest bid ($468) instead of their bid ($1,200)</li>
                        <li>• Non-participants get assigned picks based on default bids and pay those amounts</li>
                        <li>• No redistribution needed as total payments exactly cover costs</li>
                        <li>• Total collected: $1,872 (3 couples × $468 + 1 single × $234) = exactly $1,872 portion of $3,275</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tie-scenario" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="font-semibold text-left">What happens if there is a tie between two people?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      If two couples bid the same amount for the same pick position, a random tiebreaker determines the winner:
                    </p>
                    
                    {/* Bids Table */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Bids Made</h4>
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
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Alex & Jamie</td>
                              <td className="text-center p-3 font-semibold">$1,200</td>
                              <td className="text-center p-3">$950</td>
                              <td className="text-center p-3">$700</td>
                              <td className="text-center p-3">$500</td>
                              <td className="text-center p-3">$400</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Morgan & Casey</td>
                              <td className="text-center p-3 font-semibold">$1,200</td>
                              <td className="text-center p-3">$900</td>
                              <td className="text-center p-3">$650</td>
                              <td className="text-center p-3">$450</td>
                              <td className="text-center p-3">$350</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Taylor & River</td>
                              <td className="text-center p-3">$1,000</td>
                              <td className="text-center p-3 font-semibold">$800</td>
                              <td className="text-center p-3">$600</td>
                              <td className="text-center p-3">$400</td>
                              <td className="text-center p-3">$300</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Sam <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                              <td className="text-center p-3 text-muted-foreground">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Results Table */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">VCG Auction Results</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3 font-semibold">Participant</th>
                              <th className="text-center p-3 font-semibold">Assigned Pick</th>
                              <th className="text-center p-3 font-semibold">Room Chosen</th>
                              <th className="text-center p-3 font-semibold">VCG Payment</th>
                              <th className="text-center p-3 font-semibold">Redistribution</th>
                              <th className="text-center p-3 font-semibold">Final Payment</th>
                              <th className="text-center p-3 font-semibold">Bid vs Final</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Alex & Jamie</td>
                              <td className="text-center p-3"><Badge className="bg-primary text-primary-foreground">1st</Badge></td>
                              <td className="text-center p-3"><Badge variant="outline">Primary</Badge></td>
                              <td className="text-center p-3 font-semibold">$1,200</td>
                              <td className="text-center p-3 text-red-600 font-medium">+$133.33</td>
                              <td className="text-center p-3 font-semibold text-primary">$1,333.33</td>
                              <td className="text-center p-3 font-semibold text-red-600">-$133.33</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Morgan & Casey</td>
                              <td className="text-center p-3"><Badge variant="outline">2nd</Badge></td>
                              <td className="text-center p-3"><Badge variant="outline">Bedroom 1</Badge></td>
                              <td className="text-center p-3 font-semibold">$1,000</td>
                              <td className="text-center p-3 text-red-600 font-medium">+$133.33</td>
                              <td className="text-center p-3 font-semibold text-primary">$1,133.33</td>
                              <td className="text-center p-3 font-semibold text-green-600">+$66.67</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3 font-medium">Taylor & River</td>
                              <td className="text-center p-3"><Badge variant="outline">3rd</Badge></td>
                              <td className="text-center p-3"><Badge variant="outline">Bedroom 2</Badge></td>
                              <td className="text-center p-3 font-semibold">$800</td>
                              <td className="text-center p-3 text-red-600 font-medium">+$133.33</td>
                              <td className="text-center p-3 font-semibold text-primary">$933.33</td>
                              <td className="text-center p-3 font-semibold text-green-600">+$66.67</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="p-3 font-medium">Sam <UserX className="inline ml-1 h-4 w-4 text-muted-foreground" /></td>
                              <td className="text-center p-3"><span className="text-muted-foreground">—</span></td>
                              <td className="text-center p-3"><Badge variant="outline">Bedroom 5</Badge></td>
                              <td className="text-center p-3"><span className="text-muted-foreground">—</span></td>
                              <td className="text-center p-3 text-red-600 font-medium">+$133.33</td>
                              <td className="text-center p-3 font-semibold text-primary">$533.33</td>
                              <td className="text-center p-3"><span className="text-muted-foreground">—</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2">Tie Resolution Summary:</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        <li>• Alex & Jamie and Morgan & Casey both bid $1,200 for 1st pick</li>
                        <li>• Random tiebreaker assigns Alex & Jamie as 1st pick winner</li>
                        <li>• Both tied participants pay their full tied bid amount ($1,200) per VCG rules</li>
                        <li>• Morgan & Casey get 2nd pick and pay Taylor & River's 2nd pick bid ($1,000)</li>
                        <li>• Total VCG payments: $3,000, requiring $533.33 redistribution to reach $3,275</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Technical note */}
          <section className="mb-12">
            <Card className="bg-muted/30 border-muted">
              <CardHeader>
                <CardTitle className="text-lg">About the VCG Mechanism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  VCG is an auction system designed to make people bid honestly. 
                  In an Airbnb with multiple rooms, guests submit sealed bids and 
                  winners get their preferred rooms but pay based on the "harm" they caused others - 
                  what the next-best bidder would have received minus what they actually got.
                  Since your payment depends on other people's outcomes rather than your own bid, 
                  lying can't help you strategically, making truth-telling the optimal approach.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Call to action */}
          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Submit Your Bids?</h3>
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
