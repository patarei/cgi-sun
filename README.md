## Päeva pikkuse arvutamise rakendus.

Veebirakendus, milles saab kasutaja määrata asukoha ja kuupäeva ning selle info alusel arvutatakse päeva pikkus selles asukohas. Päeva pikkuse arvutamisel leitakse päikesetõusu ja -loojangu vaheline aeg. Kasutaja saab asukohta määrata sisestades koordinaate käsitsi ja valides asukoha kaardil. 

## Tehnoloogiad

* HTML
* Javascript
* CSS
* UNPKG

### Kasutamine

Leitav leheküljelt https://patarei.github.io/cgi-sun/

Lokaalselt app.js, style.css ja index.html faile omades võib .html faili ükskõik millise uue veebilehitsejaga lahti võtta ja veebirakendus avaneb ning töötab. Interneti olemasolu on vajalik, sest teegid laetakse CDNist. 

## Lahendus

### Etapp 1

a) Kasutasin Visual Studio Code'i.

b) Väljad koordinaatidele ja kuupäevale on olemas. EPSG:4326 kasutusel.

c) Päikesetõusu ja loojangu aja arvutused on tehtud Vladimir Agafonkini poolt kirjutatud SunCalc teegiga. Kellaaeg on läbivalt UTC+0.

### Etapp 2

a) Kasutasin Leafleti, mis omakorda kasutab OpenStreetMapi tile'e. Koordinaatide järgi otsides jätab kaardile märgi koos otsitud koordinaatidega.

b) Kaardile klõpsates täidab automaatselt laius- ja pikkuskraadi väärtused.

### Etapp 3

a) Päeva pikkuse graafiku kuvamise võimalus on olemas koos kuupäevade sisestamise väljadega. Graafiku jaoks kasutasin Chart.js-i. 

b) Kuvab graafiliselt päeva pikkuse muutumist valitud ajavahemikul.

### Etapp 4

I wish :)

a) Oleks tahtnud CSSi kallal töödada ja telefoni jaoks kujundust parandada. Hetkel talutava välimusega ainult sülearvuti/personaalarvuti ekraanil.

## Dokumentatsioon

### Ajakulu

15 tundi.

Selle sees ka tunniajane HTMLi ja Javascripti tutvustava video vaatamine ning töösse mitte jõudnud asukohapõhine kellaaeg.

### Raske ja lihtne

Kõik on õpitav.

### Ajakulukas

Kulutasin rohkem aega kui tahtnuks skripti(de) paigutamisele HTMLis. Samuti kuupäevadega ja kellaaegadega töötamine ilma välise teegita võtab rohkem aega kui sooviks.

### Testimine

Lahendamise ajal korduvalt mõtlesin, et kas oodatakse automaatseid teste veebirakendusele või mitte. Lõpuks otsustas selle küsimuse vaba aja puudumine minu eest.

### Mida teisiti teeks

Arvatavasti mitte midagi. Üritaks kiiremini ja rohkem tehtud saada. 

Viimane veebirakendus, mille arendamises osalesin, kasutas Reacti frontendi ja Node/Expressi backendi. Lisaks tohutul hulgal teeke, poolikuid lahendusi andmebaasiga suhtlemiseks jne. Võrreldes sellega väga tore vaheldus ja üsna vanilla.

Üldiselt aga pole veebirakendustega kogemusi ja seda näitab ka proovitöö. Tahaks aga uskuda, et õpin kiiresti.

### Teadaolevad vead ja defektid

Selle osa dubleerin issue'de alla.

* Päikesetõusu aeg on mõnes paigas negatiivne. Näiteks 66 kraadi laiust ja 66 kraadi pikkust
* CSS on poolik ning rakendus kasutatav ainult osades seadmates
* Kuupäevade vahemikku saab sisestada nii, et hilisem kuupäev on varasema kuupäeva kohal. Graafikul ei kujutata siis midagi.
* Graafikut pole võimalik peita/puhastada
* Päikesetõusu ja loojangu arvutamiseks kasutatav SunCalc ei lae (esmakordsel) kasutamisel piisavalt kiirelt ära ja kuvab NaN väärtusi
* Sama koha peale saab piiramatus koguses märke lisada
* Sisendväljade puhastamise järel on koordinaatideks 0 laiust ja 0 pikkust, mis on keset ookeanis. Kui kasutaja puhastab Clear nupuga väljad ja klõpsab seejärel Find, siis võib korraks tekkida tunne, et rakendus läks väga katki.

### Mida nupud teevad

*Mark* - võtab pikkus- ja laiuskraadi sisendväljadelt ja lisab märgi kaardile.

*Calculate* - võtb pikkus- ja laiuskraadi sisendväljadelt ja arvutab päikesetõusu ja -loojangu aja ning päeva pikkuse.

*Find* - võtab pikkus- ja laiuskraadi sisendväljadelt ja seab selle kaardi keskpunktiks, lisaks veel arvutab nagu Calculate ja lisab märgi nagu Mark.

*Clear* - puhastab kõik sisend- ja väljundväljad peale kuupäevavahemiku.

*Show graph* - kuvab graafiku kõige all.

