const classes = {
    0: "Amazon",
    1: "Sorceress",
    2: "Necromancer",
    3: "Paladin",
    4: "Barbarian",
    5: "Druid",
    6: "Assassin"
}

const skilltrees = {
    0: "Bow & Crossbow",
    1: "Passive & Magic",
    2: "Javelin & Spear",
    3: "Fire",
    4: "Lightning",
    5: "Cold",
    6: "Curses",
    7: "Poison & Bone",
    8: "Summoning",
    9: "Combat",
    10: "Offensive Auras",
    11: "Defensive Auras",
    12: "Combat",
    13: "Masteries",
    14: "Warcries",
    15: "Summoning",
    16: "Shape Shifting",
    17: "Elemental",
    18: "Traps",
    19: "Shadow Disciplines",
    20: "Martial Arts"
}

const skillTreeOffsets = {
	0: 0,
	1: 3,
	2: 6,
	3: 9,
	4: 12,
	5: 15,
	6: 18
}

const skills = {
    0:   "Attack",
    1:   "Kick",
    2:   "Throw Item",
    3:   "Unsummon",
    4:   "Left Hand Throw",
    5:   "Left Hand Swing",
    6:   "Magic Arrow",
    7:   "Fire Arrow",
    8:   "Inner Sight",
    9:   "Critical Strike",
    10:  "Jab",
    11:  "Cold Arrow",
    12:  "Multiple Shot",
    13:  "Dodge",
    14:  "Power Strike",
    15:  "Poison Javelin",
    16:  "Exploding Arrow",
    17:  "Slow Missiles",
    18:  "Avoid",
    19:  "Impale",
    20:  "Lightning Bolt",
    21:  "Ice Arrow",
    22:  "Guided Arrow",
    23:  "Penetrate",
    24:  "Charged Strike",
    25:  "Plague Javelin",
    26:  "Strafe",
    27:  "Immolation Arrow",
    28:  "Dopplezon",
    29:  "Evade",
    30:  "Fend",
    31:  "Freezing Arrow",
    32:  "Valkyrie",
    33:  "Pierce",
    34:  "Lightning Strike",
    35:  "Lightning Fury",
    36:  "Fire Bolt",
    37:  "Warmth",
    38:  "Charged Bolt",
    39:  "Ice Bolt",
    40:  "Frozen Armor",
    41:  "Inferno",
    42:  "Static Field",
    43:  "Telekinesis",
    44:  "Frost Nova",
    45:  "Ice Blast",
    46:  "Blaze",
    47:  "Fire Ball",
    48:  "Nova",
    49:  "Lightning",
    50:  "Shiver Armor",
    51:  "Fire Wall",
    52:  "Enchant",
    53:  "Chain Lightning",
    54:  "Teleport",
    55:  "Glacial Spike",
    56:  "Meteor",
    57:  "Thunder Storm",
    58:  "Energy Shield",
    59:  "Blizzard",
    60:  "Chilling Armor",
    61:  "Fire Mastery",
    62:  "Hydra",
    63:  "Lightning Mastery",
    64:  "Frozen Orb",
    65:  "Cold Mastery",
    66:  "Amplify Damage",
    67:  "Teeth",
    68:  "Bone Armor",
    69:  "Skeleton Mastery",
    70:  "Raise Skeleton",
    71:  "Dim Vision",
    72:  "Weaken",
    73:  "Poison Dagger",
    74:  "Corpse Explosion",
    75:  "Clay Golem",
    76:  "Iron Maiden",
    77:  "Terror",
    78:  "Bone Wall",
    79:  "Golem Mastery",
    80:  "Raise Skeletal Mage",
    81:  "Confuse",
    82:  "Life Tap",
    83:  "Poison Explosion",
    84:  "Bone Spear",
    85:  "Blood Golem",
    86:  "Attract",
    87:  "Decrepify",
    88:  "Bone Prison",
    89:  "Summon Resist",
    90:  "Iron Golem",
    91:  "Lower Resist",
    92:  "Poison Nova",
    93:  "Bone Spirit",
    94:  "Fire Golem",
    95:  "Revive",
    96:  "Sacrifice",
    97:  "Smite",
    98:  "Might",
    99:  "Prayer",
    100: "Resist Fire",
    101: "Holy Bolt",
    102: "Holy Fire",
    103: "Thorns",
    104: "Defiance",
    105: "Resist Cold",
    106: "Zeal",
    107: "Charge",
    108: "Blessed Aim",
    109: "Cleansing",
    110: "Resist Lightning",
    111: "Vengeance",
    112: "Blessed Hammer",
    113: "Concentration",
    114: "Holy Freeze",
    115: "Vigor",
    116: "Conversion",
    117: "Holy Shield",
    118: "Holy Shock",
    119: "Sanctuary",
    120: "Meditation",
    121: "Fist Of The Heavens",
    122: "Fanaticism",
    123: "Conviction",
    124: "Redemption",
    125: "Salvation",
    126: "Bash",
    127: "Sword mastery",
    128: "Axe mastery",
    129: "Mace mastery",
    130: "Howl",
    131: "Find Potion",
    132: "Leap",
    133: "Double Swing",
    134: "Pole Arm Mastery",
    135: "Throwing Mastery",
    136: "Spear Mastery",
    137: "Taunt",
    138: "Shout",
    139: "Stun",
    140: "Double Throw",
    141: "Increased Stamina",
    142: "Find Item",
    143: "Leap Attack",
    144: "Concentrate",
    145: "Iron Skin",
    146: "Battle Cry",
    147: "Frenzy",
    148: "Increased Speed",
    149: "Battle Orders",
    150: "Grim Ward",
    151: "Whirlwind",
    152: "Berserk",
    153: "Natural Resistance",
    154: "War Cry",
    155: "Battle Command",
    156: "Fire Hit",
    157: "Unholy Bolt",
    158: "Skeleton Raise",
    159: "Maggot Egg",
    160: "Shaman Fire",
    161: "Magottup",
    162: "Magottdown",
    163: "Magottlay",
    164: "Andrial Spray",
    165: "Jump",
    166: "Swarm_move",
    167: "Nest",
    168: "Quick Strike",
    169: "Vampire Fireball",
    170: "Vampire Firewall",
    171: "Vampire Meteor",
    172: "Gargoyle Trap",
    173: "Spider Lay",
    174: "Vampire Heal",
    175: "Vampire Raise",
    176: "Submerge",
    177: "Fetish Aura",
    178: "Fetish Inferno",
    179: "Zakarum Heal",
    180: "Emerge",
    181: "Resurrect",
    182: "Bestow",
    183: "Missile Skill1",
    184: "Mon Teleport",
    185: "Prime Lightning",
    186: "Prime Bolt",
    187: "Prime Blaze",
    188: "Prime Firewall",
    189: "Prime Spike",
    190: "Prime Ice Nova",
    191: "Prime Poison Ball",
    192: "Prime Poison Nova",
    193: "Diablight",
    194: "Diabcold",
    195: "Diabfire",
    196: "Fingermagespider",
    197: "Diabwall",
    198: "Diabrun",
    199: "Diabprison",
    200: "Poison Ball Trap",
    201: "Andy Poison Bolt",
    202: "Hireable Missile",
    203: "Desert Turret",
    204: "Arcane Tower",
    205: "Monblizzard",
    206: "Mosquito",
    207: "Cursed Ball Trap Right",
    208: "Cursed Ball Trap Left",
    209: "Monfrozenarmor",
    210: "Monbonearmor",
    211: "Monbonespirit",
    212: "Moncursecast",
    213: "Hellmeteor",
    214: "Regurgitatoreat",
    215: "Monfrenzy",
    216: "Queendeath",
    217: "Scroll Of Identify",
    218: "Book Of Identify",
    219: "Scroll Of Townportal",
    220: "Book Of Townportal",
    221: "Raven",
    222: "Plague Poppy",
    223: "Wearwolf",
    224: "Shape Shifting",
    225: "Firestorm",
    226: "Oak Sage",
    227: "Summon Spirit Wolf",
    228: "Wearbear",
    229: "Molten Boulder",
    230: "Arctic Blast",
    231: "Cycle Of Life",
    232: "Feral Rage",
    233: "Maul",
    234: "Eruption",
    235: "Cyclone Armor",
    236: "Heart Of Wolverine",
    237: "Summon Fenris",
    238: "Rabies",
    239: "Fire Claws",
    240: "Twister",
    241: "Vines",
    242: "Hunger",
    243: "Shock Wave",
    244: "Volcano",
    245: "Tornado",
    246: "Spirit Of Barbs",
    247: "Summon Grizzly",
    248: "Fury",
    249: "Armageddon",
    250: "Hurricane",
    251: "Fire Trauma",
    252: "Claw Mastery",
    253: "Psychic Hammer",
    254: "Tiger Strike",
    255: "Dragon Talon",
    256: "Shock Field",
    257: "Blade Sentinel",
    258: "Quickness",
    259: "Fists Of Fire",
    260: "Dragon Claw",
    261: "Charged Bolt Sentry",
    262: "Wake Of Fire Sentry",
    263: "Weapon Block",
    264: "Cloak Of Shadows",
    265: "Cobra Strike",
    266: "Blade Fury",
    267: "Fade",
    268: "Shadow Warrior",
    269: "Claws Of Thunder",
    270: "Dragon Tail",
    271: "Lightning Sentry",
    272: "Inferno Sentry",
    273: "Mind Blast",
    274: "Blades Of Ice",
    275: "Dragon Flight",
    276: "Death Sentry",
    277: "Blade Shield",
    278: "Venom",
    279: "Shadow Master",
    280: "Royal Strike",
    281: "Wake Of Destruction Sentry",
    282: "Imp Inferno",
    283: "Imp Fireball",
    284: "Baal Taunt",
    285: "Baal Corpse Explode",
    286: "Baal Monster Spawn",
    287: "Catapult Charged Ball",
    288: "Catapult Spike Ball",
    289: "Suck Blood",
    290: "Cry Help",
    291: "Healing Vortex",
    292: "Teleport 2",
    293: "Self Resurrect",
    294: "Vine Attack",
    295: "Overseer Whip",
    296: "Barbs Aura",
    297: "Wolverine Aura",
    298: "Oak Sage Aura",
    299: "Imp Fire Missile",
    300: "Impregnate",
    301: "Siege Beast Stomp",
    302: "Minionspawner",
    303: "Catapultblizzard",
    304: "Catapultplague",
    305: "Catapultmeteor",
    306: "Boltsentry",
    307: "Corpsecycler",
    308: "Deathmaul",
    309: "Defense Curse",
    310: "Blood Mana",
    311: "Mon Inferno Sentry",
    312: "Mon Death Sentry",
    313: "Sentry Lightning",
    314: "Fenris Rage",
    315: "Baal Tentacle",
    316: "Baal Nova",
    317: "Baal Inferno",
    318: "Baal Cold Missiles",
    319: "Mega Demon Inferno",
    320: "Evil Hut Spawner",
    321: "Countess Firewall",
    322: "Impbolt",
    323: "Horror Arctic Blast",
    324: "Death Sentry Ltng",
    325: "Vinecycler",
    326: "Bearsmite",
    327: "Resurrect2",
    328: "Bloodlord Frenzy",
    329: "Baal Teleport",
    330: "Imp Teleport",
    331: "Baal Clone Teleport",
    332: "Zakarum Lightning",
    333: "Vampire Missile",
    334: "Mephisto Missile",
    335: "Doom Knight Missile",
    336: "Rogue Missile",
    337: "Hydra Missile",
    338: "Necro Mage Missile",
    339: "Monbow",
    340: "Monfirearrow",
    341: "Moncoldarrow",
    342: "Monexplodingarrow",
    343: "Monfreezingarrow",
    344: "Monpowerstrike",
    345: "Succubusbolt",
    346: "Mephfrostnova",
    347: "Monicespear",
    348: "Shaman Ice",
    349: "Diablogeddon",
    350: "Delerium Change",
    351: "Nihlathak Corpse Explosion",
    352: "Serpent Charge",
    353: "Trap Nova",
    354: "Unholy Boltex",
    355: "Shaman Fireex",
    356: "Imp Fire Missile Ex",
    }


