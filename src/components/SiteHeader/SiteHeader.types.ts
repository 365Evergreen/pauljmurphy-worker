export interface NavItem {
  id: string;
  label: string;
  url: string;
}

export interface SiteHeaderProps {
  logo?: string;
  siteName: string;
  navigation: NavItem[];
}