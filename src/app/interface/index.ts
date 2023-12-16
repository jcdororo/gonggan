export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface PlaceType {
  _id?: number;
  location?: string;
  openhour?: string | null;
  closehour?: string | null;
  businessday?: string[] | null;
  phone?: string | null;
  howtouse?: string | null;
  desc?: string | null;
  address_name?: string | null;
  category_group_code?: string | null;
  category_group_name?: string | null;
  category_name?: string | null;
  id?: string | null;
  place_name?: string | null;
  place_url?: string | null;
  road_address_name?: string | null;
  x?: string | null;
  y?: string | null;
  status?: string | null;
}