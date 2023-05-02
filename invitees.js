const fileInput = document.querySelector('input')
const preview = document.getElementById('preview')

// List of invitees
const invites = []

fileInput.addEventListener('change', () => {

    const fr = new FileReader()

    fr.readAsText(fileInput.files[0])

    fr.addEventListener('load', () => {

        const res = fr.result

        // Convert to js array
        const myAffiliatesArray = res.split('\n').map(JSON.parse);

        //Sort on AffiliateId (asc)
        myAffiliatesArray.sort((a, b) => (a.affiliate_id > b.affiliate_id ? 1 : -1))

        const lat1 = 53.3340285
        const lon1 = -6.2535495



        myAffiliatesArray.forEach(function (obj) {
            const lat2 = obj.latitude
            const lon2 = obj.longitude

            const distance = getDistance(lat1, lat2, lon1, lon2)
            obj.distance = distance
            if (distance <= 100)
                invites.push(obj)

        });



        const h2 = document.createElement('h2')
        h2.textContent = 'The following affiliates will be invited'
        document.getElementById("preview").appendChild(h2);

        //Construct table
        const table = document.createElement('table')
        table.classList.add("invites-table")

        const thead = document.createElement('thead')
        table.appendChild(thead)

        const tr = document.createElement('tr')
        thead.appendChild(tr)

        const th = document.createElement('th')
        th.textContent = 'Name'
        tr.appendChild(th)

        const th1 = document.createElement('th')
        th1.textContent = 'Affiliate Id'
        tr.appendChild(th1)

        const th2 = document.createElement('th')
        th2.textContent = 'Distance (Kms)'
        tr.appendChild(th2)

        const tbody = document.createElement('tbody')

        invites.forEach(function (obj) {

            const tr = document.createElement('tr')
            tbody.appendChild(tr)

            const td1 = document.createElement('td')
            td1.textContent = obj.name
            tr.appendChild(td1)

            const td2 = document.createElement('td')
            td2.textContent = obj.affiliate_id
            tr.appendChild(td2)

            const td3 = document.createElement('td')
            td3.textContent = obj.distance
            tr.appendChild(td3)

        })
        
        table.appendChild(tbody)

        preview.appendChild(table)

    })


})



function getDistance(lat1, lat2, lon1, lon2) {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return Math.ceil(c * r);
}


