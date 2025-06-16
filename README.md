Projektrol

Ez egy javascriptben íródott 2 dimenziós felülnézetes játék, amit lehet telefonról is használni.

Jatekrol

A játék különböző méretű négyzetrácsos hálón játszódhat, ahol a célunk az, hogy egy összefüggő körvasútvonalat alkossunk úgy, hogy minden olyan helyre eljusson a vonat, ahova lehetséges.

A térképen több különböző típusú mező található, melyek a játék kezdetén látszódnak a térképen:

    Üres mező : Ebben a cellában a vasútvonal a belépési irányon kívül maradék három irányba tud haladni.
    Híd mező : Ezen a mezőn a vasútvonalat csak a híd által megadott egyenes írányban lehet megépíteni.
    Hegy mező : Ezeken a mezőkön a sziklák a cellának két szomszédos kijáratát lezárják, így csak 90°-ban elfordulva lehet továbbhaladni.
    Oázis mező : Erre a cellára nem lehet vasutat építeni.

A játéknak akkor van vége, amikor a játékos a megadott szabályokat betartva elkészíti a feladvány helyes megoldását. A játék során a feladvány teljesítésének ellenőrzése során a következő elemekre kell odafigyelni:

    Minden cellából két irányba lehet menni, és azokba a cellákba amelybe továbbhalad, a megfelelő irányból be lehet érkezni.
    Minden olyan mezőt, amit érinteni kell, érintünk
    Minden olyan mezőt, amire nem lehet építeni, üresen maradt.
