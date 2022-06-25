let wsClients = () => [];

const webSocketStore = {
  registerClients: (clients) => {
    wsClients = clients;
  },

  getClients: () => wsClients(),
};

module.exports = webSocketStore;
