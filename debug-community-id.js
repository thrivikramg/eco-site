const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
    name: String,
    slug: String
}, { strict: false });

const Community = mongoose.model('Community', CommunitySchema);

async function checkCommunity(id) {
    try {
        await mongoose.connect('mongodb+srv://thrivikram:thrivikram@cluster0.2l205.mongodb.net/eco-site?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to DB');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(`ID ${id} is NOT valid`);
            return;
        }
        console.log(`ID ${id} is valid`);

        const community = await Community.findById(id).lean();
        console.log('Community found:', JSON.stringify(community, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkCommunity("694cdf8ed979035d80daa445");
