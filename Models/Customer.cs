using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _2_Onboarding.Models
{
    public class Customer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Address")]
        public string Address { get; set; }
    }
}