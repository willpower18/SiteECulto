using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteECulto.Models
{
    public class Culto
    {
        public int IdCulto { get; set; }
        public int IdIgreja { get; set; }
        public string Nome { get; set; }
        public DateTime DataHora { get; set; }
        public string Preletor { get; set; }
        public int Lotacao { get; set; }
    }
}
