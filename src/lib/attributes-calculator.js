export default {
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

                // Fire res.
                case 39:
                    if(0 in list[i].values) {
                        attributes.fire_res += list[i].values[0];
                    }
                    break;

                // Cold res.
                case 43:
                    if(0 in list[i].values) {
                        attributes.cold_res += list[i].values[0];
                    }
                    break;

                // Lightning res.
                case 41:
                    if(0 in list[i].values) {
                        attributes.light_res += list[i].values[0];
                    }
                    break;

                // Poison res.
                case 45:
                    if(0 in list[i].values) {
                        attributes.poison_res += list[i].values[0];
                    }
                    break;

                // Maximum fire res.
                case 40:
                    if(0 in list[i].values) {
                        attributes.max_fire_res += list[i].values[0];
                    }
                    break;

                // Maximum cold res.
                case 44:
                    if(0 in list[i].values) {
                        attributes.max_cold_res += list[i].values[0];
                    }
                    break;

                // Maximum lightning res.
                case 42:
                    if(0 in list[i].values) {
                        attributes.max_light_res += list[i].values[0];
                    }
                    break;

                // Maximum poison res.
                case 46:
                    if(0 in list[i].values) {
                        attributes.max_poison_res += list[i].values[0];
                    }
                    break;

                default:
                    break;
            }
        }

        return attributes;
    },
    calculateItem: function(item, extraAttributes) {

        if(item.magic_attributes !== null) {
            this.calculate(extraAttributes, item.magic_attributes);
        }

        if(item.runeword_attributes !== null) {
            this.calculate(extraAttributes, item.runeword_attributes);
        }

        if(item.socketed_items !== null) {
            for(var i = 0; i < item.socketed_items.length; i++) {
                this.calculate(extraAttributes, item.socketed_items[i].magic_attributes);
            }
        }
    }
};
