const mongoose = require('mongoose');
const BlogPost = require('./schema'); // Import the BlogPost schema

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogApp', {
 
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

// Function to create a new blog post
async function createBlogPost(title, content, author, tags) {
    try {
        const newPost = await BlogPost.create({
            title,
            content,
            author,
            tags,
        });
        console.log('Blog Post Created:', newPost);
    } catch (err) {
        console.error('Error creating blog post:', err);
    }
}

// Function to read all blog posts or a single blog post by ID
async function readBlogPosts(postId = null) {
    try {
        if (postId) {
            const post = await BlogPost.findById(postId);
            console.log('Blog Post:', post);
        } else {
            const posts = await BlogPost.find();
            console.log('All Blog Posts:', posts);
        }
    } catch (err) {
        console.error('Error reading blog post(s):', err);
    }
}

// Function to update a blog post by ID
async function updateBlogPost(postId, updatedData) {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(postId, updatedData, { new: true });
        console.log('Updated Blog Post:', updatedPost);
    } catch (err) {
        console.error('Error updating blog post:', err);
    }
}

// Function to delete a blog post by ID
async function deleteBlogPost(postId) {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(postId);
        console.log('Deleted Blog Post:', deletedPost);
    } catch (err) {
        console.error('Error deleting blog post:', err);
    }
}

// Test the CRUD operations
async function testCRUDOperations() {
    try {
        // Create a new blog post
        const newPost = await BlogPost.create({
            title: 'Test Blog',
            content: 'This is a test blog post content. It is longer than 50 characters.',
            author: 'TestAuthor',
            tags: ['test', 'example'],
        });

        console.log('Created Blog Post:', newPost);

        // Read all blog posts
        await readBlogPosts();

        // Read a single blog post by ID
        await readBlogPosts(newPost._id);

        // Update the blog post
        await updateBlogPost(newPost._id, {
            title: 'Updated Test Blog',
            content: 'This content has been updated.',
        });

        // Add a comment to the blog post
        newPost.comments.push({
            username: 'Commenter123',
            message: 'This is a test comment.',
        });
        await newPost.save();
        console.log('Added comment to Blog Post:', newPost);

        // Delete the blog post
        await deleteBlogPost(newPost._id);

    } catch (err) {
        console.error('Error during CRUD operations:', err);
    } finally {
        mongoose.connection.close();
    }
}

testCRUDOperations();