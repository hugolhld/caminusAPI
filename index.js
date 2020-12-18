require('dotenv').config()

// Init PORT
const PORT = process.env.PORT || 3000

// Init express
const express = require('express')
const app = express()
app.use(express.json())

// Init knew with params to connect db
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl:{
            rejectUnauthorized: false,
        },
    }
});

// Get all bus stop of singapore
app.get('/singapore/bus_stop', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('id', 'BusStopCode', 'RoadName', 'Description', 'Latitude', 'Longitude').from('bus_stop')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })

})

// Filter all bus stop by them stop code
app.get('/singapore/bus_stop/:stop_code', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('*')
            .from('bus_stop')
            .where({
                BusStopCode: req.params.stop_code
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: rows.length === 0 ? null : rows[0],
    })
})

// Get all bus routes
app.get('/singapore/bus_routes', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('*').from('bus_routes')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

// Filter bus routes with bus stop code
app.get('/singapore/bus_routes/:stop_code', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('*')
            .from('bus_routes')
            .where({
                BusStopCode: req.params.stop_code
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: rows.length === 0 ? null : rows,
    })
})

// Get list of bus in 
app.get('/singapore/bus_services', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('*').from('bus_services')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

app.get('/singapore/bus_services/:service_no', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('*')
            .from('bus_services')
            .where({
                ServiceNo: req.params.service_no
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: rows.length === 0 ? null : rows,
    })
})

app.get('/singapore/taxi_stands', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('*').from('taxi_stands')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

app.get('/singapore/taxi_stands/:taxi_code', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('*')
            .from('taxi_stands')
            .where({
                TaxiCode: req.params.taxi_code
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: rows.length === 0 ? null : rows[0],
    })
})

app.get('/singapore/origin_destination_bus/:year/:month', async function(req, res){

    let rows = []

    try {
        rows = await knex.select('YEAR_MONTH').from('origin_destination_bus_202011'/*  + req.params.year + req.params.month */)
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

app.get('/singapore/transport_population_bus_stop/:year&:month', async function(req, res){

    console.log('transport node bus ')
    // console.log(req.params.year)
    // console.log(req.params.month)

    let rows = []

    try {
        rows = await knex.select('YEAR_MONTH').from('transport_node_bus_' + req.params.year + req.params.month)
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

// All bus stop of paris
app.get('/paris/bus_stop', async function(req, res){

    console.log('paris bus stop get')

    let rows = []

    try {
        rows = await knex.select('idptar', 'nomptar', 'codeinsee').from('accessibilite_des_gares_et_stations_metro_et_rer_ratp_csv')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

// Fliter by bus stop code
app.get('/paris/bus_stop/:stop_code', async function(req, res){

    console.log('bus services service no')

    let rows = []

    try {
        rows = await knex.select('idptar', 'nomptar', 'codeinsee', 'x', 'y', 'coord')
            .from('accessibilite_des_gares_et_stations_metro_et_rer_ratp_csv')
            .where({
                idptar: req.params.stop_code
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: rows.length === 0 ? null : rows,
    })
})

// Fliter by bus postal code
app.get('/paris/bus_stop/p/:postal_code', async function(req, res){

    console.log('bus services service no')

    let rows = []

    try {
        rows = await knex.select('idptar', 'nomptar', 'codeinsee', 'x', 'y', 'coord')
            .from('accessibilite_des_gares_et_stations_metro_et_rer_ratp_csv')
            .where({
                codeinsee: req.params.postal_code
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        // data: rows,
        data: rows.length === 0 ? null : rows,
    })
})

// Traffic per station per year
app.get('/paris/traffic_per_station/:year', async function(req, res){

    console.log('traffic_per_station ')
    console.log(req.params.year)
    console.log(req.params.month)

    let rows = []

    try {
        rows = await knex.select('*').from(req.params.year + '_trafic_annuel_entrant_par_station_du_reseau_ferre_csv')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: rows
    })
})

// List of all bus stop
app.get('/paris/access_stop_bus', async function(req, res){

    console.log('paris bus stop get')

    let rows = []

    try {
        rows = await knex.select('*').from('accessibilite-des-arrets-de-bus-ratp')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

// List of all bus stop of a line specified
app.get('/paris/access_stop_bus/:line', async function(req, res){

    console.log('bus services service no')

    let rows = []

    try {
        rows = await knex.select('*')
            .from('accessibilite-des-arrets-de-bus-ratp')
            .where({
                Ligne: req.params.line
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        // data: rows,
        data: rows.length === 0 ? null : rows,
    })
})

// List of all subway stop
app.get('/paris/metro_rer_stop', async function(req, res){

    console.log('paris bus stop get')

    let rows = []

    try {
        rows = await knex.select('*').from('accessibilite_des_gares_et_stations_metro_et_rer_ratp_csv')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})
// List of all subway stop of a line specified
app.get('/paris/metro_rer_stop/:postal_code', async function(req, res){

    console.log('bus services service no')

    let rows = []

    try {
        rows = await knex.select('*')
            .from('accessibilite_des_gares_et_stations_metro_et_rer_ratp_csv')
            .where({
                codeinsee: req.params.postal_code
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        // data: rows,
        data: rows.length === 0 ? null : rows,
    })
})

// List of all line of bus, subway and more with departure and arrival stations
app.get('/paris/line', async function(req, res){

    console.log('paris bus stop get')

    let rows = []

    try {
        rows = await knex.select('*').from('accessibilite_des_lignes_du_reseau_de_surface_ratp_csv')
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }
    
    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        rows
    })
})

//Departure and arrival stations of a line specified
app.get('/paris/line/:line', async function(req, res){

    console.log('bus services service no')

    let rows = []

    try {
        rows = await knex.select('*')
            .from('accessibilite_des_lignes_du_reseau_de_surface_ratp_csv')
            .where({
                line: req.params.line
            })
    } catch (err) {
        console.log('error: ' + err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro 500',
        })
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        // data: rows,
        data: rows.length === 0 ? null : rows,
    })
})


app.listen(PORT)