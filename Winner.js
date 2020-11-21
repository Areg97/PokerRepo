function Winner(players)
{
    var self = this;
    var playerScores = [];

    this.getWinners = function()
    {   
        for (const player of players)
        {
            var playerHand = calculatePairRank(player.cards)            
            playerScores.push({player: player, playerHand: playerHand});
        }

        var maxScore = 0;
        var maxPlayersScores = [];
        for (const playerScore of playerScores)
        {
            if(playerScore.playerHand && playerScore.playerHand.combinationScore === maxScore)
            {
                maxScore = playerScore.playerHand.combinationScore;
                maxPlayersScores.push(playerScore);
            }
            else if (playerScore.playerHand && playerScore.playerHand.combinationScore > maxScore)
            {
                maxScore = playerScore.playerHand.combinationScore;
                maxPlayersScores = [playerScore];
            }
        }
        if (maxPlayersScores.length === 1)
        {
            return maxPlayersScores;
        }
        
        var maxPlayerRanks = [];        
        if (maxPlayersScores.length > 1)
        {
            var maxRank = 0;            
            for (const playerScore of maxPlayersScores)
            {
                if (playerScore.playerHand.rank === maxRank)
                {
                    maxRank = playerScore.playerHand.rank;
                    maxPlayerRanks.push(playerScore);
                }
                else if (playerScore.playerHand.rank > maxRank)
                {
                    maxRank = playerScore.playerHand.rank;
                    maxPlayerRanks = [playerScore];
                }
            }

            if (maxPlayerRanks.length === 1)
            {
                return maxPlayerRanks;
            }
        }

        var maxPlayerKickers = [];
        if (maxPlayerRanks.length > 1)
        {
            var drawPlayerScores = maxPlayerRanks;
            for (var i = 0; i < 3; i++)
            {
                var maxKicker = 0;
                maxPlayerKickers = [];
                for (const playerScore of drawPlayerScores)
                {
                    playerScore.playerHand.kickers.sort(compareCards);

                    if (playerScore.playerHand.kickers[i] === maxKicker)
                    {
                        maxKicker = playerScore.playerHand.kickers[i];
                        maxPlayerKickers.push(playerScore);
                    }
                    else if (playerScore.playerHand.kickers[i] > maxKicker)
                    {
                        maxKicker = playerScore.playerHand.kickers[i];
                        maxPlayerKickers = [playerScore];
                    }
                }

                if (maxPlayerKickers.length === 1)
                {
                    break;
                }

                drawPlayerScores = maxPlayerKickers;
            }

            if (maxPlayerKickers.length ===1)
            {
                return maxPlayerKickers;
            }
        }

        var maxPlayerHighCards = [];
        if (maxPlayerRanks.length === 0 && maxPlayersScores.length === 0)
        {
            var drawPlayerScores = playerScores;
            for (var i = 0; i < 5; i++)
            {
                var highCard = 0;
                maxPlayerHighCards = [];
                for (const playerScore of drawPlayerScores)
                {
                    playerScore.player.cards.sort(compareCards);

                    if (playerScore.player.cards[i].rank === highCard)
                    {
                        highCard = playerScore.player.cards[i].rank;
                        maxPlayerHighCards.push(playerScore);
                    }
                    else if (playerScore.player.cards[i].rank > highCard)
                    {
                        highCard = playerScore.player.cards[i].rank;
                        maxPlayerHighCards = [playerScore];
                    }
                }

                if (maxPlayerHighCards.length === 1)
                {
                    return maxPlayerHighCards;
                }

                drawPlayerScores = maxPlayerHighCards;
            }
        }
    };

    var compareCards = function(card1, card2)
    {
        if (card1.rank > card2.rank)
        {
            return -1;    
        }
        if (card1.rank < card2.rank)
        {
            return 1;
        }
        return 0;
    }

    var calculatePairRank = function(cards)
    {
        var numberOfOccurrences = 0;
        var cardRankStack = cards.reduce((acc, currentValue) => (acc.push(currentValue.rank), acc), []);
        var rank;
        while(cardRankStack.length !== 1)
        {
            var cardRank = cardRankStack.pop();
            if (cardRankStack.some(rank => rank === cardRank))
            {
                numberOfOccurrences++;
                rank = cardRank;
            }
        }

        if(numberOfOccurrences === 1)
        {
            var kickers = cards.filter(c => c.rank !== rank);
            return {combinationScore: 2, rank: rank, kickers: kickers};
        }

        return false;
    };
}