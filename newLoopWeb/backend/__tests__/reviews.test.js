const axios = require('axios');
const { app, server } = require('../app'); 

const TEST_USER_ID = 1;
const TEST_MOVIE_ID = 1;

test('should create a review and save it to the database', async () => {
    const reviewPayload = {
        content: '<b>Great Movie!</b> I really enjoyed watching it.', 
        rating: 5,
        account_id: TEST_USER_ID,
        movie_id: TEST_MOVIE_ID
    };

    // Send the payload to your API
    const response = await axios.post(`http://localhost:${server.address().port}/api/reviews`, reviewPayload);

    // Expectations
    expect(response.status).toBe(201);
    expect(response.data.review).toBeDefined();
    expect(response.data.review.content).toBe(reviewPayload.content);
    expect(response.data.review.rating).toBe(reviewPayload.rating);
    expect(response.data.review.account_id).toBe(reviewPayload.account_id);
    expect(response.data.review.movie_id).toBe(reviewPayload.movie_id);
});

test('should not allow reviews longer than 600 characters', async () => {
    // Review payload with content exceeding 600 characters
    const longContent = 'A'.repeat(601);
    const reviewPayload = {
        content: longContent,
        rating: 5,
        account_id: TEST_USER_ID,
        movie_id: TEST_MOVIE_ID
    };

    // Send the payload to your API
    try {
        await axios.post(`http://localhost:${server.address().port}/api/reviews`, reviewPayload);
    } catch (error) {
        // Expectations
        expect(error.response.status).toBe(400); // Assuming your API returns 400 for validation errors
        expect(error.response.data.error).toBe('Review content exceeds the maximum length of 600 characters.');
    }
});

afterAll(() => {
    server.close(); // Close the server after all tests have run
});
