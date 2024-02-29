import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
// import SnowMaker from './SnowMarker'
import LocationInfoBox from './LocationInfoBox'

// define constants
const NATURAL_EVENT_WILDFIRE = 8;
const VOLCANOS = 12;
const TEMPERATURE_EXTREMES = 18;
const SNOW = 17;


const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)
    const [showWildFire, setShowWildFire] = useState(true)
    const [showVol, setShowVol] = useState(true)
    const [showSnow, setShowSnow] = useState(true)
    const [showTemp, setShowTemp] = useState(true)
    const [checkboxPos, setCheckboxPos] = useState({ top: 10, left: 10 });
    const [isDragging, setIsDragging] = useState(false);

    const startDrag = (e) => {
        setIsDragging(true);
    };

    const onDrag = (e) => {
        if (isDragging) {
            setCheckboxPos({
                top: e.clientY - e.target.offsetHeight / 2,
                left: e.clientX - e.target.offsetWidth / 2
            });
        }
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    const markers = eventData.map((ev, index) => {
        if(showWildFire && ev.categories[0].id === NATURAL_EVENT_WILDFIRE) {
            return <LocationMarker key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title })} eventType={NATURAL_EVENT_WILDFIRE} />
        }
        else if(showVol &&ev.categories[0].id === SNOW) {
            return <LocationMarker key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title })} eventType={SNOW} />
        }
        else if(showVol &&ev.categories[0].id === TEMPERATURE_EXTREMES) {
            return <LocationMarker key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title })} eventType={TEMPERATURE_EXTREMES} />
        }
        else if(showVol &&ev.categories[0].id === VOLCANOS) {
            return <LocationMarker key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title })} eventType={VOLCANOS} />
        }
        return null
    })

    return (
        <div>
             <div className='checkbox-container'
                            onMouseDown={startDrag}
                            onMouseMove={onDrag}
                            onMouseUp={stopDrag}
                            onMouseLeave={stopDrag}
                            style={{ top: `${checkboxPos.top}px`, left: `${checkboxPos.left}px` }}
             >
                <input type="checkbox" checked={showWildFire} onChange={(e) => setShowWildFire(e.target.checked)} /> Show Wildfires
                <input type="checkbox" checked={showSnow} onChange={(e) => setShowSnow(e.target.checked)} /> Show Snow Events
                <input type="checkbox" checked={showTemp} onChange={(e) => setShowTemp(e.target.checked)} /> Show Extreme Temperatures
                <input type="checkbox" checked={showVol} onChange={(e) => setShowVol(e.target.checked)} /> Show Volcano Events
            </div>
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={ center }
                    defaultZoom={ zoom }
                >
                    {markers}
                </GoogleMapReact>
                {locationInfo && <LocationInfoBox info={locationInfo} />}
            </div>
        </div>

    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
}

export default Map
