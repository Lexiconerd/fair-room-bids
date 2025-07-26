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
  const [weightedTotal, setWeightedTotal] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rooms = [
    { id: "roomA", label: "Room A", name: "Ocean View Master (4 people)" },
    { id: "roomB", label: "Room B", name: "Cozy Brick Loft" },
    { id: "roomC", label: "Room C", name: "Luxury Suite" },
    { id: "roomD", label: "Room D", name: "Modern Industrial" },
    { id: "roomE", label: "Room E", name: "Garden Paradise" }
  ];

  // Calculate total whenever room bids change
  useEffect(() => {
    const roomABid = parseFloat(formData.roomA) || 0;
    const otherRoomsBids = rooms.slice(1).reduce((acc, room) => {
      const value = parseFloat(formData[room.id as keyof typeof formData] as string) || 0;
      return acc + value;
    }, 0);
    
    const regularTotal = roomABid + otherRoomsBids;
    const weighted = (roomABid * 2) + otherRoomsBids; // Room A counts double
    
    setTotal(regularTotal);
    setWeightedTotal(weighted);
    setIsValid(weighted === 3275 && formData.names.trim().length > 0 && formData.email.trim().length > 0);
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

    if (weightedTotal !== 3275) {
      newErrors.total = "Total weighted bids must equal exactly $3,275 (Room A counts double)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check the form for validation errors",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Method 1: Try with FormData (recommended for Netlify)
      const netlifyFormData = new FormData();
      netlifyFormData.append("form-name", "room-bidding");
      netlifyFormData.append("names", formData.names);
      netlifyFormData.append("email", formData.email);
      netlifyFormData.append("roomA", formData.roomA);
      netlifyFormData.append("roomB", formData.roomB);
      netlifyFormData.append("roomC", formData.roomC);
      netlifyFormData.append("roomD", formData.roomD);
      netlifyFormData.append("roomE", formData.roomE);
      netlifyFormData.append("comments", formData.comments);

      console.log("Submitting form data:", Object.fromEntries(netlifyFormData));

      const response = await fetch("/", {
        method: "POST",
        body: netlifyFormData
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

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
        // Log response for debugging
        const responseText = await response.text();
        console.error("Form submission failed:", response.status, responseText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error("Form submission error:", error);
      
      // Fallback: Try URL-encoded format
      try {
        console.log("Trying fallback URL-encoded submission...");
        
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
            names: formData.names,
            email: formData.email,
            roomA: formData.roomA,
            roomB: formData.roomB,
            roomC: formData.roomC,
            roomD: formData.roomD,
            roomE: formData.roomE,
            comments: formData.comments,
          }),
        });

        console.log("Fallback response status:", fallbackResponse.status);

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
        console.error("Fallback submission also failed:", fallbackError);
        toast({
          title: "Submission failed",
          description: "Please try again or contact support if the problem persists. Check browser console for details.",
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
              Your weighted total must equal $3,275 (Room A counts double as it houses 4 people)
            </p>
          </div>

          {/* Instructions */}
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <DollarSign className="h-4 w-4" />
            <AlertDescription className="text-foreground">
              <strong>Important:</strong> Your weighted total must equal exactly $3,275. 
              Room A counts double (4 people vs 2). Bid higher on rooms you prefer more. 
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
                    Note: Room A will count double in the total (houses 4 people vs 2)
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
                    <span className="font-medium">Weighted Total (Room A × 2):</span>
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
                    placeholder="Any special requests or notes..."
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

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

          {/* Debug Section (remove in production) */}
          <Card className="mt-8 bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-sm">Debug Information</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              <div>Weighted Total: ${weightedTotal}</div>
              <div>Valid: {isValid ? "Yes" : "No"}</div>
              <div>Form Action: POST to "/"</div>
              <div>Current URL: {window.location.href}</div>
              <div>Check browser console for submission logs</div>
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
