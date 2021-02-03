<<<<<<< HEAD
const rulesContentEn = `
                                  GAME RULES "CARCASSONNE":

                                    1. PLAYING THE GAME

    Players take turns with the starting player. On a player's turn, he executes the following actions: 
1 The player must draw and place a new tile
2 The player may deploy one of his followers from his supply on the tile he just placed
3 If, through the placement of the tile, roads, cities or cloisters are completed, they are now scored.

                                        2. PLACING TILES

A player places tile on the table, using the following rules:
- The new tile must be placed with at least one edge abutting one previously placed tile.
- The new tile must be placed so that all road, city and field segments on the new tile match road,
city or field segments on all abutting tiles.

                                    3. DEPLOYING FOLLOWERS

    After the player places a tile, he may deploy one of his followers, using the following rules:
- The player may only play one follower on a turn
- The player must take it from his supply
- The player may only deploy it on the tile he just placed
- The player must choose where to deploy the follower on the tile:

    The player may not deploy a follower on a road, city or field segment if that segment connects 
to a segment on another tile that already has a follower (from any player) on it.

      4. SCORING COMPLETED ROADS, CITIES AND CLOISTERS

    Completed road

- A road is complete when the road segments at both ends connect to a crossing, a city of a cloister.
- A road is also complete if it connects to itself in a loop.

  The player who has a follower on a completed road scores 1 point for each tile in the road.

    Completed city

- A city is complete when it's completely surrounded by a city wall and there are no gaps in the wall.
- The player who has a follower in the completed city scores 2 points for each segment in the city.
- Each shield on a city segment earns the player 2 bonus points.

*!* What happens when a completed road or city has more than one follower?

It is possible through clever placement of tiles for there to be more than one thief on a road or 
more than one knight in a city. When this occurs in a completed road or city, the player with the most 
thieves (on a road) or the most knights (in a city) scores all the points.
When two or more players tie with the most thieves or knights, they each score the total points 
for the road or city. ***

    Completed cloister

- A cloister is complete when the tile it is on is completely surrounded by tiles.
- A player with follower in the cloister scores nine points.

    Game End

- At the end of the player's turn in which the last tile is placed, the game ends. 
- The final scoring then takes place.

                                5. FINAL SCORING

    All incomplete roads, cities and cloisters are scored.
    For each incomplete road and city: 
- The player scores 1 point for each road or city segment in the incomplete road or city if 
he has a follower on it's tiles. Shields earn the city player 1 point each. 
- For incomplete roads and cities with more than one follower, use the rules for completed roads 
and cities to determine who gets the points. 
- For each incomplete cloister, a player with a follower in it scores 1 point 
for the cloister tile and 1 point for each tile that surrounds it.`

const rulesContentRu = `
                                ПРАВИЛА ИГРЫ "КАРКАССОН":

                                        1. ХОД ИГРЫ:
    Игроки ходят по очереди по схеме:
1) Игрок открывает карточку и присоединяет её к уже выложенным на стол.
2) Игрок может поместить свою фишку на только что сыгранную карточку.
3) Если только что сыгранная карточка привела к завершению дороги, города или монастыря - происходит подсчет очков.

                        2. КАК СЫГРАТЬ КАРТОЧКУ:

- Новый квадрат должен соприкасаться с уже выложенным ранее хотя бы одной стороной.
- В месте соприкocновения сторон все дороги должны переходить в дороги, поля - в поля, 
а стены городов - в стены городов (карта должна оставаться цельной)

                        3. КАК ВЫСТАВИТЬ ФИШКУ:

    После того, как карточка сыграна, игрок может выставить фишку согласно следующим правилам:
- на каждом ходу игрок может выложить только одну фишку
- фишка должна быть взята из запаса
- игрок может поставить фишку исключительно на только что сыгранную карточку
- игрок должен выбрать, на какую часть карточки он ставит фишку

    Игрок не может поместить фишку на дорогу или в город, если где-нибудь на них уже находится фишка другого игрока.

    4. ПОДСЧЕТ ОЧКОВ ПРИ ЗАВЕРШЕНИИ ПОСТРОЕК И ДОРОГ:

    Завершение дорог:
- Дорога считается завершенной, если оба её конца прилегают к перекрестку, замку или монастырю.
- Если дорога закольцевалась, то она также считается завершенной.
- Игрок, чья фишка стоит на завершенной дороге получает За каждый участок дороги по 1 очку.

    Завершение замка:
- Замок считается завершенным если он полностью окружен городскими стенами, без пробелов.
- Игрок, чья фишка стоит на территории завершенного замка, получает 2 очка за каждую карточку.
- Каждый щит в этом городе приносит игроку ещё 2 бонусных очка.

    Завершение монастыря:
- Монастырь считается завершенным если он полностью окружен карточками.
- Игрок, чья фишка стоит на завершенном монастыре получает 9 очков.

    Конец игры:
- Игра завершается, когда на поле выложен последний квадрат.
- После этого начинается финальный посчет очков.

            5. ОКОНЧАТЕЛЬНЫЙ ПОСДСЧЕТ ОЧКОВ:

- Считаются все незавершенные постройки (дороги, замки, монастыри).
- Игроки, чьи фишки стоят на незавершенных дорогах или в незавершенных замках получают по 1 очку за каждую карточку.
- Щиты в недостроенных городах также приносят игроку по 1 очку.
- Игроки, чьи фишки стоят на недостроенных монастырях получают по 1 очку за карточку с монастырем и по 1 очку за каждую карточку вокруг него.`


