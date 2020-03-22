const events = {
    swim: {
        flavorText: "You leap gracefully off a protruding rock, landing with minimal splash. An applause-worthy dive.<br/> <br/>",
        item: "Amethyst Ring",
        triggers: ['swim', 'swimming', 'dive', 'jump'],
        conditionsMet(playerInput, triggers) {
            return isValidCommand(playerInput, triggers);
        },
        itemNeeded: 'none',
        logic(player, flavorText, itemReward) {
            appendTextAndScroll(flavorText);
            if (!player.hasItem(itemReward)) {
                player.addItem(new Item(itemReward));
                appendTextAndScroll(`Something catches your eye on the riverbed...<br/><br/> <pre>${art.ring}<pre/> * Amethyst Ring added to inventory *<br/>`);
            }
        }
    },
    Pluck: {
        flavorText: 'You reach up and pluck a particularly fine specimen, dark red and smelling of sweetness. <br/>',
        item: 'Pear',
        triggers: ['pear', 'take', 'pick', 'pluck', 'grab'],
        conditionsMet(playerInput, triggers) {
            const filteredArray = playerInput.filter(word => triggers.includes(word))
            return (filteredArray.length > 1 && filteredArray.includes('pear'));
        },
        itemNeeded: '',
        logic(player, flavorText, itemReward) {
            if (player.hasItem(itemReward)) {
                appendTextAndScroll('Best not to be greedy. <br/><br/>')
            }
            else {
                player.addItem(new Item(itemReward));
                appendTextAndScroll(flavorText + `<pre>${art.pear}<pre/>` + '* Pear added to inventory *<br/>');
            }
        }
    }

}