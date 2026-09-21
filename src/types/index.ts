export interface ServiceItem {
  id: string;
  title: string;
  hindiTitle: string;
  iconName: string;
  tagline: string;
  description: string;
  startingPrice: string;
  turnaround: string;
  popularCuts: string[];
  image: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'suit' | 'blouse' | 'lehenga' | 'alteration';
  image: string;
  details: string;
  tag: string;
}

export interface ConfiguratorState {
  serviceType: string;
  styleCut: string;
  fabricStatus: string;
  urgency: string;
  eventDate: string;
  customerNote: string;
}