const rulesContentDe = `
                                                SPIELREGELN

                                        1. DAS SPIEL SPIELEN

    Die Spieler wechseln sich mit dem Startspieler ab. Wenn ein Spieler an der Reihe ist, führt er aus
die folgenden Aktionen:
1) Der Spieler muss ein neues Plättchen ziehen und platzieren
2) Der Spieler kann einen seiner Anhänger aus seinem Vorrat auf dem soeben platzierten Plättchen einsetzen
3) Wenn durch das Platzieren des Plättchens Straßen, Städte oder Kreuzgänge fertiggestellt sind, werden sie jetzt gewertet.

                                    2. Fliesen platzieren

    Ein Spieler legt ein Plättchen nach den folgenden Regeln auf den Tisch:
- Die neue Fliese muss so platziert werden, dass mindestens eine Kante an einer zuvor platzierten Fliese anliegt.
- Das neue Plättchen muss so platziert werden, dass alle Straßen-, Stadt- und Feldsegmente auf dem neuen Plättchen mit der Straße übereinstimmen.
Stadt- oder Feldsegmente auf allen angrenzenden Kacheln.

                                    3. Follower bereitstellen

    Nachdem der Spieler ein Plättchen gelegt hat, kann er einen seiner Anhänger nach den folgenden Regeln einsetzen:
- Der Spieler darf in einem Zug nur einen Follower spielen
- Der Spieler muss es aus seinem Vorrat nehmen
- Der Spieler darf es nur auf dem Plättchen einsetzen, das er gerade gelegt hat
- Der Spieler muss auswählen, wo der Follower auf dem Plättchen eingesetzt werden soll:

Der Spieler darf keinen Anhänger auf einem Straßen-, Stadt- oder Feldsegment einsetzen, wenn dieses Segment eine Verbindung herstellt
zu einem Segment auf einem anderen Plättchen, auf dem sich bereits ein Follower (von einem beliebigen Spieler) befindet.

    4. Bewertung abgeschlossener Straßen, Städte und Kreuzgänge

    Straße fertiggestellt
- Eine Straße ist fertig, wenn die Straßensegmente an beiden Enden mit einer Kreuzung verbunden sind, einer Stadt im Kreuzgang.
- Eine Straße ist auch dann vollständig, wenn sie in einer Schleife mit sich selbst verbunden ist.

    Der Spieler, der einen Anhänger auf einer fertiggestellten Straße hat, erhält 1 Punkt für jedes Plättchen auf der Straße.
- Stadt fertiggestellt

Eine Stadt ist vollständig, wenn sie vollständig von einer Stadtmauer umgeben ist und keine Lücken in der Mauer bestehen.

Der Spieler, der einen Anhänger in der abgeschlossenen Stadt hat, erhält 2 Punkte für jedes Segment in der Stadt.
Jeder Schild in einem Stadtsegment bringt dem Spieler 2 Bonuspunkte ein.

*! * Was passiert, wenn eine fertiggestellte Straße oder Stadt mehr als einen Anhänger hat?

Durch geschickte Platzierung von Kacheln kann es sein, dass sich mehr als ein Dieb auf 
einer Straße befindet oder mehr als ein Ritter in einer Stadt. Wenn dies in einer fertiggestellten
Straße oder Stadt geschieht, der Spieler mit den meisten Diebe (auf einer Straße) oder die meisten Ritter
(in einer Stadt) erhalten alle Punkte. Wenn zwei oder mehr Spieler mit den meisten Dieben oder Rittern zusammenarbeiten,
erhalten sie jeweils die Gesamtpunktzahl für die Straße oder Stadt. ***.

    Kreuzgang abgeschlossen
- Ein Kreuzgang ist fertig, wenn die Kachel, auf der er liegt, vollständig von Kacheln umgeben ist.
- Ein Spieler mit Anhänger im Kreuzgang erhält neun Punkte.

    Am Ende des Zuges des Spielers, in dem das letzte Plättchen platziert ist, endet das Spiel. Die endgültige Wertung dann
stattfinden.

                                    5. ENDGÜLTIGE BEWERTUNG
    Alle unvollständigen Straßen, Städte und Kreuzgänge werden gewertet.
    Für jede unvollständige Straße und Stadt:
- Der Spieler erhält 1 Punkt für jedes Straßen- oder Stadtsegment in der unvollständigen Straße oder Stadt, wenn
Er hat einen Anhänger auf den Kacheln. Schilde bringen dem Stadtspieler jeweils 1 Punkt ein.
- Verwenden Sie für unvollständige Straßen und Städte mit mehr als einem Anhänger die Regeln für fertiggestellte Straßen
und Städte, um zu bestimmen, wer die Punkte bekommt.
- Für jeden unvollständigen Kreuzgang erhält ein Spieler mit einem Anhänger 1 Punkt
für das Kreuzgangplättchen und 1 Punkt für jedes Plättchen, das es umgibt.`

