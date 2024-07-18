# Socially

Ez a projekt egy közösségi média webalkalmazás, amely lehetővé teszi a felhasználók számára, hogy megosszák videóikat a világgal. A webalkalmazás Firebase-t használ az autentikációhoz, adatbázishoz és tároláshoz.

## Fejlesztő

**Netby**

## Funkciók

- Felhasználói autentikáció
- Videók feltöltése
- Videók megjelenítése
- Videók keresése leírás alapján

## Használat

### Videók keresése

- A főoldalon található keresősáv segítségével kereshetsz videókat a leírásuk alapján. A találatok azonnal megjelennek a keresősáv alatt.

### Videók feltöltése

- Lépj a "Feltöltés" oldalra a navigációs menüben, és kövesd az utasításokat a videó feltöltéséhez.

### Profil megtekintése

- A "Profil" oldalon megtekintheted a saját profilodat, követőidet és a feltöltött videóid számát.

## Fájlstruktúra

```plaintext
socially/
│
├── index.html            # Fő HTML fájl
├── style.css             # Általános stíluslap
├── video.css             # Videók stíluslapja
├── searchbar.js          # Keresősáv JavaScript fájl
├── scripts.js            # Egyéb JavaScript funkciók
├── sync-account.js       # Fiókszinkronizációs funkciók
└── README.md             # Jelen dokumentáció