const supertest = require('supertest');
const { Review } = require('./models/review');
const app = require('../app');  

// Mocking the Review model to prevent actual DB operations
jest.mock('./models/review');

describe('Review Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();  // Clear all mocks after each test
  });

  it('should create a review', async () => {
    const mockReview = {
      movieId: 1,
      userId: 1,
      text: "Great movie!",
      rating: 5
    };

    Review.create.mockResolvedValue(mockReview);  // Mock the Review.create method

    const response = await supertest(app).post('/api/reviews').send(mockReview);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Review submitted');
    expect(response.body.review).toEqual(mockReview);
  });

  it('should return a 500 error if review creation fails', async () => {
    const mockReview = {
      movieId: 1,
      userId: 1,
      text: "Great movie!",
      rating: 5
    };

    Review.create.mockRejectedValue(new Error('Mock error'));  // Mock the Review.create method to throw an error

    const response = await supertest(app).post('/api/reviews').send(mockReview);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error');
  });

});
