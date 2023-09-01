//. app.js
var express = require( 'express' ),
    whois = require( 'whois' ),
    app = express();

app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

//. REST API
app.get( '/api/whois', function( req, res ){
  res.contentType( 'text/plain; charset=utf-8' );

  var domain = req.query.domain;
  if( domain ){
    whois.lookup( domain, function( err, result ){
      if( err ){
        res.status( 400 );
        res.write( JSON.stringify( err, null, 2 ) );
        res.end();
      }else{
        res.write( result );
        res.end();
      }
    });
  }else{
    res.status( 400 );
    res.write( 'query parameter "domain" not specified.' );
    res.end();
  }
});


var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
