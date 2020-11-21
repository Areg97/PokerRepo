function Deck()
{
    this.cards = [];

    var self = this;
    var suits = [
        'd', // Diamonds
        'h', // Hearts
        's', // Spades
        'c']; // Clubs

    this.shuffle = function()
    {        
        constructDeck();        
        
        // Shuffle
        var currentIndex = self.cards.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = self.cards[currentIndex];
            self.cards[currentIndex] = self.cards[randomIndex];
            self.cards[randomIndex] = temporaryValue;
        }
    };

    this.deal = function(players)
    {
        for (var player of players)
        {
            // Draw 5 cards
            var cardsToDeal = drawCards(5);
            player.giveCards(cardsToDeal);
        }
    };

    var drawCards = function(numberOfCards)
    {
        var returnedCards = [];
        for (var i = 0; i < numberOfCards; i++)
        {
            returnedCards.push(self.cards.pop());
        }

        return returnedCards;
    };

    var constructDeck = function()
    {
        for (var i = 2; i <= 14; i++)
        {
            for (var suit of suits)
            {
                var card = new Card(i, suit);
                self.cards.push(card);                        
            }            
        }        
    };
}