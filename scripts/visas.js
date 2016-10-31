(function(jQuery) {

    var app = angular.module('visa-sponsors', []);

    app.controller('ExplorerController', function($http) {

        var addToArray = function(arr, item) {
            if (arr.indexOf(item) === -1 && item != '') {
                arr.push(item);
            }
        }
        
        var explorer = this;
        
        explorer.ready = false;

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
            twitter: 'https://www.lse.ac.uk/intranet/CareersAndVacancies/careersService/images/SocialMedia/TwitterLogoOfficial62x62.png',
            linkedin: 'https://www.lse.ac.uk/intranet/CareersAndVacancies/careersService/images/SocialMedia/LinkedIn.png'
        };

        explorer.lists = {sectors:[], location:[], visaType:[], index:[]};

        explorer.sponsors = [];
        $http.get('Sponsors.js')
            .success(function(data) {
            explorer.sponsors = data;
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
            jQuery('#sponsors-list').show();
            explorer.ready = true;
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
  
    jQuery('.visa-warning-icon').html('&#9888;&#65038;');

})($);