=======
const rulesContentEn = `
                                  GAME RULES "CARCASSONNE":

                                    1. PLAYING THE GAME

    Players take turns with the starting player. On a player's turn, he executes the following actions: 
1 The player must draw and place a new tile
2 The player may deploy one of his followers from his supply on the tile he just placed
3 If, through the placement of the tile, roads, cities or cloisters are completed, they are now scored.

                                        2. PLACING TILES

A player places tile on the table, using the following rules:
- The new tile must be placed with at least one edge abutting one previously placed tile.
- The new tile must be placed so that all road, city and field segments on the new tile match road,
city or field segments on all abutting tiles.

                                    3. DEPLOYING FOLLOWERS

    After the player places a tile, he may deploy one of his followers, using the following rules:
- The player may only play one follower on a turn
- The player must take it from his supply
- The player may only deploy it on the tile he just placed
- The player must choose where to deploy the follower on the tile:

    The player may not deploy a follower on a road, city or field segment if that segment connects 
to a segment on another tile that already has a follower (from any player) on it.

      4. SCORING COMPLETED ROADS, CITIES AND CLOISTERS

    Completed road

- A road is complete when the road segments at both ends connect to a crossing, a city of a cloister.
- A road is also complete if it connects to itself in a loop.

  The player who has a follower on a completed road scores 1 point for each tile in the road.

    Completed city

- A city is complete when it's completely surrounded by a city wall and there are no gaps in the wall.
- The player who has a follower in the completed city scores 2 points for each segment in the city.
- Each shield on a city segment earns the player 2 bonus points.

*!* What happens when a completed road or city has more than one follower?

It is possible through clever placement of tiles for there to be more than one thief on a road or 
more than one knight in a city. When this occurs in a completed road or city, the player with the most 
thieves (on a road) or the most knights (in a city) scores all the points.
When two or more players tie with the most thieves or knights, they each score the total points 
for the road or city. ***

    Completed cloister

- A cloister is complete when the tile it is on is completely surrounded by tiles.
- A player with follower in the cloister scores nine points.

    Game End

- At the end of the player's turn in which the last tile is placed, the game ends. 
- The final scoring then takes place.

                                5. FINAL SCORING

    All incomplete roads, cities and cloisters are scored.
    For each incomplete road and city: 
- The player scores 1 point for each road or city segment in the incomplete road or city if 
he has a follower on it's tiles. Shields earn the city player 1 point each. 
- For incomplete roads and cities with more than one follower, use the rules for completed roads 
and cities to determine who gets the points. 
- For each incomplete cloister, a player with a follower in it scores 1 point 
for the cloister tile and 1 point for each tile that surrounds it.`

