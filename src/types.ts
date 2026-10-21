export type TabType = 'centers' | 'saved' | 'streets' | 'guide';

export type SortOption = 'default' | 'name' | 'phone';

export interface FilterState {
  query: string;
  type: string;
  street: string;
  onlyNightShift: boolean;
  onlySaved: boolean;
  ownership: string;
  sortBy: SortOption;
}
