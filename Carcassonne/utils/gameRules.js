const rulesContentEn = `
                                  GAME RULES "CARCASSONNE":

                                    1. PLAYING THE GAME

    Players take turns with the starting player. On a player's turn, he executes the following actions:
1) The player must draw and place a new tile/
2) The player may deploy one of his followers from his supply on the tile he just placed/
3) If, through the placement of the tile, roads, cities or cloisters are completed, they are now scored.
    All the points received after the calculation players enter in a special window. The result will be reflected on the scoreboard.

                                        2. PLACING TILES

    A player places tile on the table, using the following rules:
- The new tile must be placed with at least one edge abutting one previously placed tile;
- The new tile must be placed so that all road, city and field segments on the new tile match road, city or field segments on all abutting tiles.

                                    3. DEPLOYING FOLLOWERS

    After the player places a tile, he may deploy one of his followers, using the following rules:
- The player may only play one follower on a turn;
- The player must take it from his supply;
- The player may only deploy it on the tile he just placed;
- The player must choose where to deploy the follower on the tile.
    The player may not deploy a follower on a road, city or field segment if that segment connects to a segment on another tile that already 
    has a follower (from any player) on it.


      4. SCORING COMPLETED ROADS, CITIES AND CLOISTERS

    Completed road
- A road is complete when the road segments at both ends connect to a crossing, a city of a cloister.
- A road is also complete if it connects to itself in a loop.
    The player who has a follower on a completed road scores 1 point for each tile in the road.

    Completed city
- A city is complete when it's completely surrounded by a city wall and there are no gaps in the wall.
- The player who has a follower in the completed city scores 2 points for each segment in the city.
- Each shield on a city segment earns the player 2 bonus points.
    
    What happens when a completed road or city has more than one follower?
When this occurs in a completed road or city, the player with the most followers scores all the points.
When two or more players tie with the most followers, they each score the total points for the road or city.

    Completed cloister
- A cloister is complete when the tile it is on is completely surrounded by tiles.
- A player with follower in the cloister scores nine points.

                                5. GAME END

- At the end of the player's turn in which the last tile is placed, the game ends. 
- The final scoring then takes place.

                                6. FINAL SCORING

- All incomplete roads, cities and cloisters are scored.
- The player scores 1 point for each road or city segment in the incomplete road or city if he has a follower on it's tiles. Shields earn the city player 1 point each. 
- For incomplete roads and cities with more than one follower, use the rules for completed roads and cities to determine who gets the points. 
- For each incomplete cloister, a player with a follower in it scores 1 point for the cloister tile and 1 point for each tile that surrounds it.
- After the final scoring, the results are also entered into a window for display on the scoreboard.`;

const rulesContentRu = `
                                ПРАВИЛА ИГРЫ "КАРКАССОНН":

                                        1. ХОД ИГРЫ:

    Игроки ходят по очереди по схеме:
1) Игрок открывает карточку и присоединяет её к уже выложенным на стол.
2) Игрок может поместить свою фишку на только что сыгранную карточку.
3) Исли только что сыгранная карточка привела к завершению дороги, города или монастыря - происходит подсчёт очков.
    Все полученные после подсчёта очки игроки заносят в специальное окно. Результат будет отражен на доске счёта.

                        2. КАК СЫГРАТЬ КАРТОЧКУ:

- Новый квадрат должен соприкасаться с уже выложенным ранее хотя бы одной стороной;
- В месте соприкocновения сторон все дороги должны переходить в дороги, поля - в поля, а стены 
  городов - в стены городов (карта должна оставаться цельной).

                        3. КАК ВЫСТАВИТЬ ФИШКУ:

    После того, как карточка сыграна, игрок может выставить фишку согласно следующим правилам:
- На каждом ходу игрок может выложить только одну фишку;
- Фишка должна быть взята из запаса;
- Игрок может поставить фишку исключительно на только что сыгранную карточку;
- Игрок должен выбрать, на какую часть карточки он ставит фишку.
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

        Как провести подсчёт очков, если на 
    завершенной дороге или в завершенном городе 
                более одного игрока?
  В таком случае все очки получает игрок с наибольшим количеством фишек на данной постройке.
  Если у двух или более игроков одинаковое количество фишек на постройке, то они все получают полное количество очков за эту постройку.

                                5. КОНЕЦ ИГРЫ:

- Игра завершается, когда на поле выложен последний квадрат.
- После этого начинается финальный посчет очков.

            6. ОКОНЧАТЕЛЬНЫЙ ПОСДСЧЕТ ОЧКОВ:

- Считаются все незавершенные постройки (дороги, замки, монастыри).
- Игроки, чьи фишки стоят на незавершенных дорогах или в незавершенных замках получают по 1 очку за каждую карточку.
- Щиты в недостроенных городах также приносят игроку по 1 очку.
- Игроки, чьи фишки стоят на недостроенных монастырях получают по 1 очку за карточку с монастырем и по 1 очку за каждую карточку вокруг него.
- После окнчательного подсчёта очков результаты также заносятся в окно для отображения на доске счёта.`;

