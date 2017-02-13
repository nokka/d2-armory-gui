module.exports = {
    merge: function(attributes, list) {

        for(var i = 0; i < list.length; i++) {
            var index = this._exists(list[i].id, attributes);

            if(index >= 0) {

                switch(list[i].id) {
                    case 57:
                        // This is a field for poison damage over time, to compute the amount
                        // of damage shown in the game, multiply the first field by
                        // the third and divide by 256 (repeat with the second field).

                        //For example, if the field values are 30, 60, and 75, you get 30*75/256=8, 60*75/256=17, and 75/25=3, so the displayed property is "Adds 8-17 Poison Damage over 3 seconds".

                        if(0 in attributes[index].values && 1 in attributes[index].values && 2 in attributes[index].values) {

                            var minToAdd = parseInt((list[i].values[0] * list[i].values[2])/256, 10);
                            var maxToAdd = parseInt((list[i].values[1] * list[i].values[2])/256, 10);

                            attributes[index].values[0] += minToAdd;
                            attributes[index].values[1] += maxToAdd;
                            //property.values[2] /= 25;
                        }

                        /*if(0 in property.values && 1 in property.values && 2 in property.values) {
                            property.values[0] = parseInt((property.values[0] * property.values[2])/256, 10);
                            property.values[1] = parseInt((property.values[1] * property.values[2])/256, 10);
                            property.values[2] /= 25;
                        }*/

                        break;
                    case 195:
                    case 196:
                    case 197:
                    case 198:
                    case 199:
                    case 201:
                    case 202:
                    case 203:
                        // These attributes are chance to cast spells on dying, getting
                        // struck and on striking. First index is skill level.

                        // We'll only be added the percentage chance to cast the
                        // skill. The level and skill id won't be added together.

                        if(2 in attributes[index].values) {
                            attributes[index].values[2] += list[i].values[2];
                        }
                        break;
                    default:
                        if(0 in attributes[index].values) {
                            attributes[index].values[0] += list[i].values[0];
                        }
                        break;
                }
            } else {
                attributes.push(list[i]);
            }
        }

        return attributes;
    },
    _exists: function(id, list) {

        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return i;
            }
        }

        return -1;
    }
};
