(function() {

	var app = angular.module('visa-sponsors', []);

	app.controller('ExplorerController', function($http) {

		var explorer = this;

		var addToArray = function(arr, item) {
			if (arr.indexOf(item) === -1 && item != '') {
				arr.push(item);
			}
		}

		explorer.humanNames = {
			name: 'Sponsor name',
			sectors: 'Sectors',
			index: 'Careers index',
			visaType: 'Type of visa',
			undergradRecruitment: 'Info for undergraduates',
			postgradRecruitment: 'Info for postgraduates',
			schemeDates: 'Recruitment dates',
			visaRestrictions: 'Visa restrictions',
			twitter: 'Twitter',
			linkedin: 'Linkedin',
			location: 'Location'
		};

		explorer.groupings = {
			primary : [
				'location',
				'visaType'
			],
			socialMedia: [
				'twitter', 
				'linkedin'
			],
			moreInfo: [
				'undergradRecruitment',
				'postgradRecruitment',
				'schemeDates'
			]
		};

		explorer.logos = {
			twitter: 'http://www.lse.ac.uk/intranet/CareersAndVacancies/careersService/images/SocialMedia/TwitterLogoOfficial62x62.png',
			linkedin: 'https://careers.lse.ac.uk/Uploads/Images/LinkedIn%20(1).png'
		};

		explorer.lists = {sectors:[], location:[], visaType:[], index:[]};

		explorer.allSponsors = [];
		explorer.sponsors = []; //sponsors in view
		$http.get('sponsors.json').success(function(data) {
			explorer.allSponsors = explorer.sponsors = data;
			for (var i = 0; i < data.length; i++) {
				var l = explorer.lists,
					s = data[i].sectors.split('\n'),
					c = data[i].index.split('\n');
				addToArray(l.location, data[i].location);
				addToArray(l.visaType, data[i].visaType);
				for (var j = 0; j < s.length; j++) {
					addToArray(l.sectors, s[j]);
				}
				j = 0;
				for (; j < c.length; j++) {
					addToArray(l.index, c[j]);
				}
			}
		});

		explorer.filters = {};
		explorer.filtersApplied = function() {
			for(var prop in explorer.filters) {
				if (Object.prototype.hasOwnProperty.call(explorer.filters, prop)) {
				  return true;
				}
			}
			return false;
		};
		explorer.filterArrayBy = function(key, value) {
			explorer.filters[key] = value;
		};
		explorer.removeFilter = function(type) {
			delete explorer.filters[type];
		};
		explorer.clearAllFilters = function() {
			explorer.filters = {};
		}

		explorer.sort = {property: 'name', reversed: false};

	});

})();