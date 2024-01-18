class User {
    constructor(
      Uid,
      Imie,
      Nazwisko,
      Email,
      isAdmin,
      isManager,
      Ban
    ) {
      this.Uid = Uid;
      this.Imie = Imie;
      this.Nazwisko = Nazwisko;
      this.Email = Email;
      this.isAdmin = isAdmin;
      this.isManager = isManager;
      this.Ban = Ban;
    }
  }
  
  export default User;
  