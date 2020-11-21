function Card(rank, suit){
    this.suit=suit;
    this.rank=rank;

    this.getImageFileName = function()
    {
        var imageFileName = this.rank + this.suit + '.png';
        return imageFileName;
    };
};