import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ROUTE_COLORS = ['#22C55E', '#F59E0B', '#EF4444'];

function MapView({
  userCoords,
  routes,
  shelters,
  dangerZone,
  selectedRouteIndex,
  onMapError
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!token) {
      console.warn('Mapbox token missing');
      onMapError?.();
      return;
    }

    mapboxgl.accessToken = token;

    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [userCoords?.lng || 3.3792, userCoords?.lat || 6.5244],
        zoom: 12
      });
      mapRef.current = map;

      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: false }), 'top-right');

      map.on('load', () => {
        if (userCoords) {
          new mapboxgl.Marker({
            color: '#0EA5E9'
          })
            .setLngLat([userCoords.lng, userCoords.lat])
            .addTo(map);
        }

        if (dangerZone?.center && dangerZone.radiusKm) {
          map.addSource('danger-zone', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [dangerZone.center.lng, dangerZone.center.lat]
              }
            }
          });

          map.addLayer({
            id: 'danger-zone-fill',
            type: 'circle',
            source: 'danger-zone',
            paint: {
              'circle-radius': dangerZone.radiusKm * 80,
              'circle-color': '#EF4444',
              'circle-opacity': 0.15
            }
          });
        }

        shelters?.forEach((shelter, index) => {
          const el = document.createElement('div');
          el.className =
            'bg-white rounded-full shadow-md border border-emerald-500 text-xs px-2 py-[2px]';
          el.innerText = '⛺';

          setTimeout(() => {
            new mapboxgl.Marker(el)
              .setLngLat([shelter.lng, shelter.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 12 }).setHTML(
                  `<strong>${shelter.name}</strong><br/><span style="font-size:11px">${shelter.address}</span>`
                )
              )
              .addTo(map);
          }, 200 * index);
        });

        routes?.forEach((route, index) => {
          const id = `route-${index}`;
          const coordinates =
            route.waypoints?.map((wp) => [wp.lng, wp.lat]) || [];

          map.addSource(id, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates
              }
            }
          });

          map.addLayer({
            id,
            type: 'line',
            source: id,
            layout: {
              'line-cap': 'round',
              'line-join': 'round'
            },
            paint: {
              'line-color': ROUTE_COLORS[index] || '#0F172A',
              'line-width': 4,
              'line-opacity': index === selectedRouteIndex ? 0.95 : 0.35
            }
          });

          let progress = 0;
          const animate = () => {
            progress += 0.03;
            if (progress > 1) {
              map.setPaintProperty(id, 'line-opacity', index === selectedRouteIndex ? 0.95 : 0.4);
              return;
            }
            map.setPaintProperty(id, 'line-opacity', Math.max(progress, 0.2));
            requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        });

        const allCoords = [];
        routes?.forEach((route) => {
          route.waypoints?.forEach((wp) => {
            allCoords.push([wp.lng, wp.lat]);
          });
        });
        if (userCoords) {
          allCoords.push([userCoords.lng, userCoords.lat]);
        }
        if (allCoords.length > 1) {
          const bounds = allCoords.reduce(
            (b, coord) => b.extend(coord),
            new mapboxgl.LngLatBounds(allCoords[0], allCoords[0])
          );
          map.fitBounds(bounds, { padding: 40, maxZoom: 14 });
        }
      });

      map.on('error', (e) => {
        console.error('Mapbox error', e);
        onMapError?.();
      });
    } catch (error) {
      console.error('Failed to load map', error);
      onMapError?.();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userCoords, routes, shelters, dangerZone, selectedRouteIndex, onMapError]);

  return <div ref={containerRef} className="w-full h-full" />;
}

export default MapView;

