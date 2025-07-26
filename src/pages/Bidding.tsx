import { useState, useEffect, useRef } from "react";
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
  const [weightedTotal, setWeightedTotal] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmissionTime = useRef(0);
  const honeypotRef = useRef("");

  const rooms = [
    { id: "roomA", label: "Room A", name: "Bedroom 1 (4 people)" },
    { id: "roomB", label: "Room B", name: "Bedroom 2" },
    { id: "roomC", label: "Room C", name: "Bedroom 3" },
    { id: "roomD", label: "Room D", name: "Bedroom 4" },
    { id: "roomE", label: "Room E", name: "Bedroom 5" }
  ];

  // Calculate total whenever room bids change
  useEffect(() => {
    const allBids = rooms.map(room => parseFloat(formData[room.id as keyof typeof formData] as string) || 0);
    const regularTotal = allBids.reduce((acc, bid) => acc + bid, 0);
    
    // Find the lowest bid and double it (singles pay half of cheapest room)
    const lowestBid = allBids.length > 0 ? Math.min(...allBids.filter(bid => bid > 0)) : 0;
    const weighted = regularTotal + (lowestBid || 0); // Add lowest bid once more
    
    setTotal(regularTotal);
    setWeightedTotal(weighted);
    setIsValid(weighted === 3275 && formData.names.trim().length > 0 && formData.email.trim().length > 0);
  }, [formData]);

  const sanitizeInput = (input: string, maxLength: number = 500): string => {
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/[<>]/g, '') // Remove potential XSS characters
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  };

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    
    if (field === 'names') {
      sanitizedValue = sanitizeInput(value, 100);
    } else if (field === 'email') {
      sanitizedValue = sanitizeInput(value, 254);
    } else if (field === 'comments') {
      sanitizedValue = sanitizeInput(value, 1000);
    } else if (field.startsWith('room')) {
      // For room bids, only allow numbers and basic characters
      sanitizedValue = value.replace(/[^0-9.]/, '');
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Enhanced validation with length checks
    if (!formData.names.trim()) {
      newErrors.names = "Names are required";
    } else if (formData.names.length < 2) {
      newErrors.names = "Names must be at least 2 characters";
    } else if (formData.names.length > 100) {
      newErrors.names = "Names must be less than 100 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 254) {
      newErrors.email = "Email address is too long";
    }

    // Enhanced room bid validation
    rooms.forEach(room => {
      const value = parseFloat(formData[room.id as keyof typeof formData] as string) || 0;
      if (value < 0) {
        newErrors[room.id] = "Bid cannot be negative";
      } else if (value > 10000) {
        newErrors[room.id] = "Bid cannot exceed $10,000";
      }
    });

    // Comments validation
    if (formData.comments.length > 1000) {
      newErrors.comments = "Comments must be less than 1000 characters";
    }

    if (weightedTotal !== 3275) {
      newErrors.total = "Total weighted bids must equal exactly $3,275 (lowest bid counts double for singles)";
    }

    // Honeypot check
    if (honeypotRef.current) {
      newErrors.bot = "Bot detected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmissionTime.current < 5000) {
      toast({
        title: "Please wait",
        description: "You can only submit once every 5 seconds",
        variant: "destructive"
      });
      return;
    }
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors",
        variant: "destructive"
      });
      return;
    }

    lastSubmissionTime.current = now;
    setIsSubmitting(true);

    try {
      // Method 1: Try with FormData (recommended for Netlify)
      const netlifyFormData = new FormData();
      netlifyFormData.append("form-name", "room-bidding");
      netlifyFormData.append("names", sanitizeInput(formData.names, 100));
      netlifyFormData.append("email", sanitizeInput(formData.email, 254));
      netlifyFormData.append("roomA", formData.roomA);
      netlifyFormData.append("roomB", formData.roomB);
      netlifyFormData.append("roomC", formData.roomC);
      netlifyFormData.append("roomD", formData.roomD);
      netlifyFormData.append("roomE", formData.roomE);
      netlifyFormData.append("comments", sanitizeInput(formData.comments, 1000));
      netlifyFormData.append("bot-field", honeypotRef.current);

      const response = await fetch("/", {
        method: "POST",
        body: netlifyFormData
      });

      if (response.ok) {
        toast({
          title: "Bids submitted successfully!",
          description: "Thank you for participating in the fair bidding system.",
        });

        // Reset form
        setFormData({
          names: "",
          email: "",
          roomA: "",
          roomB: "",
          roomC: "",
          roomD: "",
          roomE: "",
          comments: ""
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      // Fallback: Try URL-encoded format
      try {
        const encode = (data: Record<string, string>) => {
          return Object.keys(data)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
        };

        const fallbackResponse = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "room-bidding",
            names: sanitizeInput(formData.names, 100),
            email: sanitizeInput(formData.email, 254),
            roomA: formData.roomA,
            roomB: formData.roomB,
            roomC: formData.roomC,
            roomD: formData.roomD,
            roomE: formData.roomE,
            comments: sanitizeInput(formData.comments, 1000),
            "bot-field": honeypotRef.current,
          }),
        });

        if (fallbackResponse.ok) {
          toast({
            title: "Bids submitted successfully!",
            description: "Thank you for participating in the fair bidding system.",
          });

          // Reset form
          setFormData({
            names: "",
            email: "",
            roomA: "",
            roomB: "",
            roomC: "",
            roomD: "",
            roomE: "",
            comments: ""
          });
        } else {
          throw new Error("Both submission methods failed");
        }
      } catch (fallbackError) {
        toast({
          title: "Submission failed",
          description: "Please try again or contact support if the problem persists.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalBadgeVariant = () => {
    if (weightedTotal === 3275) return "default";
    if (weightedTotal > 3275) return "destructive";
    return "secondary";
  };

  const getTotalColor = () => {
    if (weightedTotal === 3275) return "text-primary";
    if (weightedTotal > 3275) return "text-destructive";
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
              Your weighted total must equal $3,275 (lowest bid counts double for singles)
            </p>
          </div>

          {/* Instructions */}
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <DollarSign className="h-4 w-4" />
            <AlertDescription className="text-foreground">
              <strong>Important:</strong> Your weighted total must equal exactly $3,275. 
              The lowest bid counts double because singles will pay half of the cheapest room. Bid higher on rooms you prefer more. 
              The system will assign rooms fairly and you'll typically pay less than your maximum bid.
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="names">Your Names *</Label>
                    <Input
                      id="names"
                      name="names"
                      value={formData.names}
                      onChange={(e) => handleInputChange("names", e.target.value)}
                      placeholder="e.g., Alex Johnson & Jamie Smith"
                      className={errors.names ? "border-destructive" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.names && <p className="text-sm text-destructive mt-1">{errors.names}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={errors.email ? "border-destructive" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Room Bids */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Room Bids</h3>
                  <p className="text-sm text-muted-foreground">
                    Note: The lowest bid will count double in the total (singles pay half of cheapest room)
                  </p>
                  
                  {rooms.map((room) => (
                    <div key={room.id}>
                      <Label htmlFor={room.id}>{room.label} - {room.name} ($)</Label>
                      <Input
                        id={room.id}
                        name={room.id}
                        type="number"
                        min="0"
                        step="25"
                        value={formData[room.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(room.id, e.target.value)}
                        placeholder="0"
                        className={errors[room.id] ? "border-destructive" : ""}
                        disabled={isSubmitting}
                      />
                      {errors[room.id] && <p className="text-sm text-destructive mt-1">{errors[room.id]}</p>}
                    </div>
                  ))}
                </div>

                {/* Total Display */}
                <div className="bg-accent/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Regular Total:</span>
                    <span className={getTotalColor()}>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Weighted Total (Lowest × 2):</span>
                    <Badge variant={getTotalBadgeVariant()}>
                      ${weightedTotal.toFixed(2)}
                      {weightedTotal === 3275 && <CheckCircle className="ml-1 h-3 w-3" />}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Target: $3,275 {weightedTotal !== 3275 && (
                      <span className="text-destructive">
                        ({weightedTotal > 3275 ? '-' : '+'}${Math.abs(weightedTotal - 3275).toFixed(2)})
                      </span>
                    )}
                  </div>
                  {errors.total && <p className="text-sm text-destructive mt-2">{errors.total}</p>}
                </div>

                <div>
                  <Label htmlFor="comments">Additional Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                    placeholder="Any special requests or notes... (max 1000 characters)"
                    rows={3}
                    maxLength={1000}
                    disabled={isSubmitting}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {formData.comments.length}/1000 characters
                  </div>
                </div>

                {/* Honeypot field for bot detection */}
                <input
                  type="text"
                  name="bot-field"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  onChange={(e) => honeypotRef.current = e.target.value}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full" 
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Bids"}
                  {isValid && !isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
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