module.exports = {
    normalize: function(property) {
        switch(property.id) {
            case 54:
                // This is a field for cold damage over time, to compute the amount
                // of damage shown in the game, divide index 2 by 25.

                if(2 in property.values) {
                    property.values[2] /= 25;
                }

                break;
            case 57:
                // This is a field for poison damage over time, to compute the amount
                // of damage shown in the game, multiply the first field by
                // the third and divide by 256 (repeat with the second field).

                //For example, if the field values are 30, 60, and 75, you get 30*75/256=8, 60*75/256=17, and 75/25=3, so the displayed property is "Adds 8-17 Poison Damage over 3 seconds".

                if(0 in property.values && 1 in property.values && 2 in property.values) {
                    property.values[0] = parseInt((property.values[0] * property.values[2])/256, 10);
                    property.values[1] = parseInt((property.values[1] * property.values[2])/256, 10);
                    property.values[2] /= 25;
                }

                break;
            case 83:
            case 84:
                // These attributes have a class id at index 0, we'll replace
                // it with the proper class name.
                if(0 in property.values) {
                    property.values[0] = classes[property.values[0]];
                }
                break;

            case 97:
                // Number of levels to a certain skill, e.g. +1 To Teleport, only
                // the skill is the skill id. We need to replace it with the skill name.

                if(0 in property.values) {
                    property.values[0] = skills[property.values[0]];
                }
                break;

            case 107:
                // Number of levels to a certain class specific skill, e.g.
                // +3 to Lightning Fury. Index 0 is the skill id, and index 1
                // is the number of + skills.

                if(0 in property.values) {
                    property.values[0] = skills[property.values[0]];
                }

                break;
            case 151:
                // This attribute is an equipped aura, e.g. +13 Conviction when
                // equipped. The skill is the skill id, we'll replace it with the
                // real name.

                if(1 in property.values) {
                    property.values[1] = skills[property.values[1]];
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

                if(0 in property.values && 1 in property.values) {
                    let treeID = property.values[0];
                    let offset = skillTreeOffsets[property.values[1]];
                    let index = treeID + offset;

                    property.values[0] = skilltrees[index];
                    property.values[1] = classes[property.values[1]];
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

                if(1 in property.values) {
                    property.values[1] = skills[property.values[1]];
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

                if(1 in property.values) {
                    property.values[1] = skills[property.values[1]];
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

                if(0 in property.values) {
                    property.values[0] = parseInt((property.values[0] * 0.125) * window.char_level, 10);
                }

                break;
            case 252:
                // The value of the data field is not actually a time period, but a frequency in terms
                // of the number of times durability is repaired over a period of 100 seconds.
                // For example, if the value is 5, then this property repairs 1 durability in 100 / 5 = 20 seconds.

                if(0 in property.values) {
                    property.values[0] = 100 / property.values[0];
                }

                break;
            default:
                return;
        }
    }
};
