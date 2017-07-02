import Skills from 'APP/lib/skill-map';

const classes = {
    0: "Amazon",
    1: "Sorceress",
    2: "Necromancer",
    3: "Paladin",
    4: "Barbarian",
    5: "Druid",
    6: "Assassin"
}

module.exports = {
    normalize: function(property) {

        switch(property.id) {
            case 54:
                // This is a field for cold damage over time, to compute the amount
                // of damage shown in the game, divide index 2 by 25.

                if(!property.normalized) {
                    property.values[2] /= 25;
                    property.normalized = true;
                }

                break;
            case 57:
                // This is a field for poison damage over time, to compute the amount
                // of damage shown in the game, multiply the first field by
                // the third and divide by 256 (repeat with the second field).

                //For example, if the field values are 30, 60, and 75, you get 30*75/256=8, 60*75/256=17, and 75/25=3, so the displayed property is "Adds 8-17 Poison Damage over 3 seconds".

                if(!property.normalized) {
                    property.values[0] = parseInt((property.values[0] * property.values[2])/256, 10);
                    property.values[1] = parseInt((property.values[1] * property.values[2])/256, 10);
                    property.values[2] /= 25;
                    property.normalized = true;
                }

                break;
            case 83:
            case 84:
                // These attributes have a class id at index 0, we'll replace
                // it with the proper class name.
                if(!property.normalized) {
                    property.values[0] = classes[property.values[0]];
                    property.normalized = true;
                }
                break;

            case 97:
                // Number of levels to a certain skill, e.g. +1 To Teleport, only
                // the skill is the skill id. We need to replace it with the skill name.

                if(!property.normalized) {
                    property.values[0] = Skills.list[property.values[0]];
                    property.normalized = true;
                }
                break;

            case 98:
                // This property is only a visual effect, called NV state. This property
                // Only appears on imported charms. It shows a +1 to a certain visual effect
                // e.g. Whirlwind.

                if(!property.normalized) {
                    property.values[0] = Skills.nvStates[property.values[0]];
                    property.normalized = true;
                }
                break;

            case 107:
                // Number of levels to a certain class specific skill, e.g.
                // +3 to Lightning Fury. Index 0 is the skill id, and index 1
                // is the number of + skills.
                if(!property.normalized) {
                    property.values[0] = Skills.list[property.values[0]];
                    property.normalized = true;
                }

                break;
            case 151:
                // This attribute is an equipped aura, e.g. +13 Conviction when
                // equipped. The skill is the skill id, we'll replace it with the
                // real name.

                if(!property.normalized) {
                    property.values[0] = Skills.list[property.values[0]];
                    property.normalized = true;
                }
                break;

            case 188:
                // Skillers and other items have this attribute when they add
                // levels to a certain skill tree, e.g. +1 to Curses.
                // The value at index 0 is the skill tree index (0-2 per class), index 1 is the
                // class id, and index 2 is the number of levels increased.

                // The skill tree id consists of the class offset value and the skill tree
                // offset. So for example the skill tree offset 1 + class id 5
                // would be index 5 in the offset array which is 15,
                // so 1 + 15 = 16, the skill tree is tree index 16, shape shifting.

                if(!property.normalized) {

                    let treeID = property.values[0];
                    let offset = Skills.skillTreeOffsets[property.values[1]];
                    let index = treeID + offset;

                    property.values[0] = Skills.skilltrees[index];
                    property.values[1] = classes[property.values[1]];

                    property.normalized = true;
                }

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
                // struck and on striking. First index is skill level, index 1
                // is the skill id, that needs normalizing, and index 2 is
                // the chance to cast the spell in %.

                if(!property.normalized) {
                    property.values[1] = Skills.list[property.values[1]];
                    property.normalized = true;
                }
                break;


            case 204:
            case 205:
            case 206:
            case 207:
            case 208:
            case 209:
            case 210:
            case 211:
            case 212:
            case 213:
                // These are skill charges, the first index is the spell id,
                // index 1 is the skill level, index 2 is the remaining charges
                //  and index 3 is the total amount of charges.

                if(!property.normalized) {
                    property.values[1] = Skills.list[property.values[1]];
                    property.normalized = true;
                }

                break;
            case 214:
            case 215:
            case 216:
            case 217:
            case 218:
            case 219:
            case 220:
            case 221:
            case 222:
            case 223:
            case 224:
            case 225:
            case 226:
            case 227:
            case 228:
            case 229:
            case 230:
            case 231:
            case 232:
            case 233:
            case 234:
            case 235:
            case 236:
            case 237:
            case 238:
            case 239:
            case 240:
            case 241:
            case 242:
            case 243:
            case 244:
            case 245:
            case 246:
            case 247:
            case 248:
            case 249:
            case 250:
                // These are values based on character level, they are calculated
                // on the fly, just do (value * 0.125)% per level.

                if(!property.normalized) {
                    property.values[0] = parseInt((property.values[0] * 0.125) * window.char_level, 10);
                    property.normalized = true;
                }

                break;
            case 252:
                // The value of the data field is not actually a time period, but a frequency in terms
                // of the number of times durability is repaired over a period of 100 seconds.
                // For example, if the value is 5, then this property repairs 1 durability in 100 / 5 = 20 seconds.

                if(!property.normalized) {
                    property.values[0] = parseInt(100 / property.values[0], 10);
                    property.normalized = true;
                }

                break;
            default:
                return;
        }
    }
};
