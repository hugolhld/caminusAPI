require('dotenv').config()

const PORT = process.env.PORT || 3000

const express = require('express')
const app = express()
app.use(express.json())

const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        // connectionString: "postgres://xpglmwgulqptyt:81989c33d3899f7b122c5fce81d7b5ccec0c9b1de5941a19d57641d7dbe9158e@ec2-79-125-64-18.eu-west-1.compute.amazonaws.com:5432/dbm281oc04it1o",
        ssl:{
            rejectUnauthorized: false,
        },
    }
});

app.get('/singapore/bus_stop', async function(req, res){

    console.log('incoming')

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

app.get('/singapore/bus_stop/:stop_code', async function(req, res){

    console.log('bus stop stop code')

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

app.get('/singapore/bus_routes', async function(req, res){

    console.log('bus_routes get')

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

app.get('/singapore/bus_routes/:stop_code', async function(req, res){

    console.log('bus routes stop code')

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

app.get('/singapore/bus_services', async function(req, res){

    console.log('bus_services get')

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

    console.log('bus services service no')

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

    console.log('taxi_stands get')

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

    console.log('bus services service no')

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

app.get('/singapore/origin_destination_bus/:year&:month', async function(req, res){

    console.log('origin destination bus ')
    console.log(req.params.year)
    console.log(req.params.month)

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

app.get('/paris/bus_stop', async function(req, res){

    console.log('paris bus stop get')

    let rows = []

    try {
        rows = await knex.select('idptar', 'nomptar', 'codeinsee', 'x', 'y', 'coord').from('accessibilite_des_gares_et_stations_metro_et_rer_ratp_csv')
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

// app.get('/paris/bus_stop/l/:line', async function(req, res){

//     console.log('bus services service no')

//     let rows = []

//     try {
//         rows = await knex.select('*')
//             .from('accessibilite-des-arrets-de-bus-ratp')
//             .where({
//                 Ligne: req.params.line
//             })
//     } catch (err) {
//         console.log('error: ' + err);
//         return res.status(500).json({
//             statusCode: 500,
//             message: 'Erro 500',
//         })
//     }

//     return res.status(200).json({
//         statusCode: 200,
//         message: 'Success',
//         // data: rows,
//         data: rows.length === 0 ? null : rows,
//     })
// })

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