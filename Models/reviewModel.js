export default class Review {
    constructor(tripId, userId, nick, name, rating, reviewText, purchaseDate) {
      this.tripId = tripId;
      this.userId = userId;
      this.nick = nick;
      this.name = name;
      this.rating = rating;
      this.reviewText = reviewText;
      this.purchaseDate = purchaseDate;
    }
  }
  