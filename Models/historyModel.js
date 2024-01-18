export default class HistoryItem {
    constructor(TripId, UserId, Amount, Total, Name, Country, Description, dateSold, startDate, endDate) {
      this.TripId = TripId;
      this.UserId = UserId;
      this.Amount = Amount;
      this.Total = Total;
      this.Name = Name;
      this.Country = Country;
      this.Description = Description;
      this.dateSold = dateSold;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  