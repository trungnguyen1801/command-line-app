
# Command Line Application

A simple command line application to search soccer data and return results in human-readable format.


## Requirements

Node.js v14.16.0+
## Authors

- [@trungnguyen](https://github.com/trungnguyen1801)


## Run Locally

Use node version 14.16.0+

```bash
  nvm use 14.16
```

Install package
```bash
  npm install
```

Use Application

```bash
  node index.js
```
## Demo

```bash
Type 'quit' to exit at any time. Please 'Enter' to continue 
Select search options: 
 - Press 1 to search 
 - Press 2 to view a list of searchable fields 
 - Type 'quit' to exit 
1
Press 1: Players or Press 2: Teams or Press 3: Nations
3
Enter search term
_id
Enter search value
63
=> Result:
 {
  _id: 63,
  value: 'england',
  name: 'England',
  team_name: [
    'AFC Bournemouth',
    'Arsenal',
    'Aston Villa',
    'Brentford',
    'Brighton & Hove Albion',
    'Chelsea',
    'Crystal Palace',
    'Everton',
    'Fulham',
    'Leeds United',
    'Leicester City',
    'Liverpool',
    'Manchester City',
    'Manchester United',
    'Newcastle United',
    'Nottingham Forest',
    'Southampton',
    'Tottenham Hotspur',
    'West Ham United',
    'Wolverhampton Wanderers'
  ],
  player_name: [
    'B. Saka',             'J. Maddison',
    'P. Foden',            'D. Rice',
    'T. Alexander-Arnold', 'J. Grealish',
    'M. Rashford',         'K. Trippier',
    'C. Wilson',           'R. Sterling',
    'N. Pope',             'A. Ramsdale',
    'J. Stones',           'E. Eze',
    'O. Watkins',          'J. Pickford',
    'J. Sancho',           'K. Walker',
    'L. Dunk',             'L. Shaw',
    'R. James'
  ]
}
```

