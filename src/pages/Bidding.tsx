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
    firstPick: "",
    secondPick: "",
    thirdPick: "",
    fourthPick: "",
    fifthPick: "",
    comments: ""
  });

  const [total, setTotal] = useState(0);
  const [weightedTotal, setWeightedTotal] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmissionTime = useRef(0);
  const honeypotRef = useRef("");

  const pickOrders = [
    { id: "firstPick", label: "1st Pick (Primary Bedroom)" },
    { id: "secondPick", label: "2nd Pick (Best remaining)" },
    { id: "thirdPick", label: "3rd Pick" },
    { id: "fourthPick", label: "4th Pick" },
    { id: "fifthPick", label: "5th Pick (Last choice)" }
  ];

  // Calculate total whenever pick order bids change
  useEffect(() => {
    const allBids = pickOrders.map(pick => parseFloat(formData[pick.id as keyof typeof formData] as string) || 0);
    const regularTotal = allBids.reduce((acc, bid) => acc + bid, 0);
    
    // Double the 5th pick (lowest bid) for weighted total calculation
    const fifthPickValue = parseFloat(formData.fifthPick) || 0;
    const weightedCalculation = regularTotal + fifthPickValue; // Add 5th pick again to double it
    
    setTotal(regularTotal);
    setWeightedTotal(weightedCalculation);
    setIsValid(weightedCalculation === 3275 && formData.names.trim().length > 0 && formData.email.trim().length > 0);
  }, [formData]);

  const sanitizeInput = (input: string, maxLength: number = 500): string => {
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/[<>]/g, '') // Remove potential XSS characters
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  };

  const formatCurrency = (value: string): string => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Handle multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    return numericValue;
  };

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    
    if (field === 'names') {
      sanitizedValue = sanitizeInput(value, 100);
    } else if (field === 'email') {
      sanitizedValue = sanitizeInput(value, 254);
    } else if (field === 'comments') {
      sanitizedValue = sanitizeInput(value, 1000);
    } else if (field.includes('Pick')) {
      // For pick order bids, format as currency without $ sign
      sanitizedValue = formatCurrency(value);
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

    // Enhanced pick order bid validation
    const pickValues = pickOrders.map(pick => parseFloat(formData[pick.id as keyof typeof formData] as string) || 0);
    
    pickOrders.forEach((pick, index) => {
      const value = pickValues[index];
      if (value < 0) {
        newErrors[pick.id] = "Bid cannot be negative";
      } else if (value > 10000) {
        newErrors[pick.id] = "Bid cannot exceed $10,000";
      }
      
      // Validate that subsequent picks are not higher than previous picks
      if (index > 0 && value > pickValues[index - 1]) {
        const previousPickLabel = pickOrders[index - 1].label.split(' ')[0];
        newErrors[pick.id] = `Cannot be higher than ${previousPickLabel} bid ($${pickValues[index - 1]})`;
      }
    });

    // Comments validation
    if (formData.comments.length > 1000) {
      newErrors.comments = "Comments must be less than 1000 characters";
    }

    if (weightedTotal !== 3275) {
      newErrors.total = "Total pick order bids must equal exactly $3,275";
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
      netlifyFormData.append("form-name", "pick-order-bidding");
      netlifyFormData.append("names", sanitizeInput(formData.names, 100));
      netlifyFormData.append("email", sanitizeInput(formData.email, 254));
      netlifyFormData.append("firstPick", formData.firstPick);
      netlifyFormData.append("secondPick", formData.secondPick);
      netlifyFormData.append("thirdPick", formData.thirdPick);
      netlifyFormData.append("fourthPick", formData.fourthPick);
      netlifyFormData.append("fifthPick", formData.fifthPick);
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
          firstPick: "",
          secondPick: "",
          thirdPick: "",
          fourthPick: "",
          fifthPick: "",
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
            "form-name": "pick-order-bidding",
            names: sanitizeInput(formData.names, 100),
            email: sanitizeInput(formData.email, 254),
            firstPick: formData.firstPick,
            secondPick: formData.secondPick,
            thirdPick: formData.thirdPick,
            fourthPick: formData.fourthPick,
            fifthPick: formData.fifthPick,
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
            firstPick: "",
            secondPick: "",
            thirdPick: "",
            fourthPick: "",
            fifthPick: "",
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">Submit Your Pick Order Bids</h1>
            <p className="text-xl text-muted-foreground">
              Your total must equal $3,275 across all pick order positions
            </p>
          </div>

          {/* Instructions */}
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <DollarSign className="h-4 w-4" />
            <AlertDescription className="text-foreground">
              <strong>Important:</strong> Your total must equal exactly $3,275. 
              Bid on pick order positions NOT bedrooms, but first pick will probably take primary bedroom. 
              Singles automatically get bedroom 5 (twin beds) and pay half the lowest couple payment.
              Couples that don't participate will have equal bids automatically assigned to them.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Bidding Form</span>
              </CardTitle>
              <CardDescription>
                Complete all fields below. Deadline: August 31
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

                {/* Pick Order Bids */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Pick Order Bids</h3>
                  <p className="text-sm text-muted-foreground">
                    Bid on your preferred pick order. 1st pick chooses Primary bedroom, then bedrooms 1-4 in order.
                  </p>
                  
                  {pickOrders.map((pick) => (
                    <div key={pick.id}>
                      <Label htmlFor={pick.id}>{pick.label}</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id={pick.id}
                          name={pick.id}
                          type="text"
                          value={formData[pick.id as keyof typeof formData]}
                          onChange={(e) => handleInputChange(pick.id, e.target.value)}
                          placeholder="0"
                          className={`pl-8 ${errors[pick.id] ? "border-destructive" : ""}`}
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors[pick.id] && <p className="text-sm text-destructive mt-1">{errors[pick.id]}</p>}
                    </div>
                  ))}
                </div>

                {/* Total Display */}
                <div className="bg-accent/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Pick Order Bids:</span>
                    <Badge variant="secondary">
                      ${total.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Weighted Total (5th pick doubled):</span>
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
            <p>Questions? Complaints? Just text me. You have my number. You know where to find me.</p>
            <p>Bidding deadline: August 31, 11:59PM. No extensions.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bidding;
