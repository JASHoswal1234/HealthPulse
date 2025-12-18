'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix marker icons for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function HealthMap({ locations, selectedLocation, onLocationSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const circlesRef = useRef([])
  const markersRef = useRef([])

  const severityStyle = (severity) => {
    switch (severity) {
      case 'high':
        return {
          color: '#ef4444',
          fillColor: 'rgba(239,68,68,0.28)',
          radius: 2600,
        }
      case 'moderate':
        return {
          color: '#eab308',
          fillColor: 'rgba(234,179,8,0.28)',
          radius: 1800,
        }
      default:
        return {
          color: '#10b981',
          fillColor: 'rgba(16,185,129,0.28)',
          radius: 1200,
        }
    }
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map – centered on Bengaluru
    const map = L.map(mapRef.current).setView([12.9716, 77.5946], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap Contributors',
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Draw markers + translucent circles
  useEffect(() => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current

    // Clear old layers
    markersRef.current.forEach((m) => map.removeLayer(m))
    circlesRef.current.forEach((c) => map.removeLayer(c))
    markersRef.current = []
    circlesRef.current = []

    // Plot new markers
    locations.forEach((loc) => {
      const style = severityStyle(loc.severity)

      // Severity translucent circle
      const circle = L.circle([loc.lat, loc.lng], {
        radius: style.radius,
        color: style.color,
        fillColor: style.fillColor,
        fillOpacity: 0.35,
        weight: 2,
      }).addTo(map)

      circlesRef.current.push(circle)

      // Actual marker
      const marker = L.marker([loc.lat, loc.lng], {
        riseOnHover: true,
      })
        .addTo(map)
        .on('click', () => {
          onLocationSelect(loc)
          marker.openPopup()
        })
        .bindPopup(`
          <div style="font-family: sans-serif; min-width: 150px;">
            <h3 style="margin:0;font-weight:600;color:#111">${loc.ward}</h3>
            <p style="margin:4px 0 0 0; font-size:13px; color:#444">
              Fever: ${loc.feverCount}<br/>
              Cough: ${loc.coughCount}<br/>
              Severity: ${loc.severity}
            </p>
          </div>
        `)

      markersRef.current.push(marker)
    })

    // Fit map to show everything nicely
    if (locations.length > 0) {
      const group = new L.FeatureGroup(markersRef.current)
      map.fitBounds(group.getBounds(), { padding: [40, 40] })
    }
  }, [locations])

  // Scroll to selected marker & open popup
  useEffect(() => {
    if (!selectedLocation || !mapInstanceRef.current) return

    const map = mapInstanceRef.current

    map.setView([selectedLocation.lat, selectedLocation.lng], 14)

    const marker = markersRef.current.find(
      (m) =>
        m.getLatLng().lat === selectedLocation.lat &&
        m.getLatLng().lng === selectedLocation.lng
    )

    if (marker) marker.openPopup()
  }, [selectedLocation])

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ minHeight: '100%', minWidth: '100%' }}
    />
  )
}
