var deck;
var players=[];

function onLoad()
{    
    createPlayers(3);
}

function createPlayers(numberOfPlayers)
{
    for (let i = 0; i < numberOfPlayers; i++)
    {
        var player = new Player("player"+i);
        players.push(player);  
        var selector = '#nickname'+ (i+1) +'> h3';
        document.querySelector(selector).innerHTML = "player"+i;
    }
}

function shuffle()
{    
    deck = new Deck();
    deck.shuffle();
}

function deal()
{
    deck.deal(players);
}

function getWinner()
{
    winner = new Winner(players);
    var winnerPlayers = winner.getWinners();
    var divElement = document.getElementById("winners");
    
    var text = '';
    for (const player of winnerPlayers) {
        text += player.player.nickname + ', ';
    }

    divElement.innerHTML = text;
}