import { BarcodeBounds, BarcodePoint, Point } from "expo-camera";

export interface CardProps {
    id: number;
    cardTitle: string;
    cardContent: string;
  }

  export interface BarcodeData {
    bounds: BarcodeBounds
    cornerPoints:BarcodePoint
    data:string,
    type:string
  }