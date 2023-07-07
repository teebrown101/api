const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
        enum: ['matchjoining', 'matchexit', 'rejoinmatch', 'waitingtorejoin', 'Ingame', 'matchmakingrequested'],
    },
userId: {
type: mongoose.Schema.Types.ObjectId,
required: true,
},
timestamp: {
type: Date,
default: Date.now,
},
data: {
type: Object,
required: true,
},
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;