export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GearItem {
  name: string;
  type: string;
  priceRange?: string;
  reason: string;
}

export interface CompatibilityResult {
  cameraName: string;
  mountType: string;
  sensorSize: string;
  lenses: GearItem[];
  accessories: GearItem[];
  media: GearItem[];
}

export interface ShootPlan {
  lightingSetup: string;
  cameraSettings: {
    aperture: string;
    shutterSpeed: string;
    iso: string;
    whiteBalance: string;
    focusMode: string;
  };
  gearList: string[];
  compositionTips: string[];
  goldenHourNote?: string;
}

export interface PackingCategory {
  categoryName: string;
  items: {
    item: string;
    essential: boolean;
    notes: string;
  }[];
}

export interface PackingListResponse {
  tripName: string;
  weatherWarning: string;
  categories: PackingCategory[];
}

export enum ShootType {
  PORTRAIT = 'Portrait',
  LANDSCAPE = 'Landscape',
  STREET = 'Street',
  EVENT = 'Event',
  SPORTS = 'Sports',
  MACRO = 'Macro',
  ASTRO = 'Astrophotography',
  PRODUCT = 'Product',
}