const rulesContentRu = `
                                ПРАВИЛА ИГРЫ "КАРКАССОН":

                                        1. ХОД ИГРЫ:
    Игроки ходят по очереди по схеме:
1) Игрок открывает карточку и присоединяет её к уже выложенным на стол.
2) Игрок может поместить свою фишку на только что сыгранную карточку.
3) Если только что сыгранная карточка привела к завершению дороги, города или монастыря - происходит подсчет очков.

                        2. КАК СЫГРАТЬ КАРТОЧКУ:

- Новый квадрат должен соприкасаться с уже выложенным ранее хотя бы одной стороной.
- В месте соприкocновения сторон все дороги должны переходить в дороги, поля - в поля, 
а стены городов - в стены городов (карта должна оставаться цельной)

                        3. КАК ВЫСТАВИТЬ ФИШКУ:

    После того, как карточка сыграна, игрок может выставить фишку согласно следующим правилам:
- на каждом ходу игрок может выложить только одну фишку
- фишка должна быть взята из запаса
- игрок может поставить фишку исключительно на только что сыгранную карточку
- игрок должен выбрать, на какую часть карточки он ставит фишку

    Игрок не может поместить фишку на дорогу или в город, если где-нибудь на них уже находится фишка другого игрока.

    4. ПОДСЧЕТ ОЧКОВ ПРИ ЗАВЕРШЕНИИ ПОСТРОЕК И ДОРОГ:

    Завершение дорог:
- Дорога считается завершенной, если оба её конца прилегают к перекрестку, замку или монастырю.
- Если дорога закольцевалась, то она также считается завершенной.
- Игрок, чья фишка стоит на завершенной дороге получает За каждый участок дороги по 1 очку.

    Завершение замка:
- Замок считается завершенным если он полностью окружен городскими стенами, без пробелов.
- Игрок, чья фишка стоит на территории завершенного замка, получает 2 очка за каждую карточку.
- Каждый щит в этом городе приносит игроку ещё 2 бонусных очка.

    Завершение монастыря:
- Монастырь считается завершенным если он полностью окружен карточками.
- Игрок, чья фишка стоит на завершенном монастыре получает 9 очков.

    Конец игры:
- Игра завершается, когда на поле выложен последний квадрат.
- После этого начинается финальный посчет очков.

            5. ОКОНЧАТЕЛЬНЫЙ ПОСДСЧЕТ ОЧКОВ:

- Считаются все незавершенные постройки (дороги, замки, монастыри).
- Игроки, чьи фишки стоят на незавершенных дорогах или в незавершенных замках получают по 1 очку за каждую карточку.
- Щиты в недостроенных городах также приносят игроку по 1 очку.
- Игроки, чьи фишки стоят на недостроенных монастырях получают по 1 очку за карточку с монастырем и по 1 очку за каждую карточку вокруг него.`


