import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title:'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-07-12 09:00:00'),
        },
        {
          id: 2,
          title:'Stits Burger',
          type: 'withdraw',
          category: 'Food',
          amount: 48,
          createdAt: new Date('2022-07-23 21:32:00'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
