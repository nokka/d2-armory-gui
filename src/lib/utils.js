// Constants.
import Locations from './item-locations';

export
function handleItem(item, result) {
    // First lets check if it's equipped, then it'll have
    // the location_id set.

    switch(item.location_id) {
        case Locations.character.equipped:
            return result.equipped.push(item);

        case Locations.character.belt:
            return result.belt.push(item);

        default:
            break;
    }

    // Looks like the item isn't equipped, so it has to be stored
    // in cube, stash or inventory.
    switch(item.alt_position_id) {
        case Locations.stored.inventory:
            return result.inventory.push(item);

        case Locations.stored.cube:
            return result.cube.push(item);

        case Locations.stored.stash:
            return result.stash.push(item);

        default:
            break;
    }

    return true;
}
