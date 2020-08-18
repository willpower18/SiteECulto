using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteECulto.Models
{
    public class IgrejaCultos
    {
        public string nomeIgreja { get; set; }
        public int capacidade { get; set; }
        public List<Culto> cultos { get; set; }
    }
}
