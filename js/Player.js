class Player {
    constructor() {
        this.name = null;
        this.rank = null;
        this.index = null;
        this.distance = 0;
        this.side = 100;
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", function (data) {
            playerCount = data.val();
        });
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    getCarsAtFinish() {
        database.ref('CarsAtEnd').on("value", (data) => {
            this.rank = data.val();
            carsAtFinishLine = data.val();
        });
    }

    static updateCarsAtFinish(rank) {
        database.ref('/').update({
            CarsAtEnd: rank
        })
    }

    updatePlayerRecord() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            side: this.side,
            rank: this.rank
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        });
    }
}