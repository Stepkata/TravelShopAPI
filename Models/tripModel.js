export default class Wycieczka {
  constructor(
    Id,
    Nazwa,
    Kraj,
    DataRozpoczecia,
    DataZakonczenia,
    CenaJednostkowa,
    MaxIloscMiejsc,
    IloscMiejsc,
    Opis,
    DlugiOpis,
    Ocena
  ) {
    this.Id = Id;
    this.Nazwa = Nazwa;
    this.Kraj = Kraj;
    this.DataRozpoczecia = DataRozpoczecia;
    this.DataZakonczenia = DataZakonczenia;
    this.CenaJednostkowa = CenaJednostkowa;
    this.MaxIloscMiejsc = MaxIloscMiejsc;
    this.IloscMiejsc = IloscMiejsc;
    this.Opis = Opis;
    this.DlugiOpis = DlugiOpis;
    this.Ocena = Ocena;
  }
}