const rulesContentDe = `
Spielregeln

Das Spiel spielen
Die Spieler wechseln sich mit dem Startspieler ab. Wenn ein Spieler an der Reihe ist, führt er aus
die folgenden Aktionen:
1 Der Spieler muss ein neues Plättchen ziehen und platzieren
2 Der Spieler kann einen seiner Anhänger aus seinem Vorrat auf dem soeben platzierten Plättchen einsetzen
3 Wenn durch das Platzieren des Plättchens Straßen, Städte oder Kreuzgänge fertiggestellt sind, werden sie jetzt gewertet.

Fliesen platzieren
Ein Spieler legt ein Plättchen nach den folgenden Regeln auf den Tisch:
- Die neue Fliese muss so platziert werden, dass mindestens eine Kante an einer zuvor platzierten Fliese anliegt.
- Das neue Plättchen muss so platziert werden, dass alle Straßen-, Stadt- und Feldsegmente auf dem neuen Plättchen mit der Straße übereinstimmen.
Stadt- oder Feldsegmente auf allen angrenzenden Kacheln.

Follower bereitstellen
Nachdem der Spieler ein Plättchen gelegt hat, kann er einen seiner Anhänger nach den folgenden Regeln einsetzen:
- Der Spieler darf in einem Zug nur einen Follower spielen
- Der Spieler muss es aus seinem Vorrat nehmen
- Der Spieler darf es nur auf dem Plättchen einsetzen, das er gerade gelegt hat
- Der Spieler muss auswählen, wo der Follower auf dem Plättchen eingesetzt werden soll:

Der Spieler darf keinen Anhänger auf einem Straßen-, Stadt- oder Feldsegment einsetzen, wenn dieses Segment eine Verbindung herstellt
zu einem Segment auf einem anderen Plättchen, auf dem sich bereits ein Follower (von einem beliebigen Spieler) befindet.

Bewertung abgeschlossener Straßen, Städte und Kreuzgänge

Straße fertiggestellt

Eine Straße ist fertig, wenn die Straßensegmente an beiden Enden mit einer Kreuzung verbunden sind, einer Stadt im Kreuzgang.
Eine Straße ist auch dann vollständig, wenn sie in einer Schleife mit sich selbst verbunden ist.

Der Spieler, der einen Anhänger auf einer fertiggestellten Straße hat, erhält 1 Punkt für jedes Plättchen auf der Straße.

Stadt fertiggestellt

Eine Stadt ist vollständig, wenn sie vollständig von einer Stadtmauer umgeben ist und keine Lücken in der Mauer bestehen.

Der Spieler, der einen Anhänger in der abgeschlossenen Stadt hat, erhält 2 Punkte für jedes Segment in der Stadt.
Jeder Schild in einem Stadtsegment bringt dem Spieler 2 Bonuspunkte ein.

*! * Was passiert, wenn eine fertiggestellte Straße oder Stadt mehr als einen Anhänger hat?

Durch geschickte Platzierung von Kacheln kann es sein, dass sich mehr als ein Dieb auf einer Straße befindet oder
mehr als ein Ritter in einer Stadt. Wenn dies in einer fertiggestellten Straße oder Stadt geschieht, der Spieler mit den meisten
Diebe (auf einer Straße) oder die meisten Ritter (in einer Stadt) erhalten alle Punkte.
Wenn zwei oder mehr Spieler mit den meisten Dieben oder Rittern zusammenarbeiten, erhalten sie jeweils die Gesamtpunktzahl
für die Straße oder Stadt. ***.

Kreuzgang abgeschlossen

Ein Kreuzgang ist fertig, wenn die Kachel, auf der er liegt, vollständig von Kacheln umgeben ist.
Ein Spieler mit Anhänger im Kreuzgang erhält neun Punkte.

SPIELENDE

Am Ende des Zuges des Spielers, in dem das letzte Plättchen platziert ist, endet das Spiel. Die endgültige Wertung dann
stattfinden.

Alle unvollständigen Straßen, Städte und Kreuzgänge werden gewertet.
Für jede unvollständige Straße und Stadt:
- Der Spieler erhält 1 Punkt für jedes Straßen- oder Stadtsegment in der unvollständigen Straße oder Stadt, wenn
Er hat einen Anhänger auf den Kacheln. Schilde bringen dem Stadtspieler jeweils 1 Punkt ein.
- Verwenden Sie für unvollständige Straßen und Städte mit mehr als einem Anhänger die Regeln für fertiggestellte Straßen
und Städte, um zu bestimmen, wer die Punkte bekommt.
- Für jeden unvollständigen Kreuzgang erhält ein Spieler mit einem Anhänger 1 Punkt
für das Kreuzgangplättchen und 1 Punkt für jedes Plättchen, das es umgibt.`

>>>>>>> origin/develop
export { rulesContentEn, rulesContentRu, rulesContentDe } ;