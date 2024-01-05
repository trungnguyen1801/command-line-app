const readline = require("readline");
const players = require("./data/players.json");
const nations = require("./data/nations.json");
const teams = require("./data/teams.json");

const PLAYERS = "1";
const TEAMS = "2";
const NATIONS = "3";

const SEARCH = "1";
const VIEW_LIST_FIELDS = "2";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const convertString = (value) => value.toString().trim().toLowerCase();

const showError = () =>
  console.log("\nThis value is not satisfied, please enter another value");

const checkValueExit = (value) => {
  if(value !== 'quit') return;
  exitApp()
};

const exitApp = () => {
  rl.close();
  process.exit();
}

const showAppOptions = () => {
  rl.question(
    "Type 'quit' to exit at any time. Please 'Enter' to continue \nSelect search options: \n - Press 1 to search \n - Press 2 to view a list of searchable fields \n - Type 'quit' to exit \n",
    (option) => handleAppOption(option)
  );
};

const handleAppOption = (option) => {
  checkValueExit(option);

  if ([SEARCH, VIEW_LIST_FIELDS].includes(option)) 
    showTypeData(option);
  else {
    showError();
    showAppOptions();
  }
};

const showTypeData = (option) => {
  rl.question(
    "Press 1: Players or Press 2: Teams or Press 3: Nations\n",
    (typeData) => handleTypeData(option, typeData)
  );
};

const handleTypeData = (option, typeData) => {
  checkValueExit(typeData);

  if ([PLAYERS, TEAMS, NATIONS].includes(typeData))
    handleOptionByData(option, typeData);
  else {
    showError();
    showTypeData(option);
  }
};

const getData = (typeData) => {
  switch (typeData) {
    case PLAYERS:
      return players;
    case NATIONS:
      return nations;
    case TEAMS:
      return teams;
    default:
      showError();
      break;
  }
};

const getFieldData = (data) => Object.keys(data[0]);

const handleOptionByData = (option, typeData) => {
  const data = getData(typeData);
  if (option === SEARCH) {
    questionedSearchField(data, typeData);
  } else if (option === VIEW_LIST_FIELDS) {
    console.log("=> Result:\n", getFieldData(data));
    exitApp();
  }
};

const questionedSearchField = (data, typeData) => 
  rl.question("Enter search term\n", (field) => handleSearchField(data, typeData, field));

const isValidField = (data, field) => getFieldData(data).includes(field)

const handleSearchField = (data, typeData, field) => {
  checkValueExit(field);

  if (!isValidField(data, field)) {
    showError();
    questionedSearchField(data, typeData);
  } else {
    questionedSearchValue(data, typeData, field);
  }
}

const questionedSearchValue = (data, typeData, field) => {
  rl.question("Enter search value\n", (value) => handleSearchValue(data, typeData, field, value));
}

const handleSearchValue = (data, typeData, field, value) => {
  checkValueExit(value);

  const dataResult = data.filter((item) => convertString(item[field]) === convertString(value));
  if(dataResult.length === 0) {
    console.log("No result!");
    exitApp();
  }
  handleDataResult(dataResult, typeData);
}

const handleDataResult = (data, typeData) => {
  data.forEach((item) => {
    if (typeData === PLAYERS) {
      const { teamsName, nationsName } = getNameData(item.team_id, item.nation_id);
      console.log("=> Result:\n", {
        ...item, 
        team_name: teamsName, 
        nation_name: nationsName 
      });
    } else if (typeData === TEAMS) {
      const { nationsName, playerNameByTeam } = getNameData(item._id, item.nation_id);
      console.log("=> Result:\n", {
        ...item,
        nation_name: nationsName,
        player_name: playerNameByTeam,
      });
    } else if (typeData === NATIONS) {
      const { teamsNameByNation, playerNameByNation } = getNameData(null, item._id);
      console.log("=> Result:\n", {
        ...item,
        team_name: teamsNameByNation,
        player_name: playerNameByNation,
      });
    } else {
      showError();
    }
  });
  exitApp()
};

const getNameData = (team_id, nation_id) => {
  const teamsName = teams
    .filter((team) => team._id === team_id)
    .map((team) => team.name);
  const teamsNameByNation = teams
    .filter((team) => team.nation_id === nation_id)
    .map((team) => team.name);
  const nationsName = nations
    .filter((nation) => nation._id === nation_id)
    .map((nation) => nation.name);
  const playerNameByTeam = players
    .filter((player) => player.team_id === team_id)
    .map((player) => player.name);
  const playerNameByNation = players
    .filter((player) => player.nation_id === nation_id)
    .map((player) => player.name);

  return {
    teamsName,
    teamsNameByNation,
    nationsName,
    playerNameByTeam,
    playerNameByNation,
  };
};

showAppOptions();

const index = {
  getFieldData,
}

module.exports = index

