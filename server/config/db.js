var mongoose = require('mongoose');


module.exports= {
    mongoosedb(){
        mongoose.connect('mongodb://localhost/e-commerce', {useNewUrlParser: true});
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
          console.log('connected to mongoose');
        });

    }
}