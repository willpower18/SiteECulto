using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteECulto.Models
{
    public class Data
    {
        public const string key = "AIzaSyBuDB2x3H88svwDRtqC8L7JpXxuG4b2NAY";

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
