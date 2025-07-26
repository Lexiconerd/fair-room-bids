import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ImageLightbox from "@/components/ImageLightbox";

interface RoomCardProps {
  letter: string;
  name: string;
  image: string | string[];
  features: string[];
  description: string;
  highlight?: string;
}

const RoomCard = ({ letter, name, image, features, description, highlight }: RoomCardProps) => {
  const images = Array.isArray(image) ? image : [image];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number = 0) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border">
      <div className="relative overflow-hidden rounded-t-lg">
        {images.length > 1 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <img 
                    src={img} 
                    alt={`${name} - Image ${index + 1}`}
                    className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => openLightbox(index)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <img 
            src={images[0]} 
            alt={name}
            className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => openLightbox(0)}
          />
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

      <ImageLightbox
        images={images}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
        roomName={name}
      />
    </Card>
  );
};

export default RoomCard;
