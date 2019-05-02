using System.Collections.Generic;
using _2_Onboarding.Models;
using _2_Onboarding.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Web;

namespace _2_Onboarding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : Controller
    {
        private readonly CustomerService _customerService;
        public CustomersController(CustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("list")]
        public ActionResult CustomerList(int page = 1, int limit = 5)
        {
            var skip = (page - 1) * limit;
            var result = _customerService.Collection.Skip(skip).Take(limit).ToList();
            var sum = _customerService.Collection.Count();
            return Json(new { Data = result, Sum = sum });
        }

        [HttpGet]
        public ActionResult<List<Customer>> Get()
        {
            return _customerService.Get();
        }

        [HttpGet("{id:length(24)}", Name = "GetCustomer")]
        public ActionResult<Customer> Get(string id)
        {
            var customer = _customerService.Get(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }

        [HttpPost]
        public ActionResult<Customer> Create(Customer customer)
        {
            _customerService.Create(customer);
            return CreatedAtRoute("GetCustomer", new { id = customer.Id.ToString() }, customer);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Customer customerIn)
        {
            var customer = _customerService.Get(id);
            if (customer == null)
            {
                return NotFound();
            }
            customerIn.Id = customer.Id;
            _customerService.Update(id, customerIn);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var customer = _customerService.Get(id);
            if (customer == null)
            {
                return NotFound();
            }
            _customerService.Remove(customer.Id);
            return NoContent();
        }
    }
}