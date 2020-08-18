using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SiteECulto.Models;

namespace SiteECulto.Controllers
{
    public class ParticiparController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> getIgrejas()
        {
            try
            {
                HttpClient request = new HttpClient();
                request.BaseAddress = new System.Uri("https://api.eculto.com.br/api/");
                HttpResponseMessage response = await request.GetAsync($"Igrejas?key={Data.key}");
                int responseStatus = Convert.ToInt32(response.StatusCode);
                
                if(responseStatus != 200)
                {
                    var retorno = new
                    {
                        code = 500
                    };

                    return Json(retorno);
                }

                var responseDataString = response.Content.ReadAsStringAsync();
                var responseData = JsonConvert.DeserializeObject<List<Igreja>>(responseDataString.Result);
                
                return Json(responseData);
            }
            catch
            {
                var retorno = new
                {
                    code = 500
                };

                return Json(retorno);
            }            
        }

        public async Task<JsonResult> getCultos(int Id)
        {
            if(Id == 0)
            {
                var retorno = new
                {
                    code = 404
                };

                return Json(retorno);
            }

            try
            {
                HttpClient request = new HttpClient();
                request.BaseAddress = new System.Uri("https://api.eculto.com.br/api/");
                HttpResponseMessage response = await request.GetAsync("Igrejas/"+ Id + "?key=" + Data.key);
                int responseStatus = Convert.ToInt32(response.StatusCode);

                if (responseStatus != 200)
                {
                    var retorno = new
                    {
                        code = 500
                    };

                    return Json(retorno);
                }

                var responseDataString = response.Content.ReadAsStringAsync();
                var responseData = JsonConvert.DeserializeObject<IgrejaCultos>(responseDataString.Result);

                return Json(responseData);
            }
            catch
            {
                var retorno = new
                {
                    code = 500
                };

                return Json(retorno);
            }
        }

        public async Task<JsonResult> Participacao(string Nome, string Telefone, int IdCulto, int Acompanhantes)
        {
            if(string.IsNullOrEmpty(Nome) | string.IsNullOrEmpty(Telefone) | IdCulto <= 0)
            {
                var retorno = new
                {
                    code = 400
                };

                return Json(retorno);
            }

            try
            {
                var appKey = "";
                string cookieAppKey = Request.Cookies["appKey"];
                if (string.IsNullOrEmpty(cookieAppKey))
                {
                    appKey = Data.RandomString(25);
                    DateTime expiracaoCookie = new DateTime(DateTime.Now.Year, 12, 31);
                    CookieOptions cookie = new CookieOptions();
                    cookie.Expires = expiracaoCookie;
                    Response.Cookies.Append("appKey", cookieAppKey + (appKey), cookie);
                }
                else
                {
                    appKey = cookieAppKey;
                }
                var data = new {
                    key = "AIzaSyBuDB2x3H88svwDRtqC8L7JpXxuG4b2NAY",
                    participacao = new {
                        IdParticipacao = 0,
                        IdCulto = IdCulto,
                        Nome = Nome,
                        Telefone = Telefone,
                        ChaveApp = appKey,
                        QtdCriancas = Acompanhantes,
                        QtdAdultos = 1,
                        Confirmado = 0
                    }
                };
                var json = JsonConvert.SerializeObject(data);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpClient request = new HttpClient();
                request.BaseAddress = new System.Uri("https://api.eculto.com.br/api/");
                HttpResponseMessage response = await request.PostAsync("participacao", content);
                int responseStatus = Convert.ToInt32(response.StatusCode);

                if (responseStatus != 200)
                {
                    var retorno = new
                    {
                        code = responseStatus
                    };

                    return Json(retorno);
                }
                else
                {
                    var retorno = new
                    {
                        code = 200
                    };

                    return Json(retorno);
                }
            }
            catch
            {
                var retorno = new
                {
                    code = 500
                };

                return Json(retorno);
            }
        }
    }
}
