using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _2_Onboarding.Models
{
    public class CustomerPicture
    {
        public ObjectId _id { get; set; }
        public string FileName { get; set; }
        public string PictureData { get; set; }
    }
}