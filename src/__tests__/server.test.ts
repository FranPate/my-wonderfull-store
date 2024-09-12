import request from 'supertest'
import server from '../server'
import { db, connectDB } from '../config/db'

describe('connectDB', () => {
  it('should handle database connection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('There was an error with the database'))
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    await connectDB()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('There was an error with the database')
    )

    consoleSpy.mockRestore()
  })
})
