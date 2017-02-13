module.exports = {
    lifePerVitality: {
        "Amazon": 3,
        "Sorceress": 2,
        "Necromancer": 2,
        "Paladin": 3,
        "Barbarian": 4,
        "Druid": 2,
        "Assassin": 3
    },
    manaPerEnergy: {
        "Amazon": 1.5,
        "Sorceress": 2,
        "Necromancer": 2,
        "Paladin": 1.5,
        "Barbarian": 1,
        "Druid": 2,
        "Assassin": 1.75
    },
    calculate: function(attributes, list) {

        for(var i = 0; i < list.length; i++) {

            switch(list[i].id) {
                // Strength.
                case 0:
                    if(0 in list[i].values) {
                        attributes.strength += list[i].values[0];
                    }
                    break;

                // Energy.
                case 1:
                    if(0 in list[i].values) {
                        attributes.energy += list[i].values[0];
                    }
                    break;

                // Dexterity.
                case 2:
                    if(0 in list[i].values) {
                        attributes.dexterity += list[i].values[0];
                    }
                    break;

                // Vitality.
                case 3:
                    if(0 in list[i].values) {
                        attributes.vitality += list[i].values[0];
                    }
                    break;

                // Max HP.
                case 7:
                    if(0 in list[i].values) {
                        attributes.max_hp += list[i].values[0];
                    }
                    break;

                // Max mana.
                case 9:
                    if(0 in list[i].values) {
                        attributes.max_mana += list[i].values[0];
                    }
                    break;
                default:
                    break;
            }
        }

        return attributes;
    }
};
