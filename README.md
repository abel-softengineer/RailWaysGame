🚂 A Királyság Vasúthálózata (Railways Game)

Próbáld ki itt: abel-softengineer.github.io/RailWaysGame/

Ez egy JavaScript nyelven íródott, 2 dimenziós logikai játék, amelyben Nevenincs király birodalmának vasúthálózatát kell megtervezned. A projekt az ELTE Webprogramozás kurzus keretében készült, teljesítve az összes funkcionális és minőségi követelményt.
🎮 A játék lényege

A cél egy összefüggő, önmagába visszatérő körvasútvonal kiépítése. A vonal sehol nem ágazhat el, nem keresztezheti önmagát, és minden lehetséges mezőt érintenie kell.
🗺️ Speciális mezőtípusok

    Híd: A vasút csak egyenesen haladhat át rajta.

    Hegy: A sziklák miatt a vasútvonalnak 90°-ban el kell kanyarodnia.

    Oázis: Erre a területre nem építhető vasútvonal.

    Üres mező: Bármilyen irányú vasútelem lehelyezhető.
🕹️ Irányítás és interakció

A játékot úgy terveztük, hogy minden platformon intuitív legyen:

    Sín lehelyezése: Egyszerű kattintással (vagy érintéssel). A cellákra kattintva a program ciklikusan váltogat a különböző kanyarodási és egyenes irányok között.

    Intelligens elhelyezés: A rendszer figyelembe veszi a mező típusát (Híd, Hegy), így csak az oda illő sínformákat engedi váltogatni.

    Ellenőrzés: Amint a játékos úgy érzi, hogy végzett, a rendszer automatikusan (vagy gombnyomásra) validálja a pályát a megadott szabályok szerint.

🚀 Főbb funkciók

    Választható nehézség: 5x5-ös (könnyű) és 7x7-es (nehéz) pályák véletlenszerű sorsolással.

    Valós idejű visszajelzés: Időmérés és a szabályok automatikus ellenőrzése a játék végén.

    LocalStorage támogatás: A toplisták és a játék állapota böngészőfrissítés után is megmaradnak.

    Mobilbarát kialakítás: A felület teljesen reszponzív, érintőképernyőn is kényelmesen játszható.

🛠️ Technikai megvalósítás

    Nyelv: Modern Vanilla JavaScript (ES6+).

    Design: CSS-sel megvalósított sötét mód, rugalmas elrendezéssel.

    Architektúra: Egyetlen HTML fájlon belüli nézetváltás (Menü/Játék/Leírás) JavaScript vezérléssel.

    Kódminőség: A projekt kerüli a bad practice megoldásokat (nincs var, nincsenek inline eseménykezelők).
