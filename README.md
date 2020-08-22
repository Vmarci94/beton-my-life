# Projekt: Bet on my life
Minden back-end-hez tartozik egy front-end és dolgozzanak össze.
A projekt akkor van kész ha a
* 2 rész szépen fut együtt és használhatóan működik (esetleg teljesül a speci)
* Minden projekten legalább 2 unit és 2 e2e test. (Tök egyszerű is teljesen ok)
* +feladat: dockerbe pakolni amit csináltunk (opcionális)
A projekt zárás demo hogy ki mire jutott + közös code review. Pénteken jó lenne ha lesz rá idő.
## front-endeseknek
* primeng
* cypress
* jest
* ngrx (opcionális)
* nx workspace javasolt (https://nx.dev/angular)
## back-endeseknek
* adat tárolás firebase realtime db rest apin keresztül, entitásonként külön projektben (tehát user/auth, challange és bet db)
** https://firebase.google.com/docs/reference/rest/database
*** dióhéjban annyi, hogy https://[PROJECT_ID].firebaseio.com/[root adat node]/[child data node]/.../[key].json
* swagger dokumentációt adni kell a végpontokhoz
## egyéni fókuszok
* Szilárd és Zsolt csak back-end (lehetőleg közösen/pair programming) + Bálint support
* Olivér csak front-end
* Marci, Dávid - kezdés azzal amiben dolgozni fognak (fullstack ha akarják és marad idő, kedv)
* Bálint - fullstack
* Gergő - olyan cuccok összelövése ami kelleni fog, de még én sem értek hozzájuk (storybook+cypress, nx, supertest) + fullstack ha marad rá idő
## csapatok
* Szilárd + Zsolt bed - Dávid front-end
* Olivér fed + Marci bed
* Bálint - fullstack + support
* Gergő - kutatás + fullstack + support
## projekt leírás
Az ötlet annyit, hogy emberek life challangeket vihetnek fel és mások erre fogadhatnak, hogy sikerül vagy nem. A fogadás egyszerű, pot alapon történik, azaz mindenki bedobja a tétet és akiknek igazuk lesz arányosan szétosztják az összeget.
A poént ebben az, hogy simán elképzelhető hogy a számonkérhetőség és a szociális láthatóság plusz még az esetleges pénz nyeremény (mert hát nyilván fogadok magamra) tök pozitív lehet adott embernek és elősegítheti a cél elérésében
A mindenki másnak meg egy tök poén dolog mások életére licitálni kicsit ilyen hunger games
## speci
* user story: https://docs.google.com/document/d/1EbOAMZjli7_XOO-_la1sdfmjK8Z7zDaVPo-xUccp8Q4/edit
* ui design: https://www.figma.com/file/viEhKGN6x0Y47CCfMsqWNT/Application-UI-Wireframes?node-id=0%3A1
* api spec és mock: https://stack-attack-bed.herokuapp.com/api/ (https://github.com/stack-attack-competition/api-spec-and-mock)
** az api speci simán lehet hogy vérzik, azt gondolkodva használjátok, illetve tesztelve sincs a működés részletesen
* hackathon github repo: https://github.com/stack-attack-competition (itt vannak megoldások ugyanerre a feladatra különböző csaptaoktól és technológiákkal) (edited) 
