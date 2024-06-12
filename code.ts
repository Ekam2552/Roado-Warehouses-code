interface Trip {
  pickup: string[];
  intermediate?: string; // Optional intermediate point
  drop: string[];
}

interface Shipment {
  pickups: string[];
  drops: string[];
}
