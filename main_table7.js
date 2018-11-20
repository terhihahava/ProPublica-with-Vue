var app = new Vue({
    el: '#app',
    data() {
        return {
            senators: [],
            checkedParty: [],
            dropdown: "all",
            state_array: []
        };
    },
    created: function () {

        var header = new Headers({
            'X-API-Key': 'Lem7H6zVJiFJr0KgobrNWgH6I7hpeSbNTduC0qGx'
        });

        var url = "https://api.propublica.org/congress/v1/115/senate/members.json";

        fetch(url, {
                headers: header
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {

                app.senators = json.results[0].members

            })
    },
    computed: {

        filteredTable() {

            return this.senators.filter(senator => {

                var partyFilter = this.checkedParty.length == 0 || this.checkedParty.includes(senator.party)

                var stateFilter = this.dropdown == "all" || this.dropdown.includes(senator.state)

                return partyFilter && stateFilter;
            })
        },



        getStatesDropDown() {

            this.state_array = this.senators.map(senator => {
                return senator.state
            
            })
            
        
            return this.state_array.reduce(function (a, b) {
                if (a.indexOf(b) < 0) a.push(b);
                return a;
            }, [])

        } 
    }

})
