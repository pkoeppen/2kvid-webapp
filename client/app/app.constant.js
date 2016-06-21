(function(angular, undefined) {
  angular.module("2kvidWebApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"franchises": {
		"bborn": "Battleborn",
		"civ6": "Civilization VI",
		"mafia3": "Mafia III",
		"nba2k17": "NBA 2K17",
		"wwe2k17": "WWE 2K17",
		"xcom2": "XCOM 2"
	}
})

;
})(angular);