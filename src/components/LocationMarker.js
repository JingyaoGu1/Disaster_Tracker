import { Icon } from '@iconify/react'
import fireIcon from '@iconify/icons-mdi/fire'
import snowIcon from '@iconify/icons-mdi/snowflake'
import volcanoIcon from '@iconify/icons-mdi/mountain'
import tempIcon from '@iconify/icons-mdi/temperature-fahrenheit'



const iconMapping = {
    8: fireIcon,
    12: volcanoIcon,
    17: snowIcon,
    18: tempIcon,
};


const LocationMarker = ({ lat, lng, onClick, eventType }) => {
    const icon = iconMapping[eventType] || fireIcon // Default to fireIcon if no match
    return (
        <div className="location-marker" onClick={onClick}>
            <Icon icon={icon} className="location-icon" />
        </div>
    )
}

export default LocationMarker