const rulesContentDe = `
                                                SPIELREGELN

                                        1. DAS SPIEL SPIELEN

    Die Spieler wechseln sich mit dem Startspieler ab. Wenn ein Spieler an der Reihe ist, führt er aus die folgenden Aktionen:
1) Der Spieler muss ein neues Plättchen ziehen und platzieren.
2) Der Spieler kann einen seiner Gefolgsleute aus seinem Vorrat auf dem soeben platzierten Plättchen einsetzen.
3) Wenn durch das Platzieren des Plättchens Straßen, Städte oder Kreuzgänge fertiggestellt sind, werden sie jetzt gewertet.
    Alle nach der Berechnung erhaltenen Punkte werden in einem speziellen Fenster angezeigt. Das Ergebnis wird auf der Anzeigetafel angezeigt.
                                        

                                2. FLIESEN PLATZIEREN

    Ein Spieler legt ein Plättchen nach den folgenden Regeln auf den Tisch:
- Die neue Fliese muss so platziert werden, dass mindestens eine Kante an einer zuvor platzierten Fliese anliegt;
- Das neue Plättchen muss so platziert werden, dass alle Straßen-, Stadt- und Feldsegmente auf dem neuen Plättchen mit der Straße 
    übereinstimmen Stadt- oder Feldsegmente auf allen angrenzenden Kacheln.
                                    
                                3. FOLLOWER BEREITSTELLEN

    Nachdem der Spieler ein Plättchen gelegt hat, kann er einen seiner Gefolgsleute nach den folgenden Regeln einsetzen:
- Der Spieler darf in einem Zug nur einen Gefolgsleute spielen;
- Der Spieler muss es aus seinem Vorrat nehmen;
- Der Spieler darf es nur auf dem Plättchen einsetzen, das er gerade gelegt hat;
- Der Spieler muss auswählen, wo der Follower auf dem Plättchen eingesetzt werden soll.
    Der Spieler darf keinen Gefolgsleute auf einem Straßen-, Stadt- oder Feldsegment einsetzen, wenn dieses Segment mit einem
Segment auf einem anderen Plättchen verbunden ist, auf dem sich bereits ein Gefolgsleute (von einem beliebigen Spieler) befindet.

4. BEWERTUNG ABGESCHLOSSENER STRASSEN, STÄDTE UND KREUZGÄNGE

    Straße fertiggestellt
- Eine Straße ist fertig, wenn die Straßensegmente an beiden Enden mit einer Kreuzung verbunden sind, einer Stadt im Kreuzgang.
- Eine Straße ist auch dann vollständig, wenn sie in einer Schleife mit sich selbst verbunden ist.
    Der Spieler, der einen Gefolgsleute auf einer fertiggestellten Straße hat, erhält 1 Punkt für jedes Plättchen auf der Straße.

    Stadt fertiggestellt
- Eine Stadt ist vollständig, wenn sie vollständig von einer Stadtmauer umgeben ist und keine Lücken in der Mauer bestehen.
- Der Spieler, der einen Gefolgsleute in der abgeschlossenen Stadt hat, erhält 2 Punkte für jedes Segment in der Stadt.
  Jeder Schild in einem Stadtsegment bringt dem Spieler 2 Bonuspunkte ein.

    Was passiert, wenn eine fertiggestellte Straße oder Stadt mehr als einen Gefolgsleute hat?
  Wenn dies auf einer fertiggestellten Straße oder Stadt geschieht, erhält der Spieler mit den meisten Anhängern alle Punkte.
  Wenn zwei oder mehr Spieler mit den meisten Anhängern zusammenarbeiten, erhalten sie jeweils die Gesamtpunktzahl für die Straße oder Stadt.

  Kreuzgang abgeschlossen
- Ein Kreuzgang ist fertig, wenn die Kachel, auf der er liegt, vollständig von Kacheln umgeben ist.
- Ein Spieler mit Gefolgsleute im Kreuzgang erhält neun Punkte.

                                    5. SPIELENDE

- Am Ende des Zuges des Spielers, in dem das letzte Plättchen platziert ist, endet das Spiel. 
- Die endgültige Wertung dann stattfinden.

                                   
                                6. ENDGÜLTIGE WERTUNG

- Alle unvollständigen Straßen, Städte und Kreuzgänge werden gewertet.
- Der Spieler erhält 1 Punkt für jedes Straßen- oder Stadtsegment in der unvollständigen Straße oder Stadt, wenn Er hat einen Gefolgsleute auf den Kacheln. Schilde bringen dem Stadtspieler jeweils 1 Punkt ein.
- Verwenden Sie für unvollständige Straßen und Städte mit mehr als einem Gefolgsleute die Regeln für fertiggestellte Straßen und Städte, um zu bestimmen, wer die Punkte bekommt.
- Für jeden unvollständigen Kreuzgang erhält ein Spieler mit einem Gefolgsleute 1 Punkt für das Kreuzgangplättchen und 1 Punkt für jedes Plättchen, das es umgibt.
- Nach der endgültigen Wertung werden die Ergebnisse auch in ein Fenster zur Anzeige auf der Anzeigetafel eingegeben. `;

export { rulesContentEn, rulesContentRu, rulesContentDe };
