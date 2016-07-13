(function(angular, undefined) {
  angular.module("2kvidWebApp.constants", [])

.constant("appConfig", {
	"version": "0.9.0",
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"franchises": {
		"bborn": "Battleborn",
		"civ6": "Civilization VI",
		"mafia3": "Mafia III",
		"mktg": "Marketing",
		"nhlsuper": "NHL 2K SuperCard",
		"nba2k17": "NBA 2K17",
		"wwe2k17": "WWE 2K17",
		"wwesuper": "WWE 2K SuperCard",
		"xcom2": "XCOM 2"
	}
})

;
})(angular);