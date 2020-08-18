using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteECulto.Models
{
    public class Igreja
    {
        public int IdIgreja { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string Numero { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Uf { get; set; }
        public string Responsavel { get; set; }
        public string Tradicao { get; set; }
        public int Capacidade { get; set; }
        public int Ativo { get; set; }
    }
}
