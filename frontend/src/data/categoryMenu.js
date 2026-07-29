// Subcategories link back to their parent category filter for now —
// once products carry a `subcategory` field, these can filter more precisely.
export const CATEGORY_MENU = [
  {
    name: 'Engine Parts',
    subcategories: ['Timing Components', 'Belts & Chains', 'Gaskets & Seals', 'Radiators & Cooling', 'Fuel System'],
  },
  {
    name: 'Suspension',
    subcategories: ['Shock Absorbers', 'Control Arms', 'Struts', 'Bushings', 'Stabilizer Bars'],
  },
  {
    name: 'Electrical',
    subcategories: ['Batteries', 'Alternators', 'Starters', 'Wiring & Sensors', 'Ignition Coils'],
  },
  {
    name: 'Body Parts',
    subcategories: ['Bumpers', 'Side Mirrors', 'Fenders', 'Grilles', 'Door Panels'],
  },
  {
    name: 'Brakes',
    subcategories: ['Brake Discs', 'Brake Pads', 'Calipers', 'Brake Lines', 'Master Cylinders'],
  },
  {
    name: 'Filters',
    subcategories: ['Oil Filters', 'Air Filters', 'Fuel Filters', 'Cabin / AC Filters'],
  },
  {
    name: 'Lighting',
    subcategories: ['Headlights', 'Taillights', 'Fog Lamps', 'Indicators'],
  },
  {
    name: 'Accessories',
    subcategories: ['Floor Mats', 'Seat Covers', 'Steering Accessories', 'Car Care'],
  },
]