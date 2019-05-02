using System.Collections.Generic;
using System.Linq;
using _2_Onboarding.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace _2_Onboarding.Services
{
    public class CustomerService
    {
        private readonly IMongoCollection<Customer> _customers;

        public CustomerService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("OnboardingDb"));
            var database = client.GetDatabase("OnboardingDb");
            _customers = database.GetCollection<Customer>("Customers");
        }

        public IQueryable<Customer> Collection => _customers.AsQueryable();

        public List<Customer> Get()
        {
            return _customers.Find(customer => true).ToList();
        }

        public Customer Get(string id)
        {
            return _customers.Find<Customer>(customer => customer.Id == id).FirstOrDefault();
        }

        public Customer Create(Customer customer)
        {
            _customers.InsertOne(customer);
            return customer;
        }

        public void Update(string id, Customer customerIn)
        {
            _customers.ReplaceOne(customer => customer.Id == id, customerIn);
        }

        public void Remove(string id)
        {
            _customers.DeleteOne(customer => customer.Id == id);
        }

    }
}