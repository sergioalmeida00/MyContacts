import { app } from '../app'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Contacts Routes', () => {
  it('should be able to list all Contacts', async () => {
    await request(app).post('/contacts').send({
      name: 'Jhon Doe test',
      email: 'jhondoe@teste.com',
      phone: '(99)99999-9999',
      category_id: '0beab73f-0a1f-4cc1-a4a9-b917a54b4722',
    })

    const result = await request(app).get('/contacts').expect(200)
    expect(result.body.contacts[0]).toHaveProperty('id')
    expect(result.body.contacts[0]).toHaveProperty('name')
    expect(result.body.contacts[0]).toHaveProperty('email')
    expect(result.body.contacts[0]).toHaveProperty('phone')
    expect(result.body.contacts[0]).toHaveProperty('category_id')
  })

  it('should not be possible to create a contact with an existing email', async () => {
    await request(app).post('/contacts').send({
      name: 'Jhon Doe test',
      email: 'jhondoe1@teste.com',
      phone: '(99)99999-9999',
      category_id: '0beab73f-0a1f-4cc1-a4a9-b917a54b4722',
    })
    const resultErroResponse = await request(app)
      .post('/contacts')
      .send({
        name: 'Jhon Doe test',
        email: 'jhondoe1@teste.com',
        phone: '(99)99999-9999',
        category_id: '0beab73f-0a1f-4cc1-a4a9-b917a54b4722',
      })
      .expect(400)
    expect(resultErroResponse.body).toHaveProperty('error')
  })
})
