import GeoJSON from 'geojson';

export function toGeoJSON(data) {
  return {
    type: 'geojson',
    data: GeoJSON.parse(data?.length ? data : [], {
      Point: ['lat', 'lng'],
    }),
  };
}
