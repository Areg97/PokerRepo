function Player(nickname)
{
    this.nickname = nickname;
    this.cards = [];    

    var self = this;

    this.giveCards = function(cards)
    {
        self.cards = cards;

        var i = 1;
        for (var playerCard of cards)
        {             
            var fileName = playerCard.getImageFileName();
            var url = "url('Cards_images/" + fileName+"')";

            var selector='#'+self.nickname + '> #card' + i;
            document.querySelector(selector).style.backgroundImage = url; 
            i++;
        }
    };
}