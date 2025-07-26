import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, DollarSign, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bidding = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    names: "",
    email: "",
    roomA: "",
    roomB: "",
    roomC: "",
    roomD: "",
    roomE: "",
    comments: ""
  });

  const [total, setTotal] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rooms = [
    { id: "roomA", label: "Room A", name: "Ocean View Master" },
    { id: "roomB", label: "Room B", name: "Cozy Brick Loft" },
    { id: "roomC", label: "Room C", name: "Luxury Suite" },
    { id: "roomD", label: "Room D", name: "Modern Industrial" },
    { id: "roomE", label: "Room E", name: "Garden Paradise" }
  ];

  // Calculate total whenever room bids change
  useEffect(() => {
    const sum = rooms.reduce((acc, room) => {
      const value = parseFloat(formData[room.id as keyof typeof formData] as string) || 0;
      return acc + value;
    }, 0);
    setTotal(sum);
    setIsValid(sum === 4000 && formData.names.trim().length > 0 && formData.email.trim().length > 0);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.names.trim()) {
      newErrors.names = "Names are required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Check individual room bids
    rooms.forEach(room => {
      const value = parseFloat(formData[room.id as keyof typeof formData] as string) || 0;
      if (value < 0) {
        newErrors[room.id] = "Bid cannot be negative";
      }
    });

    if (total !== 4000) {
      newErrors.total = "Total bids must equal exactly $4,000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bids submitted successfully!",
      description: "Thank you for participating in the fair bidding system.",
    });

    // Form would submit to Netlify here
    console.log("Form submitted:", formData);
  };

  const getTotalBadgeVariant = () => {
    if (total === 4000) return "default";
    if (total > 4000) return "destructive";
    return "secondary";
  };

  const getTotalColor = () => {
    if (total === 4000) return "text-primary";
    if (total > 4000) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Submit Your Room Bids</h1>
            <p className="text-xl text-muted-foreground">
              Allocate your $4,000 budget across the 5 rooms based on your preferences
            </p>
          </div>

          {/* Instructions */}
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <DollarSign className="h-4 w-4" />
            <AlertDescription className="text-foreground">
              <strong>Important:</strong> Your bids must total exactly $4,000. 
              Bid higher amounts on rooms you prefer more. The system will assign rooms fairly 
              and you'll typically pay less than your maximum bid.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Bidding Form</span>
              </CardTitle>
              <CardDescription>
                Complete all fields below. Deadline: [Insert Deadline Date]
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} data-netlify="true" name="room-bidding" className="space-y-6">
                
                {/* Spam protection */}
                <input type="hidden" name="bot-field" />
                
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="names">Your Names *</Label>
                    <Input
                      id="names"
                      name="names"
                      placeholder="e.g., Alex Johnson & Jamie Smith"
                      value={formData.names}
                      onChange={(e) => handleInputChange("names", e.target.value)}
                      className={errors.names ? "border-destructive" : ""}
                    />
                    {errors.names && (
                      <p className="text-sm text-destructive mt-1">{errors.names}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Room Bids */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Room Bids</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Total:</span>
                      <Badge variant={getTotalBadgeVariant()} className="font-mono">
                        ${total.toFixed(0)}
                      </Badge>
                      {total === 4000 && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>

                  {rooms.map((room) => (
                    <div key={room.id}>
                      <Label htmlFor={room.id} className="flex justify-between">
                        <span>{room.label} - {room.name}</span>
                        <span className="text-sm text-muted-foreground">$</span>
                      </Label>
                      <Input
                        id={room.id}
                        name={room.id}
                        type="number"
                        min="0"
                        max="4000"
                        step="50"
                        placeholder="0"
                        value={formData[room.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(room.id, e.target.value)}
                        className={`font-mono ${errors[room.id] ? "border-destructive" : ""}`}
                      />
                      {errors[room.id] && (
                        <p className="text-sm text-destructive mt-1">{errors[room.id]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total Display */}
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total Budget Allocated:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xl font-bold font-mono ${getTotalColor()}`}>
                        ${total.toFixed(0)}
                      </span>
                      <span className="text-muted-foreground">/ $4,000</span>
                      {total === 4000 ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  {total !== 4000 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {total < 4000 
                        ? `You need to allocate $${(4000 - total).toFixed(0)} more`
                        : `You've exceeded the budget by $${(total - 4000).toFixed(0)}`
                      }
                    </p>
                  )}
                </div>

                {/* Comments */}
                <div>
                  <Label htmlFor="comments">Additional Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    placeholder="Any special requests or notes..."
                    value={formData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Validation Errors */}
                {errors.total && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.total}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                  disabled={!isValid}
                >
                  {isValid ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Submit Bids
                    </>
                  ) : (
                    <>
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Complete Form to Submit
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Questions? Contact us at [your-email@example.com] or [phone-number]</p>
            <p>Bidding deadline: [Insert Deadline Date and Time]</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bidding;