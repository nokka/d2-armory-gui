// Display calculator will calculate the weapon damage showed on a weapon,
// and also the defense showed on armors.
module.exports = {
    calculate: function(attributes) {

        var values = {
            enhancedDefense: 0,
            minEnhancedDamage: 0,
            maxEnhancedDamage: 0,
            flatOneHandMin: 0,
            flatOneHandMax: 0,
            flatTwoHandMin: 0,
            flatTwoHandMax: 0,
            flatDefense: 0
        };

        // If the list is empty, we'll just return it.
        if(attributes.length === 0) {
            return values;
        }

        attributes.map(function(attr) {
            switch(attr.id) {
                // Enhanced defense.
                case 16:
                    values.enhancedDefense = attr.values[0];
                    break;

                // Enhanced damage.
                case 17:
                    values.minEnhancedDamage = attr.values[0];
                    values.maxEnhancedDamage = attr.values[1];
                    break;

                // One handed minimum damage.
                case 21:
                    values.flatOneHandMin = attr.values[0];
                    break;

                // One handed maximum damage.
                case 22:
                    values.flatOneHandMax = attr.values[0];
                    break;

                // Two handed minimum damage.
                case 23:
                    values.flatTwoHandMin = attr.values[0];
                    break;

                // Two handed maximum damage.
                case 24:
                    values.flatTwoHandMax = attr.values[0];
                    break;

                // Flat defense.
                case 31:
                    values.flatDefense += attr.values[0];
                    break;

                // Flat defense per level. We'll add it to the defense bonus.
                case 214:
                    values.flatDefense += parseInt((attr.values[0] * 0.125) * window.char_level, 10);
                    break;

                // Default, just continue.
                default:
                    break;
            }
            return true;
        });

        return values;
    }
}
