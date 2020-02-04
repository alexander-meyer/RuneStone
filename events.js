const events = {
    swim: {
        flavorText: "you leap gracefully off a protruding rock, landing with minimal splash. <br/> a solid 9/10.<br/> <br/> Something catches your eye on the riverbed... <br",
        item: "Amethyst Ring",
        triggers: ['swim', 'swimming', 'dive', 'jump'],
        itemNeeded: 'none',
        logic(player, flavorText, itemReward) {
            if (player.hasItem(itemReward)) {
                appendTextAndScroll('you leap gracefully off a protruding rock, landing with minimal splash. <br/> a solid 9/10.<br/><br/>')
            }
            else {
                player.addItem(new Item(itemReward));
                appendTextAndScroll(flavorText + '<br/><br/>' + `<pre>${art.ring}<pre/>` + '* Amethyst Ring added to inventory *<br/>');
            }
        }
    },
    illuminate: {
        flavorText: '',
        item: '',
        triggers: [],
        itemNeeded: 'Lantern',
        logic(player) {

        }
    }

}