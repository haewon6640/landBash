# landBash
Land Bash
Link to the similar game: https://www.kongregate.com/games/zigzagame/the-great-war-of-prefectures
The player is dropped into a game of territorial disputes! This is a turn-based browser game where the goal of the game is to survive and conquer all lands.
The player is able to choose multiple classes of fighters as well as being able to upgrade their units. 
Battles are held in a real-time strategy style, where the players are able to move their minions as needed. (Not part of MVP)

Rules: 
The player will be given a set amount of gold per turn (depending on the number of territories they control), and ability to buy soldiers and powers with the given gold. Each territory can hold upto 25 soldiers and 1 power. When dragging a number of soldiers from owned territory to an enemy territory, a battle between the dragged soldiers and the enemy soldiers will commence.
The soldiers deployed cannot attack on the same turn.

Each territory will have a land trait that will stay fixed on the land (such as Farm: gain 150% more gold from the territory and Mine: three undead miners
Battle Logic: (Not MVP)
At the start of battle, the range units will stay in the respective back row while shooting, while the melee units will seek the nearest enemy and attack it. One can “withdraw” which will cause your units to run away from battle, leaving you with the surviving units.
Technology:
I plan on using canvas and vanilla DOM manipulation to build the game. So the file structure would contain an html document, css document, and javascript documents modularized into classes such as land, player, game, etc.



