import Skills from './skill-map'

module.exports = {
    calculate: function (bonuses, list) {
        for (var i = 0; i < list.length; i++) {
            switch (list[i].id) {
                // Damage reduction.
                case 36:
                    if (0 in list[i].values) {
                        bonuses.dr += list[i].values[0];
                    }
                    break;

                // Magic find.
                case 80:
                    if (0 in list[i].values) {
                        bonuses.mf += list[i].values[0];
                    }
                    break;
                // Magic find per level.
                case 240:
                    if (0 in list[i].values) {
                        bonuses.mf += parseInt((list[i].values[0] * 0.125) * window.char_level, 10)
                    }
                    break;
                // Faster attack speed.
                case 93:
                    if (0 in list[i].values) {
                        bonuses.ias += list[i].values[0];
                    }
                    break;

                // Faster hit recovery.
                case 99:
                    if (0 in list[i].values) {
                        bonuses.fhr += list[i].values[0];
                    }
                    break;

                // Faster run/walk.
                case 96:
                    if (0 in list[i].values) {
                        bonuses.frw += list[i].values[0];
                    }
                    break;

                // Faster cast rate.
                case 105:
                    if (0 in list[i].values) {
                        bonuses.fcr += list[i].values[0];
                    }
                    break;

                // Deadly strike.
                case 141:
                    if (0 in list[i].values) {
                        bonuses.ds += list[i].values[0];
                    }
                    break;

                // Crushing blow.
                case 136:
                    if (0 in list[i].values) {
                        bonuses.cb += list[i].values[0];
                    }
                    break;

                // Equipped aura
                case 151:
                    if (0 in list[i].values && 1 in list[i].values) {
                        bonuses.auras.push({
                            name: Skills.list[list[i].values[0]],
                            level: list[i].values[1]
                        });
                    }
                    break;
                default:
                    break;
            }
        }

        return bonuses;
    }
};
