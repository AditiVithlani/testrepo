exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        // Replace with actual database call
        const user = await getUserFromDatabase(userId);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.json(user);
    } catch (error) {
        next(error); // Forward error to the centralized error handler
    }
};

exports.home = (req, res) => {
    res.send('Welcome to the Home Page');
};

// Mock function to simulate database call
const getUserFromDatabase = async (id) => {
    // Simulate database users
    const users = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' }
    ];
    return users.find(user => user.id === id) || null;
};
