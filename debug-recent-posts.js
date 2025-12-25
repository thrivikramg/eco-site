const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
    createdAt: Date
}, { strict: false });

const Post = mongoose.model('Post', PostSchema);

async function checkRecentPosts() {
    try {
        await mongoose.connect('mongodb+srv://thrivikram:thrivikram@cluster0.2l205.mongodb.net/eco-site?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to DB');

        // Get last 5 posts
        const posts = await Post.find().sort({ createdAt: -1 }).limit(5).lean();
        console.log('Recent Posts:', JSON.stringify(posts, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkRecentPosts();
