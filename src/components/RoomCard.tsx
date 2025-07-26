import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoomCardProps {
  letter: string;
  name: string;
  image: string;
  features: string[];
  description: string;
  highlight?: string;
}

const RoomCard = ({ letter, name, image, features, description, highlight }: RoomCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
            Room {letter}
          </Badge>
        </div>
        {highlight && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-primary-foreground">
              {highlight}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2 text-foreground">Key Features:</h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;