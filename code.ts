interface Trip {
  pickup: string[];
  intermediate?: string; // Optional intermediate point
  drop: string[];
}

interface Shipment {
  pickups: string[];
  drops: string[];
}

function isValidTrips(trips: Trip[], shipment: Shipment): boolean {
  // Helper function to check if a point is present in an array of points
  const containsPoint = (points: string[], point: string): boolean => {
    return points.includes(point);
  };

  // Helper function to check if all pickups are visited before all drops in a trip
  const pickupsBeforeDrops = (trip: Trip): boolean => {
    const lastPickupIndex = trip.pickup.reduce((maxIndex, pickup) => {
      const pickupIndex = shipment.pickups.indexOf(pickup);
      return pickupIndex > maxIndex ? pickupIndex : maxIndex;
    }, -1);

    const firstDropIndex = trip.drop.reduce((minIndex, drop) => {
      const dropIndex = shipment.drops.indexOf(drop);
      return dropIndex < minIndex || minIndex === -1 ? dropIndex : minIndex;
    }, -1);

    return lastPickupIndex < firstDropIndex;
  };

  // Helper function to check if the intermediate point is legitimate
  const isValidIntermediatePoint = (trip: Trip): boolean => {
    return (
      !trip.intermediate ||
      containsPoint(shipment.pickups, trip.intermediate) ||
      containsPoint(shipment.drops, trip.intermediate)
    );
  };

  // Helper function to check if all pickup and drop points are connected via the intermediate point
  const connectedViaIntermediate = (trip: Trip): boolean => {
    if (!trip.intermediate) return true;

    const connectedPickups = trip.pickup.every(
      (pickup) =>
        containsPoint(shipment.pickups, pickup) || pickup === trip.intermediate
    );
    const connectedDrops = trip.drop.every(
      (drop) =>
        containsPoint(shipment.drops, drop) || drop === trip.intermediate
    );

    return connectedPickups && connectedDrops;
  };

  // Check validity for each trip
  for (const trip of trips) {
    if (!pickupsBeforeDrops(trip)) return false;
    if (!isValidIntermediatePoint(trip)) return false;
    if (!connectedViaIntermediate(trip)) return false;
  }

  return true;
}
